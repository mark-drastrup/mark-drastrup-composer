import { defineField, defineType } from "sanity";

// Singleton: the curated, ordered selection of Tracks on the home page.
// Its document ID is fixed in structure.ts and creating new ones is disabled in sanity.config.ts.
export const SHOWCASE_DOCUMENT_ID = "showcase";

export const showcaseType = defineType({
  name: "showcase",
  title: "Showcase",
  type: "document",
  fields: [
    defineField({
      name: "tracks",
      title: "Tracks",
      type: "array",
      of: [{ type: "reference", to: { type: "track" } }],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Showcase" }),
  },
});
