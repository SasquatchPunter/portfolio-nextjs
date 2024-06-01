import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import * as classes from "@utils/components/classes";
import * as styles from "@utils/components/styles";

import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import java from "react-syntax-highlighter/dist/esm/languages/hljs/java";
import css from "react-syntax-highlighter/dist/esm/languages/hljs/css";
import typescript from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";

import CopyIcon from "@icons/copy-outline.svg";

SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("typescript", typescript);

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
    <div className="flex justify-between py-2 px-4 bg-gray-600">
      <span>{lang}</span>
      <button
        className="w-6 h-auto"
        onClick={() => navigator.clipboard.writeText(copyText)}
      >
        <CopyIcon />
      </button>
    </div>
  );
}

export default function CodeBlock(props: any) {
  return (
    <div className="overflow-hidden rounded-md border-2 border-gray-500">
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
