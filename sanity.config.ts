import { documentInternationalization } from "@sanity/document-internationalization";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

export const SUPPORTED_LANGUAGES = [
	{ id: "pl", title: "Polski" },
	{ id: "en", title: "English" },
];

export default defineConfig({
	name: "spoznione-podroze",
	title: "Spóźnione Podróże",
	projectId: "uk2139y1",
	dataset: "production",
	plugins: [
		structureTool(),
		documentInternationalization({
			supportedLanguages: SUPPORTED_LANGUAGES,
			schemaTypes: ["post"],
		}),
	],
	schema: {
		types: schemaTypes,
	},
});
