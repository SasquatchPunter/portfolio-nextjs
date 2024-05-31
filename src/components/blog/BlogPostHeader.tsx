interface Props {
  title?: string;
}
export default function BlogPostHeader({ title = "Blog Post" }: Props) {
  return (
    <header>
      <h1 className="text-4xl">{title}</h1>
    </header>
  );
}
