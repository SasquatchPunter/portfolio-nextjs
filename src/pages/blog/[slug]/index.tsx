import client from "@tina/__generated__/client";
import { InferGetStaticPropsType } from "next";

export const getStaticPaths = async () => {
  const entries =
    (await client.queries.blogConnection()).data.blogConnection.edges || [];
  const paths = entries
    .filter((entry) => entry?.node)
    .map((entry) => ({
      params: {
        slug: entry!.node?._sys.filename,
      },
    }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const entry = (
    await client.queries.blogConnection()
  ).data.blogConnection.edges!.find(
    (entry) => entry?.node?._sys.filename === params.slug
  );

  const post = await client.queries.blog({
    relativePath: entry!.node!._sys.relativePath,
  });
  return {
    props: {
      post,
    },
  };
};

export default function BlogPostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1 className="text-4xl">Blog Post Page</h1>
      <h3>{post.data.blog.title}</h3>
    </>
  );
}
