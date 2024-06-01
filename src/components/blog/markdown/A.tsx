export default function A(props: any) {
  return (
    <a
      className=""
      href={props.url}
      aria-label={props.title}
      title={props.title}
    >
      {props.children}
    </a>
  );
}
