import {
  MinBlogConnectionAllQuery,
  MinBlogConnectionPublishedQuery,
  BlogConnectionPathsAllQuery,
  BlogConnectionPathsPublishedQuery,
  BlogConnectionQuery,
} from "@tina/__generated__/types";

export type BlogConnectionUnion =
  | BlogConnectionQuery["blogConnection"]
  | BlogConnectionPathsAllQuery["blogConnection"]
  | BlogConnectionPathsPublishedQuery["blogConnection"]
  | MinBlogConnectionAllQuery["blogConnection"]
  | MinBlogConnectionPublishedQuery["blogConnection"];

// NOTE: this uses the BlogConnectionUnion and not the base BlogConnection because
// it needs to support multiple custom connection queries.
// The omit-replace intersection pattern helps ensure no unwanted member types slip through
export type CleanBlogConnection<Connection extends BlogConnectionUnion> = Omit<
  Connection,
  "edges"
> & {
  edges: Omit<NonNullable<NonNullable<Connection["edges"]>[number]>, "node"> &
    {
      node: NonNullable<
        NonNullable<NonNullable<Connection["edges"]>[number]>["node"]
      >;
    }[];
};

/**
 * Cleans the connection and narrows several types for better downstream typing (for example, makes `edges` non-nullish)
 */
export function cleanConnection<Connection extends BlogConnectionUnion>(
  connection: Connection
): CleanBlogConnection<Connection> {
  const cleaned = { ...connection };
  cleaned.edges =
    cleaned.edges
      ?.filter((edge) => edge != null)
      .filter((edge) => edge?.node != null) || [];

  return cleaned as CleanBlogConnection<Connection>;
}
