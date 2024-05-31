export default function Blockquote(props: any) {
  return (
    <blockquote className="mx-4 px-2 border-l border-gray-200">
      {props.children}
    </blockquote>
  );
}
