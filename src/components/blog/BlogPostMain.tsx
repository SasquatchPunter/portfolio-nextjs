import { TinaMarkdown, type TinaMarkdownContent } from "tinacms/dist/rich-text";
import components from "./markdown";
interface Props {
  body: TinaMarkdownContent;
}
export default function BlogPostMain({ body }: Props) {
  return (
    <main className="m-4 md:w-3/4 md:m-auto lg:w-1/2 flex flex-col gap-8">
      <TinaMarkdown content={body} components={components} />
    </main>
  );
}
