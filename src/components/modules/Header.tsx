import BaseImage from "../atoms/BaseImage";

const Header = ({ hero, title }: HeroHeaderFieldType) => {
  return (
    <div className="lg:min-h-screen">
      <h1 className="2xl:text-11xl xl:text-10xl lg:text-9xl md:text-8xl sm:text-7xl  text-5xl uppercase font-bold text-primary mb-2">
        {title}
      </h1>
      <div className="h-full relative">
        <BaseImage
          className="h-full w-full object-cover"
          {...hero.hero_image}
        />

        <div className="absolute w-full md:p-10 p-5 bottom-0 flex justify-between items-end">
          <span className="text-white xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-xl block w-1/3 uppercase font-body">
            {hero.title}
          </span>
          <span className="uppercase xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-lg text-white flext items-center">
            ©{new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
