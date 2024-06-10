import type { Collection } from "tinacms";

const basePath = (process.env.TINA_PUBLIC_BASE_PATH || "").replace(/^\/+/, "");

const HeroImage: Collection = {
  name: "heroImage",
  label: "Hero Image",
  path: "content/heroImage",
  format: "json",
  ui: {
    global: true,
    filename: {
      readonly: true,
      slugify(values) {
        return `${
          values.title
            ?.toLowerCase()
            .replace(/[^\w]+/g, "-")
            .replace(/^-+|-+$/g, "") || ""
        }`;
      },
    },
  },
  fields: [
    {
      type: "image",
      name: "image",
      label: "Image",
      required: true,
    },
    {
      type: "string",
      name: "title",
      label: "Title",
      required: true,
    },
    {
      type: "string",
      name: "alt",
      label: "Alt",
      required: true,
    },
  ],
};

export default HeroImage;
