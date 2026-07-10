import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
	name: "post",
	title: "Post",
	type: "document",
	fields: [
		defineField({
			name: "language",
			type: "string",
			readOnly: true,
			hidden: true,
		}),
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: { source: "title" },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "excerpt",
			title: "Excerpt",
			type: "text",
			rows: 3,
			validation: (rule) =>
				rule.max(220).warning("Keep excerpts short — they render on cards."),
		}),
		defineField({
			name: "country",
			title: "Country",
			type: "reference",
			to: [{ type: "country" }],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "coverImage",
			title: "Cover image",
			type: "image",
			options: { hotspot: true },
			fields: [
				defineField({ name: "alt", title: "Alternative text", type: "string" }),
			],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "gallery",
			title: "Gallery",
			type: "array",
			of: [
				defineArrayMember({
					type: "image",
					options: { hotspot: true },
					fields: [
						defineField({
							name: "alt",
							title: "Alternative text",
							type: "string",
						}),
					],
				}),
			],
		}),
		defineField({
			name: "readingTime",
			title: "Reading time (minutes)",
			type: "number",
			validation: (rule) => rule.min(1).integer(),
		}),
		defineField({
			name: "photoCount",
			title: "Photo count",
			type: "number",
			validation: (rule) => rule.min(0).integer(),
		}),
		defineField({
			name: "featured",
			title: "Featured on homepage",
			type: "boolean",
			initialValue: false,
		}),
		defineField({
			name: "publishedAt",
			title: "Published at",
			type: "datetime",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "body",
			title: "Body",
			type: "array",
			of: [
				defineArrayMember({ type: "block" }),
				defineArrayMember({
					type: "image",
					options: { hotspot: true },
					fields: [
						defineField({
							name: "alt",
							title: "Alternative text",
							type: "string",
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "language",
			media: "coverImage",
		},
	},
});
