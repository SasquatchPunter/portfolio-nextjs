import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import * as classes from "@utils/components/classes";
import * as styles from "@utils/components/styles";
import { Button } from "tinacms";

function CodeTag(props: any) {
  const className = "";
  const style = "";
  return (
    <code
      style={styles.join(props.style, style)}
      className={classes.join(props.className, className)}
    >
      {props.children}
    </code>
  );
}

function PreTag(props: any) {
  const className = "";
  const style = "";
  return (
    <pre
      style={styles.join(props.style, style)}
      className={classes.join(props.className, className)}
    >
      {props.children}
    </pre>
  );
}

interface TopBarProps {
  lang: string;
  copyText: string;
}
function TopBar({ lang, copyText }: TopBarProps) {
  return (
    <div className="flex justify-between p-2 rounded-t-md">
      <span>{lang}</span>
      <button onClick={() => navigator.clipboard.writeText(copyText)}>
        Copy
      </button>
    </div>
  );
}

export default function CodeBlock(props: any) {
  return (
    <div>
      <TopBar lang={props.lang} copyText={props.value} />
      <div className="hljs-codeblock">
        <SyntaxHighlighter
          PreTag={PreTag}
          CodeTag={CodeTag}
          language={props.lang}
          useInlineStyles={false}
          showLineNumbers
        >
          {props.value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
