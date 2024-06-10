import ReactDatetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import React from "react";
import type { ComponentProps } from "react";
import { wrapFieldsWithMeta } from "tinacms";

type Props = ComponentProps<ReturnType<typeof wrapFieldsWithMeta>>;
export default function Datetime(props: Props) {
  const className =
    "shadow-inner focus:shadow-outline focus:border-blue-500 focus:outline-none block text-base placeholder:text-gray-300 px-3 py-2 text-gray-600 w-full bg-white border border-gray-200 transition-all ease-out duration-150 focus:text-gray-900 rounded-md";
  const style = "";
  const { dateFormat, timeFormat, disabled } = props.field as any;
  const { value } = props.input;
  return (
    <ReactDatetime
      inputProps={{ disabled }}
      className={className}
      dateFormat={dateFormat}
      timeFormat={timeFormat}
      {...props.input}
      value={value ? new Date(value) : undefined}
    />
  );
}
