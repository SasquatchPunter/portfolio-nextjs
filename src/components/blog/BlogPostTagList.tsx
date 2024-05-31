import { link } from "fs";

interface Props {
  tags?: (string | null)[] | null;
}
export default function BlogPostTagList({ tags }: Props) {
  return (
    <ul>
      {tags?.map((tag) => (
        <li>{tag}</li>
      ))}
    </ul>
  );
}
