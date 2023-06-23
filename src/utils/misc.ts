import { MutableRefObject } from "react";

export const isRefAnElement = (
  someReactRef: MutableRefObject<HTMLElement | null>
): boolean => {
  if (
    typeof someReactRef === "object" &&
    typeof someReactRef.current === "object" &&
    someReactRef.current instanceof HTMLElement
  ) {
    return true;
  }

  return false;
};
