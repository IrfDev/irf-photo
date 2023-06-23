import Link from "next/link";
import { useRouter } from "next/router";
import BaseButton from "../atoms/BaseButton";

const Navbar = () => {
  const router = useRouter();

  const isHome = () => router.pathname === "/";

  const href = `mailto:irving.dev@icloud.com?subject=Impresive portfolio, let's do a colaboration&body=I'm a cool person with great creative ideas to discuss`;

  const handleClickOnEmail = () => {
    window.location.href = href;
  };

  return (
    <nav
      role="navigation"
      className="w-full flex justify-between items-center my-4 2xl:px-0 px-4"
    >
      <div>
        {!isHome() && (
          <Link href="/">
            <svg
              className="h-8"
              viewBox="0 0 29 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.94977 12.25L28.25 12.25L28.25 15.75L6.94976 15.75L16.3367 25.1369L13.8618 27.6118L0.25003 14L13.8618 0.388226L16.3367 2.8631L6.94977 12.25Z"
                fill="#1C1B1B"
              />
            </svg>
          </Link>
        )}
      </div>
      <div className="flex space-x-3 items-center">
        <a className="uppercase font-light text-sm" href={href}>
          irving.dev@icloud.com
        </a>

        <BaseButton
          customFunction={handleClickOnEmail}
          title="Let's connect"
          url="/"
          type="primary"
        />
      </div>
    </nav>
  );
};

export default Navbar;
