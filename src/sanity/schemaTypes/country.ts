import { defineField, defineType } from "sanity";

export const country = defineType({
	name: "country",
	title: "Country",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "object",
			fields: [
				defineField({
					name: "pl",
					title: "Polski",
					type: "string",
					validation: (rule) => rule.required(),
				}),
				defineField({
					name: "en",
					title: "English",
					type: "string",
					validation: (rule) => rule.required(),
				}),
			],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "object",
			fields: [
				defineField({
					name: "pl",
					title: "Polski",
					type: "slug",
					options: { source: "name.pl" },
					validation: (rule) => rule.required(),
				}),
				defineField({
					name: "en",
					title: "English",
					type: "slug",
					options: { source: "name.en" },
					validation: (rule) => rule.required(),
				}),
			],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "continent",
			title: "Continent",
			type: "reference",
			to: [{ type: "continent" }],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "location",
			title: "Map location",
			type: "geopoint",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			options: { hotspot: true },
			fields: [
				defineField({ name: "alt", title: "Alternative text", type: "string" }),
			],
		}),
	],
	preview: {
		select: { title: "name.pl", media: "image" },
	},
});
