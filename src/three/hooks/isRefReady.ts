import React, { MutableRefObject, useMemo } from "react";

type Props = {};

const isRefReady = ({
  element,
}: {
  element: MutableRefObject<HTMLCanvasElement>;
}) => {
  const isElementReady = useMemo(
    () => typeof element === "object" && typeof element.current === "object",
    [element]
  );

  return isElementReady;
};

export default isRefReady;
