export default function Code(props: any) {
  return (
    <code className="border border-gray-400 bg-gray-600 px-2 rounded-md">
      {props.children}
    </code>
  );
}
