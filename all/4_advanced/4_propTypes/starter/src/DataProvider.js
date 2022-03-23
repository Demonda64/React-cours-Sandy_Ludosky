import React from "react";
import { Context } from "./context";

function DataProvider(props) {
  return <Context.Consumer>{(value) => props.render(value)}</Context.Consumer>;
}
export default DataProvider;
