import { TinaMarkdown, type TinaMarkdownContent } from "tinacms/dist/rich-text";

interface Props {
  body: TinaMarkdownContent;
}
export default function BlogPostMain({ body }: Props) {
  return (
    <main>
      <TinaMarkdown content={body} />
    </main>
  );
}
