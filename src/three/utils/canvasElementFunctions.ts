import { MutableRefObject } from "react";

export const getElementSize = (
  element: MutableRefObject<HTMLCanvasElement | null>
) => ({
  height: element?.current?.getBoundingClientRect().height,
  width: element?.current?.getBoundingClientRect().width,
  top: element?.current?.getBoundingClientRect().top,
  left: element?.current?.getBoundingClientRect().left,
  offsetTop: element?.current?.offsetTop,
  offsetLeft: element?.current?.offsetLeft,
});
