import BlogPostTagList from "./BlogPostTagList";

interface Props {
  title?: string;
  tags?: (string | null)[] | null;
}
export default function BlogPostHeader({ title = "Blog Post", tags }: Props) {
  return (
    <header>
      <h1 className="text-4xl">{title}</h1>
      <BlogPostTagList tags={tags} />
    </header>
  );
}
