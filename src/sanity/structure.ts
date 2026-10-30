import { StructureBuilder } from "sanity/structure";
import { SHOWCASE_DOCUMENT_ID } from "./schemaTypes/showcaseType";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Admin Dashboard")
    .items([
      // Music
      S.listItem()
        .title("Music")
        .child(
          S.list()
            .title("Music")
            .items([
              S.listItem()
                .title("Showcase")
                .id(SHOWCASE_DOCUMENT_ID)
                .child(
                  S.document()
                    .schemaType("showcase")
                    .documentId(SHOWCASE_DOCUMENT_ID)
                ),
              S.documentTypeListItem("track").title("Tracks"),
            ])
        ),

      S.divider(),

      // Course Content
      S.listItem()
        .title("Course Content")
        .child(
          S.documentTypeList("course")
            .title("Courses")
            .child((courseId) =>
              S.list()
                .title("Course Options")
                .items([
                  // Option to edit course content
                  S.listItem()
                    .title("Edit Course Content")
                    .child(
                      S.document().schemaType("course").documentId(courseId)
                    ),
                ])
            )
        ),

      S.divider(),

      // System Management
      S.listItem()
        .title("System Management")
        .child(
          S.list()
            .title("System Management")
            .items([S.documentTypeListItem("category").title("Categories")])
        ),
    ]);
