// import Datetime from "./components/Datetime";
import type { Schema } from "tinacms";
import { wrapFieldsWithMeta } from "tinacms";
import Datetime from "./components/Datetime";
import React from "react";

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
        beforeSubmit: async ({ values, cms, form }) => {
          values.createdAt =
            values.createdAt || new Date(Date.now()).toISOString();
          values.updatedAt = new Date(Date.now()).toISOString();
          return { ...values };
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
          name: "createdAt",
          label: "Created At",
          required: false,
          ui: {
            component: wrapFieldsWithMeta(Datetime),
            dateFormat: "MMM D, YYYY",
            timeFormat: false,
            disabled: true,
          },
        },
        {
          type: "datetime",
          name: "updatedAt",
          label: "Updated At",
          required: false,
          ui: {
            component: wrapFieldsWithMeta(Datetime),
            dateFormat: "MMM D, YYYY",
            timeFormat: false,
            disabled: true,
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
