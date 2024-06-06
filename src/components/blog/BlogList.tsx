import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { BlogConnection, stringsToBlogConnectionParams } from "@data/tina/blog";

interface Props {}
export default function BlogList({}: Props) {
  const { query, isReady } = useRouter();
  const [posts, setPosts] = useState<any>([]);

  const connection = useMemo(() => {
    return new BlogConnection(stringsToBlogConnectionParams(query));
  }, [query]);

  async function loadNextPage() {
    if (isReady) {
      const fetchedPosts = await connection.next();
      const mappedPosts =
        fetchedPosts?.data.blogConnection.edges
          ?.filter((edge) => !!edge)
          .map((edge) => ({ ...edge?.node, cursor: edge?.cursor })) || [];
      setPosts([...posts, ...mappedPosts]);
    }
  }

  useEffect(() => {
    loadNextPage();
  }, [query]);

  return (
    <>
      {posts.map((post: any) => (
        <p className="m-auto w-max" key={post._sys.filename}>
          {post.title}
        </p>
      ))}
      {connection.hasNextPage() ? (
        <button className="block m-auto w-max" onClick={loadNextPage}>
          Load More
        </button>
      ) : undefined}
    </>
  );
}
