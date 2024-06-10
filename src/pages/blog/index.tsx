import BlogList from "@/components/blog/BlogList";
import { cleanConnectionEdges } from "@/data/tina/blog";
import client from "@tina/__generated__/client";
import type {
  MinBlogConnectionAllQuery,
  MinBlogConnectionPublishedQuery,
} from "@tina/__generated__/types";
import { ENV } from "@utils/env";

export async function getStaticProps() {
  const { data } =
    ENV === "production"
      ? await client.queries.minBlogConnectionPublished()
      : await client.queries.minBlogConnectionAll();
  return {
    props: {
      data,
    },
  };
}

interface Props {
  data: MinBlogConnectionAllQuery | MinBlogConnectionPublishedQuery;
}
export default function BlogPage({ data }: Props) {
  const posts = cleanConnectionEdges(data.blogConnection.edges);

  return (
    <>
      <h1 className="text-4xl">Blog Page</h1>
      <BlogList posts={posts} />
    </>
  );
}
