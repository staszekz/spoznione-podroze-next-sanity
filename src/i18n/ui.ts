export const languages = {
	pl: "Polski",
	en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "pl";

export const ui = {
	pl: {
		"nav.continents": "Kontynenty",
		"nav.latest": "Najnowsze",
		"nav.about": "O mnie",
		"nav.collab": "Współpraca",
		"hero.eyebrow": "BLOG PODRÓŻNICZY · PISANY Z DYSTANSU",
		"hero.title": "Podróże opowiedziane bez pośpiechu",
		"hero.lead":
			"Wybierz kontynent na mapie i zanurz się w historiach z krajów, do których warto się spóźnić.",
		"hero.ctaMap": "Odkrywaj mapę",
		"hero.ctaLatest": "Najnowsze wpisy",
		"featured.heading": "wybrane historie",
		"featured.allCountries": "Wszystkie kraje",
		"featured.readingMeta": "min",
		"featured.photos": "zdjęcia",
		"latest.title": "Najnowsze",
		"latest.lead": "Wszystkie historie po kolei — od najnowszej.",
		"latest.empty": "Nie ma jeszcze żadnych wpisów.",
		"collab.eyebrow": "O MNIE · WSPÓŁPRACA",
		"collab.title": "Poznajmy się — albo zróbmy coś razem",
		"collab.lead": "Marki, wydawcy, kompani w drodze — chętnie porozmawiam.",
		"collab.ctaAbout": "O mnie",
		"collab.ctaCollab": "Współpraca",
		"footer.meta": "Instagram · Newsletter · © 2026 · PL / EN",
		"footer.ai":
			"dla agentów AI: mcp.spoznionepodroze.pl · /llms.txt · MCP (searchArticles, getDestinationInfo)",
		"map.hint": "przesuń i przybliż",
		"map.read": "Czytaj",
		"theme.toggle": "Przełącz motyw",
		"menu.open": "Otwórz menu",
		"menu.close": "Zamknij menu",
		"stub.wip": "Ta strona jest w budowie — wróć wkrótce.",
	},
	en: {
		"nav.continents": "Continents",
		"nav.latest": "Latest",
		"nav.about": "About",
		"nav.collab": "Work with me",
		"hero.eyebrow": "TRAVEL BLOG · WRITTEN WITH HINDSIGHT",
		"hero.title": "Travels told without haste",
		"hero.lead":
			"Pick a continent on the map and dive into stories from countries worth being late for.",
		"hero.ctaMap": "Explore the map",
		"hero.ctaLatest": "Latest posts",
		"featured.heading": "selected stories",
		"featured.allCountries": "All countries",
		"featured.readingMeta": "min",
		"featured.photos": "photos",
		"latest.title": "Latest",
		"latest.lead": "Every story in order — newest first.",
		"latest.empty": "No posts yet.",
		"collab.eyebrow": "ABOUT · COLLABORATION",
		"collab.title": "Let's meet — or make something together",
		"collab.lead": "Brands, publishers, road companions — happy to talk.",
		"collab.ctaAbout": "About me",
		"collab.ctaCollab": "Work with me",
		"footer.meta": "Instagram · Newsletter · © 2026 · PL / EN",
		"footer.ai":
			"for AI agents: mcp.spoznionepodroze.pl · /llms.txt · MCP (searchArticles, getDestinationInfo)",
		"map.hint": "pan and zoom",
		"map.read": "Read",
		"theme.toggle": "Toggle theme",
		"menu.open": "Open menu",
		"menu.close": "Close menu",
		"stub.wip": "This page is under construction — check back soon.",
	},
} as const;

export type UiKey = keyof (typeof ui)["pl"];

export function getLangFromUrl(url: URL): Lang {
	const [, lang] = url.pathname.split("/");
	if (lang && lang in ui) return lang as Lang;
	return defaultLang;
}

export function getTranslations(lang: Lang) {
	return function t(key: UiKey): string {
		return ui[lang][key] ?? ui[defaultLang][key];
	};
}

/** Prefixes a root-relative path with the language segment (PL lives at `/`). */
export function localizePath(lang: Lang, path: string): string {
	const clean = path.startsWith("/") ? path : `/${path}`;
	return lang === defaultLang ? clean : `/${lang}${clean}`;
}

export const routes = {
	pl: {
		home: "/",
		continents: "/kontynenty",
		latest: "/najnowsze",
		about: "/o-mnie",
		collab: "/wspolpraca",
	},
	en: {
		home: "/en/",
		continents: "/en/continents",
		latest: "/en/latest",
		about: "/en/about",
		collab: "/en/work-with-me",
	},
} as const;

/** Builds the URL of a post page: `/{countrySlug}/{postSlug}` (EN under `/en/`). */
export function postPath(
	lang: Lang,
	countrySlug: string,
	postSlug: string,
): string {
	return localizePath(lang, `/${countrySlug}/${postSlug}`);
}
