import { type SchemaTypeDefinition } from "sanity";
import { courseType } from "./courseType";
import { lessonType } from "./lessonType";
import { categoryType } from "./categoryType";
import { moduleType } from "./moduleType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [courseType, lessonType, categoryType, moduleType],
};
