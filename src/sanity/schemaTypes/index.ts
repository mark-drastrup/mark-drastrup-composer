import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { trackType } from "./trackType";
import { showcaseType } from "./showcaseType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, trackType, showcaseType],
};
