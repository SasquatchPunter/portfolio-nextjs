/** Join style strings and style objects into a CSS styles prop */
export function join(
  ...styles: Array<string | React.CSSProperties>
): React.CSSProperties {
  let out = {};
  styles.forEach((style) => {
    if (typeof style === "string") {
      if (style.length === 0) return;
      style = parseStyleString(style);
    }
    out = { ...out, ...style };
  });
  return out;
}

function parseStyleString(styles: string) {
  const out = {};
  styles
    .split(";")
    .filter((style) => style)
    .map((style) => style.split(":"))
    .map((style) => [style[0].trim(), style[1].trim()])
    .forEach((style) => {
      out[kebabToCamelCase(style[0])] = style[1];
    });
  return out;
}

function kebabToCamelCase(string: string) {
  return string.replace(/-./g, (x) => x[1].toUpperCase());
}
