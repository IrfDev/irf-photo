import { useRouter } from "next/router";
import { CSSProperties } from "react";

interface BaseButtonProps extends WpLink {
  type?: "primary" | "secondary";
  className?: string;
  style?: CSSProperties;
  customFunction?: Function;
}

const BaseButton = ({
  target = "_blank",

  title,

  type = "primary",

  url,

  style = {},

  className = "",

  customFunction,
}: BaseButtonProps) => {
  const isPrimary = type === "primary";

  const isTargetInternal = target === "internal";

  const router = useRouter();

  const handleOnClick = () => {
    if (customFunction instanceof Function) {
      customFunction();
      return;
    }

    if (isTargetInternal) {
      router.push({
        href: url,
      });
      return;
    }

    if (isPrimary) {
      window.open(url, target);
    }
  };

  return (
    <button
      style={style}
      onClick={handleOnClick}
      role="link"
      title={title}
      className={`${className} p-2 text-sm rounded-full border-primary hover:text-white hover:bg-primary transition-all duration-300 ease-in-out border uppercase font-normal`}
    >
      {title}
    </button>
  );
};

export default BaseButton;
