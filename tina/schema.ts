import type { Schema } from "tinacms";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/^\/+/, "");

export default {
  collections: [
    {
      name: "blog",
      label: "Blog Post",
      path: "content/blog",
      format: "md",
      ui: {
        router(props) {
          return `${basePath}/blog/${props.document._sys.filename}`;
        },
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
          type: "string",
          name: "title",
          label: "Post Title",
          required: true,
          isTitle: true,
          ui: {
            validate(value: string) {
              if (value === undefined || value.length === 0) {
                return "Title is required!";
              }
            },
          },
        },
        {
          type: "string",
          name: "tags",
          label: "Tags",
          list: true,
          options: [
            "beginner",
            "advanced",
            "programming",
            "artificial intelligence",
            "networking",
          ],
        },
        {
          type: "datetime",
          name: "date",
          label: "Publish Date",
          required: true,
          ui: {
            format() {
              return Date.now();
            },
          },
        },
        {
          type: "rich-text",
          name: "body",
          label: "Body",
          isBody: true,
        },
      ],
    },
  ],
} as Schema;
