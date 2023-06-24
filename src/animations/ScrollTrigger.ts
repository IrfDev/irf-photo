import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface ScrollTriggerArgs {
  triggerElement: string | Element;
}

export default function fadeOut({ triggerElement }: ScrollTriggerArgs) {
  gsap.registerPlugin(ScrollTrigger);

  return new ScrollTrigger({
    trigger: triggerElement,
    start: "top 70%",
    end: "bottom center",
  });
}
