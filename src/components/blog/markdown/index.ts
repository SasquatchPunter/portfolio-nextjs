import { Components } from "tinacms/dist/rich-text";

import BlockQuote from "./BlockQuote";
import Code from "./Code";
import CodeBlock from "./Codeblock";
import H1 from "./H1";
import H2 from "./H2";
import H3 from "./H3";
import H4 from "./H4";
import H5 from "./H5";
import H6 from "./H6";
import P from "./P";

export default {
  block_quote: BlockQuote,
  code: Code,
  code_block: CodeBlock,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
} as Components<{}>;
