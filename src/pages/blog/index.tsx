import type { InferGetStaticPropsType } from "next";

import BlogList from "@/components/blog/BlogList";
import client from "@tina/__generated__/client";
import { cleanConnection } from "@/data/tina/blog";

import { ENV } from "@utils/env";

export async function getStaticProps() {
  const data = cleanConnection(
    ENV === "production"
      ? (await client.queries.minBlogConnectionPublished()).data.blogConnection
      : (await client.queries.minBlogConnectionAll()).data.blogConnection
  );

  return {
    props: {
      posts: data.edges,
    },
  };
}

export default function BlogPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1 className="text-4xl">Blog Page</h1>
      <BlogList posts={posts} />
    </>
  );
}
