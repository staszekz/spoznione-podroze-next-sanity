import { sanityClient } from "sanity:client";
import { defineQuery } from "groq";
import type { Lang } from "@/i18n/ui";

const imageFragment = /* groq */ `
	asset->{
		_id,
		url,
		metadata { lqip, dimensions { width, height } }
	},
	hotspot,
	crop,
	alt
`;

export interface SanityImage {
	asset: {
		_id: string;
		url: string;
		metadata?: {
			lqip?: string;
			dimensions?: { width: number; height: number };
		};
	} | null;
	hotspot?: unknown;
	crop?: unknown;
	alt?: string | null;
}

export interface ContinentSummary {
	_id: string;
	name: string;
	slug: string;
	location: { lat: number; lng: number };
	image: SanityImage | null;
	postCount: number;
}

export interface StoryCard {
	_id: string;
	title: string;
	slug: string;
	excerpt: string | null;
	readingTime: number | null;
	photoCount: number | null;
	coverImage: SanityImage | null;
	country: {
		name: string;
		slug: string;
		continentId: string;
	} | null;
}

export interface CountryPin {
	_id: string;
	name: string;
	slug: string;
	location: { lat: number; lng: number };
	continentId: string;
	image: SanityImage | null;
	latestPost: { title: string; slug: string } | null;
}

export interface HomepageData {
	continents: ContinentSummary[];
	stories: StoryCard[];
	countries: CountryPin[];
}

const HOMEPAGE_QUERY = defineQuery(/* groq */ `{
	"continents": *[_type == "continent"] | order(name[$lang] asc) {
		_id,
		"name": name[$lang],
		"slug": slug[$lang].current,
		location,
		image { ${imageFragment} },
		"postCount": count(*[_type == "post" && language == $lang && country->continent._ref == ^._id])
	},
	"stories": *[_type == "post" && language == $lang]
		| order(coalesce(featured, false) desc, publishedAt desc) {
		_id,
		title,
		"slug": slug.current,
		excerpt,
		readingTime,
		photoCount,
		coverImage { ${imageFragment} },
		country->{
			"name": name[$lang],
			"slug": slug[$lang].current,
			"continentId": continent._ref
		}
	},
	"countries": *[_type == "country"] {
		_id,
		"name": name[$lang],
		"slug": slug[$lang].current,
		location,
		"continentId": continent._ref,
		image { ${imageFragment} },
		"latestPost": *[_type == "post" && language == $lang && references(^._id)]
			| order(publishedAt desc)[0] { title, "slug": slug.current }
	}
}`);

export async function getHomepageData(lang: Lang): Promise<HomepageData> {
	const data: HomepageData = await sanityClient.fetch(HOMEPAGE_QUERY, { lang });
	// Pills render in array order — most published continent (the default) first.
	data.continents.sort((a, b) => b.postCount - a.postCount);
	return data;
}

const POST_SLUGS_QUERY = defineQuery(/* groq */ `
	*[_type == "post" && defined(slug.current) && language == $lang] {
		"slug": slug.current,
		"country": country->slug[$lang].current
	}
`);

export async function getPostSlugs(
	lang: Lang,
): Promise<{ slug: string; country: string }[]> {
	const slugs: { slug: string; country: string | null }[] =
		await sanityClient.fetch(POST_SLUGS_QUERY, { lang });
	// Posts with a missing/unresolved country ref yield null — drop them so
	// getStaticPaths never emits `/undefined/slug` or crashes on the null param.
	return slugs.filter((s): s is { slug: string; country: string } =>
		Boolean(s.country),
	);
}

const POST_QUERY = defineQuery(/* groq */ `
	*[_type == "post" && language == $lang && slug.current == $slug && country->slug[$lang].current == $country][0] {
		_id,
		title,
		excerpt,
		readingTime,
		photoCount,
		publishedAt,
		coverImage { ${imageFragment} },
		body,
		country->{
			"name": name[$lang],
			"slug": slug[$lang].current
		}
	}
`);

export async function getPost(lang: Lang, country: string, slug: string) {
	return await sanityClient.fetch(POST_QUERY, { lang, country, slug });
}
