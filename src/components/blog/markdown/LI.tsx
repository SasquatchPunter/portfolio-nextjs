export default function LI(props: any) {
  return <li className="[&>div]:inline">{props.children}</li>;
}
