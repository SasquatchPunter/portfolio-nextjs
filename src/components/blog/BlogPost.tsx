import type { InferGetStaticPropsType } from "next";
import { getStaticProps } from "@/pages/blog/[slug]/index";
import { useTina } from "tinacms/dist/react";
import BlogPostHeader from "./BlogPostHeader";
import BlogPostMain from "./BlogPostMain";
import BlogPostFooter from "./BlogPostFooter";

interface Props {
  post: InferGetStaticPropsType<typeof getStaticProps>["post"];
}
export default function BlogPost({ post }: Props) {
  const { data } = useTina({
    query: post!.query,
    data: post!.data,
    variables: post!.variables,
  });
  return (
    <article>
      <BlogPostHeader title={data.blog.title} tags={data.blog.tags} />
      <BlogPostMain body={data.blog.body} />
      <BlogPostFooter />
    </article>
  );
}
