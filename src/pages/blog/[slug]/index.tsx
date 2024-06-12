import type { InferGetStaticPropsType } from "next";

import BlogPost from "@/components/blog/BlogPost";
import client from "@tina/__generated__/client";
import { cleanConnection } from "@/data/tina/blog";

import { ENV } from "@/utils/env";

export async function getStaticPaths() {
  const edges = cleanConnection(
    ENV === "production"
      ? (await client.queries.blogConnectionPathsPublished()).data
          .blogConnection
      : (await client.queries.blogConnectionPathsAll()).data.blogConnection
  ).edges;

  return {
    paths: edges.map((edge) => ({
      params: { slug: edge.node._sys.filename },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const matched = cleanConnection(
    (await client.queries.blogConnectionPathsAll()).data.blogConnection
  ).edges.find((edge) => edge.node._sys.filename === params.slug);

  if (matched === undefined) {
    throw new Error(
      `"${params.slug}" was not found by the Tina client. It may not currently be indexed.`
    );
  }

  const post = await client.queries.blog({
    relativePath: matched.node._sys.relativePath,
  });

  return { props: { post } };
}

export default function BlogPostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BlogPost post={post} />;
}
