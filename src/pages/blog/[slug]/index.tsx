import client from "@tina/__generated__/client";
import { InferGetStaticPropsType } from "next";
import { TinaMarkdown } from "tinacms/dist/rich-text";

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
  let post:
    | Awaited<Promise<ReturnType<typeof client.queries.blog>>>
    | undefined;
  const errors: { message: string }[] = [];

  try {
    const connection = await client.queries.blogConnection();
    const edges = connection.data.blogConnection.edges || [];
    const entry = edges.find(
      (edge) => edge?.node?._sys.filename === params.slug
    );

    if (!entry?.node) {
      errors.push({
        message: `Could not find the blog entry for '${params.slug}'!`,
      });
    } else {
      const blog = await client.queries.blog({
        relativePath: entry.node._sys.relativePath,
      });
      post = {
        data: blog.data,
        errors: blog.errors,
        variables: blog.variables,
        query: blog.query,
      };
    }
  } catch (err) {
    if (err instanceof Error) errors.push({ message: err.message });
    else throw err;
  }
  return {
    props: {
      post,
      errors,
    },
  };
};

export default function BlogPostPage({
  post,
  errors,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return post === undefined ? (
    <>
      <h1 className="text-4xl">Blog Post Page</h1>

      <div className="text-red-400">
        <p>Errors Found</p>
        {errors.map((error) => (
          <p>{error.message}</p>
        ))}
      </div>
    </>
  ) : (
    <>
      <h1 className="text-4xl">Blog Post Page</h1>
      <h3>{post.data.blog.title}</h3>
      <TinaMarkdown content={post.data.blog.body} />
    </>
  );
}
