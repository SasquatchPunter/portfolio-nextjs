import BlogList from "@/components/blog/BlogList";
import client from "@tina/__generated__/client";
import type {
  MinBlogConnectionAllQuery,
  MinBlogConnectionPublishedQuery,
} from "@tina/__generated__/types";

const ENV = process.env.NODE_ENV;

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
  const posts = data.blogConnection.edges || [];
  return (
    <>
      <h1 className="text-4xl">Blog Page</h1>
      <BlogList posts={posts} />
    </>
  );
}
