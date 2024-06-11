import client from "@tina/__generated__/client";
import {
  BlogConnectionEdges,
  BlogConnectionQueryVariables,
  PageInfo,
  BlogConnection,
  MinBlogConnectionAllQuery,
  MinBlogConnectionPublishedQuery,
  BlogConnectionPathsQuery,
  BlogConnectionQuery,
} from "@tina/__generated__/types";

// /** Params to control filtering, sorting and pagination for `blogConnection` queries */
// export interface BlogConnectionParams {
//   filter?: {
//     tags?: string[];
//     status?: "draft" | "published";
//     createdAt?: {
//       after?: string;
//       before?: string;
//     };
//     updatedAt?: {
//       after?: string;
//       before?: string;
//     };
//   };
//   sort?: {
//     direction?: "asc" | "desc";
//     by?: "updatedAt" | "createdAt" | "title" | "tags";
//   };
//   paginate?: {
//     limit?: number;
//     cursor?: string;
//   };
// }

// /**
//  * Directly queries `blogConnection` and handles pagination logic
//  */
// export function blogConnection(params?: BlogConnectionParams) {
//   const filter: BlogConnectionQueryVariables["filter"] = {
//     tags: {
//       in: params?.filter?.tags,
//     },
//     status: {
//       eq: params?.filter?.status,
//     },
//     createdAt: {
//       after: params?.filter?.createdAt?.after,
//       before: params?.filter?.createdAt?.before,
//     },
//     updatedAt: {
//       after: params?.filter?.updatedAt?.after,
//       before: params?.filter?.updatedAt?.before,
//     },
//   };

//   const sort: BlogConnectionQueryVariables["sort"] =
//     params?.sort?.by || "createdAt";

//   interface PaginateForward {
//     first?: number;
//     after?: PageInfo["endCursor"];
//   }
//   interface PaginateBackward {
//     last?: number;
//     before?: PageInfo["startCursor"];
//   }

//   const paginate: PaginateForward | PaginateBackward =
//     params?.sort?.direction === "asc"
//       ? {
//           first: params?.paginate?.limit,
//           after: params?.paginate?.cursor,
//         }
//       : {
//           last: params?.paginate?.limit,
//           before: params?.paginate?.cursor,
//         };

//   const vars: BlogConnectionQueryVariables = {
//     filter,
//     sort,
//     ...paginate,
//   };

//   return client.queries.blogConnection(vars, {});
// }

// /**
//  * Creates a paginated `blogConnection` query. Handles PageInfo internally for
//  * tracking the query cursor
//  *
//  * Parameters are passed on instantiation. If parameters change,
//  * a new instance must be created
//  */
// export class BlogConnection {
//   private params: Required<BlogConnectionParams>;
//   private pageInfo?: PageInfo;
//   constructor(params: BlogConnectionParams = {}, pageInfo?: PageInfo) {
//     this.params = { filter: {}, sort: {}, paginate: {} };
//     this.params = { ...this.params, ...params };
//     this.pageInfo = pageInfo;
//   }
//   hasNextPage() {
//     if (this.pageInfo === undefined) return null;
//     else if (
//       this.params.sort.direction === "desc" ||
//       this.params.sort.direction === undefined
//     )
//       return this.pageInfo.hasPreviousPage;
//     else return this.pageInfo.hasNextPage;
//   }
//   hasPreviousPage() {
//     if (this.pageInfo === undefined) return null;
//     else if (
//       this.params.sort.direction === "desc" ||
//       this.params.sort.direction === undefined
//     )
//       return this.pageInfo.hasNextPage;
//     else return this.pageInfo.hasPreviousPage;
//   }
//   private cursorNext() {
//     if (this.pageInfo !== undefined) {
//       this.params.paginate.cursor = this.pageInfo.endCursor;
//     }
//   }
//   private cursorPrevious() {
//     if (this.pageInfo !== undefined) {
//       this.params.paginate.cursor = this.pageInfo.startCursor;
//     }
//   }
//   next() {
//     if (this.pageInfo === undefined || this.hasNextPage()) {
//       this.cursorNext();
//       return blogConnection(this.params).then((val) => {
//         this.pageInfo = val.data.blogConnection.pageInfo;
//         return val;
//       });
//     }
//   }
//   previous() {
//     if (this.pageInfo === undefined || this.hasPreviousPage()) {
//       this.cursorPrevious();
//       return blogConnection(this.params).then((val) => {
//         this.pageInfo = val.data.blogConnection.pageInfo;
//         return val;
//       });
//     }
//   }
//   getCurrentPageInfo() {
//     return this.pageInfo;
//   }
// }

// export interface BlogConnectionQueryStrings {
//   /** @example 'asc' */
//   sort?: string;
//   /** @example 'createdAt' */
//   sortBy?: string;
//   /** @example 'tags:programming,advanced;createdBefore:10-10-10;status:draft;' */
//   filter?: string;
//   /** @example '5' */
//   limit?: string;
// }
// /**
//  * TODO: Refactor so this is easier to maintain
//  *
//  * Defines and processes query strings for the `blogConnection` query
//  * @returns a parameter object that satisfies `BlogConnectionParams`
//  */
// export function stringsToBlogConnectionParams(
//   strings: BlogConnectionQueryStrings = {}
// ): BlogConnectionParams {
//   const keyDelimiter = "=";
//   const listDelimiter = ",";

//   const preprocessed = {
//     sort: strings.sort?.trim().toLowerCase(),
//     sortBy: strings.sortBy?.trim(),
//     filter: (() => {
//       return strings.filter
//         ?.split(";")
//         .filter((f) => f !== undefined)
//         .map((f) => f.split(keyDelimiter))
//         .reduce((acc, f) => {
//           if (f[0] === undefined || f[1] === undefined) return acc;
//           const key = f[0];
//           const value = f[1].split(listDelimiter);
//           acc[key] = value;
//           return acc;
//         }, {} as { [key: string]: any });
//     })(),
//     limit: strings.limit?.trim(),
//   };

//   const filter: BlogConnectionParams["filter"] = {
//     tags: preprocessed.filter?.tags,
//     status: preprocessed.filter?.status?.[0],
//     createdAt: {
//       before: preprocessed.filter?.createdBefore?.[0],
//       after: preprocessed.filter?.createdAfter?.[0],
//     },
//     updatedAt: {
//       before: preprocessed.filter?.updatedBefore?.[0],
//       after: preprocessed.filter?.updatedAfter?.[0],
//     },
//   };
//   const sort: BlogConnectionParams["sort"] = {
//     //@ts-expect-error
//     direction: preprocessed.sort,
//     //@ts-expect-error
//     by: preprocessed.sortBy,
//   };
//   const paginate: BlogConnectionParams["paginate"] = {
//     limit: preprocessed.limit ? parseInt(preprocessed.limit) : undefined,
//   };

//   return { filter, sort, paginate };
// }

export type BlogConnectionUnion =
  | BlogConnectionQuery["blogConnection"]
  | BlogConnectionPathsQuery["blogConnection"]
  | MinBlogConnectionAllQuery["blogConnection"]
  | MinBlogConnectionPublishedQuery["blogConnection"];

type CleanedBlogConnection<Connection extends BlogConnectionUnion> =
  Connection & {
    edges: NonNullable<Connection["edges"]> & {
      [key: number]: NonNullable<NonNullable<Connection["edges"]>[number]> & {
        node: NonNullable<
          NonNullable<NonNullable<Connection["edges"]>[number]>["node"]
        >;
      };
    };
  };

/**
 * Cleans the connection and narrows several types (for example, makes `edges` non-nullish)
 */
export function cleanConnection<Connection extends BlogConnectionUnion>(
  connection: Connection
): CleanedBlogConnection<Connection> {
  connection.edges =
    connection.edges
      ?.filter((edge) => edge != null)
      .filter((edge) => edge?.node != null) || [];

  return connection as CleanedBlogConnection<Connection>;
}
