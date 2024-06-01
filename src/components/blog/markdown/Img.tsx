import isAbsoluteUrl from "is-absolute-url";

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH || process.env.NEXT_BASE_PATH;

export default function Img(props: any) {
  const url = isAbsoluteUrl(props.url) ? props.url : `${basePath}${props.url}`;
  // NOTE: Img tags in Markdown are normally nested in `<p>` tags by parsers
  // Using block elements like `<div>` may break this.
  return (
    <span className="overflow-hidden rounded-xl max-w-screen max-h-screen relative">
      <img src={url} className="w-full" />
    </span>
  );
}
