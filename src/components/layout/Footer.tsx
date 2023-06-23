import BaseImage from "../atoms/BaseImage";

const Footer = () => {
  const currentYear = () => new Date().getFullYear();
  return (
    <footer className="bg-primary w-full p-5 pb-0">
      <div className="flex justify-between item-center">
        <div className="w-2/3 flex-col justify-between items-stretch flex">
          <span className="text-6xl uppercase font-bold text-white">
            Let's collaborate on something cool
          </span>

          <section className="mt-10">
            <span className="font-bold text-sm text-white uppercase block">
              email
            </span>

            <span className="font-light text-left text-white">
              irving.dev@icloud.com
            </span>
          </section>
        </div>

        <BaseImage
          url={
            "https://res.cloudinary.com/dwmbg3c4g/images/v1686543783/wordpress/NOKV0370/NOKV0370.jpeg?_i=AA"
          }
          alt="Picture of Irving Suarez siting"
          height={800}
          width={963}
          className="w-1/5 h-full"
        />
      </div>
      <div className="flex justify-end mt-20  pb-3">
        <div className="font-light text-sm text-white">
          ©{currentYear()} All rights reserverd
        </div>
      </div>
    </footer>
  );
};

export default Footer;
