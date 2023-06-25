import React, { useState, useEffect, MutableRefObject } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ScrollSmoother from "../lib/scrollSmoother";
import { GALLERY_SECTION_CLASSNAME } from "../types/constants";

interface ScrollTriggerArgs {
  triggerElement: string;
}

const lerp = (a, b, n) => (1 - n) * a + n * b;

export default function getScrollTrigger(elementId: any) {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const ease = 0.5;

  const [currentScroll, setCurrentScroll] = useState(0);

  const [speed, setCurrentSpeed] = useState(0);

  const [scrolllable, setScrollable] = useState<Element | null>(null);

  const [scrollToRender, setScrollToRender] = useState(0);

  const [direction, setDirection] = useState<number>(1);

  const [scrollTrigger, setScrollTrigger] = useState<any | ScrollTrigger>(null);

  const [triggerElement, setTriggerElement] = useState<any>(null);

  const [newTimeline, setNewTimeline] = useState<any>(null);

  let calculatePosition = () => {
    if (
      triggerElement &&
      newTimeline &&
      scrollTrigger !== null &&
      (Math.round(scrollToRender) !== Math.round(currentScroll) ||
        scrollToRender < 10)
    ) {
      setTimeout(() => {
        newTimeline.to(triggerElement, {
          z: 0,
          backgroundColor: scrollTrigger.direction === 1 ? "red" : "blue",
          y: scrollTrigger.direction * scrollTrigger.progress * 100,
          duration: 0.4,
        });
      }, 100);
    }
  };

  let render = () => {
    setCurrentSpeed(
      Math.min(Math.abs(currentScroll - scrollToRender), 200) / 200
    );

    setScrollToRender(
      lerp(scrollToRender, scrollTrigger.direction * 100, ease)
    );

    // and translate the scrollable element
    calculatePosition();
  };

  useEffect(() => {
    if (scrollTrigger) {
      requestAnimationFrame(render);

      render();
    }
  }, [scrollTrigger]);

  useEffect(() => {
    if (elementId) {
      setTimeout(() => {
        let triggerElementSelector = document.getElementById(elementId);

        let newScrollTrigger = new ScrollTrigger({
          trigger: `.${GALLERY_SECTION_CLASSNAME}`,
          markers: true,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: function (scrollTriggerInstance: ScrollTrigger) {
            setCurrentScroll(scrollTriggerInstance.progress * 100);
            setDirection(scrollTriggerInstance.direction);
            console.log("direction,currentScroll", direction, currentScroll);
            calculatePosition();
          },
        });

        setTriggerElement(triggerElementSelector);

        setScrollTrigger(newScrollTrigger);
      }, 100);
    }
  }, [elementId]);

  return { scrollTrigger };
}
