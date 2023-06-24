import React, { useState, useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface ScrollTriggerArgs {
  triggerElement: string | Element;
}

const lerp = (a, b, n) => (1 - n) * a + n * b;

export default function getScrollTrigger({
  triggerElement,
}: ScrollTriggerArgs) {
  gsap.registerPlugin(ScrollTrigger);

  const ease = 0.5;

  const [currentScroll, setCurrentScroll] = useState(0);
  const [speed, setCurrentSpeed] = useState(0);
  const [scrolllable, setScrollable] = useState<Element | null>(null);
  const [scrollToRender, setScrollToRender] = useState(0);

  let calculatePosition = () => {
    if (
      triggerElement &&
      (Math.round(scrollToRender) !== Math.round(currentScroll) ||
        scrollToRender < 10)
    ) {
      triggerElement.current.style.transform = `translate3d(0,${
        -1 * scrollToRender
      }px,0)`;
    }
  };

  let render = () => {
    setCurrentSpeed(
      Math.min(Math.abs(currentScroll - scrollToRender), 200) / 200
    );

    setScrollToRender(lerp(scrollToRender, currentScroll, ease));

    // and translate the scrollable element
    calculatePosition();
  };

  useEffect(() => {
    if (triggerElement && triggerElement.current) {
      ScrollTrigger.create({
        trigger: triggerElement.current,
        markers: true,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (scrollTriggerInstance: ScrollTrigger) => {
          setCurrentScroll(scrollTriggerInstance.progress);
        },
      });
    }
    requestAnimationFrame(render);
    render();
  }, [triggerElement]);

  return { currentScroll };
}
