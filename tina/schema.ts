import type { Schema } from "tinacms";

const basePath = (process.env.TINA_PUBLIC_BASE_PATH || "").replace(/^\/+/, "");

export default {
  collections: [
    {
      name: "blog",
      label: "Blog Post",
      path: "content/blog",
      format: "mdx",
      ui: {
        router: (props) => {
          const path = `${basePath}/blog/${props.document._sys.filename}`;
          return path;
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
          name: "status",
          label: "Status",
          description: "Set this post's current editorial status",
          options: ["draft", "published"],
          ui: {
            component: "radio-group",
            direction: "vertical",
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
        },
        {
          type: "rich-text",
          name: "body",
          label: "Body",
          isBody: true,
        },
      ],
      // indexes: [{
      //   name: 'tags',
      //   fields: []
      // }]
    },
  ],
} as Schema;
