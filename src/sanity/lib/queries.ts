import { defineQuery } from "next-sanity";

export const SHOWCASE_QUERY = defineQuery(`*[_id == "showcase"][0].tracks[]->{
  _id,
  title,
  "audioUrl": audio.asset->url
}`);
