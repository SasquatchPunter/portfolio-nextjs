import type { Collection } from "tinacms";
import { wrapFieldsWithMeta } from "tinacms";
import Datetime from "../fields/Datetime";

const basePath = (process.env.TINA_PUBLIC_BASE_PATH || "").replace(/^\/+/, "");

const Blog: Collection = {
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
      values.createdAt = values.createdAt || new Date(Date.now()).toISOString();
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
          if (value && value.trim().length === 0) {
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
        //@ts-expect-error
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
      required: true,
      ui: {
        //@ts-expect-error
        component: wrapFieldsWithMeta(Datetime),
        dateFormat: "MMM D, YYYY",
        //@ts-expect-error
        timeFormat: false,
        disabled: true,
      },
    },
    {
      type: "datetime",
      name: "updatedAt",
      label: "Updated At",
      required: true,
      ui: {
        //@ts-expect-error
        component: wrapFieldsWithMeta(Datetime),
        dateFormat: "MMM D, YYYY",
        //@ts-expect-error
        timeFormat: false,
        disabled: true,
      },
    },
    {
      type: "object",
      name: "heroImage",
      label: "Hero Image",
      required: false,
      fields: [
        { type: "image", name: "image", label: "Image", required: false },
        { type: "string", name: "alt", label: "Alt", required: false },
        { type: "string", name: "caption", label: "Caption", required: false },
      ],
    },
    {
      type: "string",
      name: "brief",
      label: "Brief",
      description: "A brief intro to grab the reader's attention.",
      ui: {
        component: "textarea",
      },
      required: false,
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
  ],
};

export default Blog;
