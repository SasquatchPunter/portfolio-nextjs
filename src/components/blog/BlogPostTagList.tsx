import { link } from "fs";

interface BlogPostTagProps {
  tag: string;
}
function BlogPostTag({ tag }: BlogPostTagProps) {
  return (
    <li className="w-max bg-slate-700 border-2 border-slate-200 text-slate-50 py-1 px-2 rounded-xl before:content-['#'] before:text-slate-300">
      {tag}
    </li>
  );
}

interface Props {
  tags?: (string | null)[] | null;
}
export default function BlogPostTagList({ tags }: Props) {
  return (
    <ul className="w-full m-4 justify-start flex gap-3 flex-wrap">
      {tags?.map((tag) =>
        tag !== null ? <BlogPostTag key={tag} tag={tag} /> : undefined
      )}
    </ul>
  );
}
