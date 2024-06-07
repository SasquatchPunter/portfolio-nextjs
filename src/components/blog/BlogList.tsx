import {
  MinBlogConnectionAllQuery,
  MinBlogConnectionPublishedQuery,
} from "@tina/__generated__/types";

interface BlogListItemProps {
  post: NonNullable<NonNullable<Props["posts"]>[number]>;
}
function BlogListItem({ post }: BlogListItemProps) {
  return (
    <article className="border border-gray-700">
      <header>
        <h1>{post.node!.title}</h1>
      </header>
    </article>
  );
}

interface Props {
  posts:
    | (
        | MinBlogConnectionAllQuery
        | MinBlogConnectionPublishedQuery
      )["blogConnection"]["edges"]
    | [];
}
export default function BlogList({ posts }: Props) {
  return (
    <section className="m-4 flex flex-wrap gap-4">
      {posts?.map((post) => {
        if (!post || !post.node) {
          return undefined;
        }
        return <BlogListItem post={post} />;
      })}
    </section>
  );
}
