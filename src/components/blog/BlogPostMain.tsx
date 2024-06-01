import { TinaMarkdown, type TinaMarkdownContent } from "tinacms/dist/rich-text";
import components from "./markdown";
interface Props {
  body: TinaMarkdownContent;
}
export default function BlogPostMain({ body }: Props) {
  return (
    <main className="m-4 flex flex-col gap-8">
      <TinaMarkdown content={body} components={components} />
    </main>
  );
}
