import isAbsoluteUrl from "is-absolute-url";
import { BASE_PATH } from "@/utils/env";

export default function Img(props: any) {
  const url = isAbsoluteUrl(props.url) ? props.url : `${BASE_PATH}${props.url}`;
  const alt = props.alt;
  // NOTE: Img tags in Markdown are normally nested in `<p>` tags by parsers
  // Using block elements like `<div>` may break this.
  return (
    <span className="max-w-screen max-h-screen relative">
      <img
        src={url}
        alt={props.alt}
        className="w-full rounded-xl object-contain"
      />
      <label>{props.caption}</label>
    </span>
  );
}
