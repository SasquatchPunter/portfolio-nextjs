import { defineConfig } from "tinacms";

import Blog from "./collections/blog";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";
const clientId =
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID || process.env.TINA_CLIENT_ID;

const clientToken = process.env.TINA_CONTENT_TOKEN;
const searchToken = process.env.TINA_SEARCH_TOKEN;

const basePath = (process.env.TINA_PUBLIC_BASE_PATH || "").replace(/^\/+/, "");

export default defineConfig({
  branch,
  clientId,
  token: clientToken,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
    basePath,
  },
  media: {
    tina: {
      mediaRoot: "media",
      publicFolder: "public",
    },
    // loadCustomStore: async () => {
    //   return MediaStore;
    // },
  },
  search: {
    tina: {
      indexerToken: searchToken,
    },
  },
  schema: { collections: [Blog] },
});
