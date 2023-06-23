import BaseButton from "../atoms/BaseButton";
import RichText from "../atoms/RichText";

const About = ({ about, cta, title }: AboutFieldType) => {
  return (
    <div className="lg:my-72 my-72 lg:flex justify-between items-start">
      <div className="xl:w-1/3 lg:w-1/2">
        <h2 className="lg:text-7xl md:text-6xl text-5xl uppercase lg:mb-0 mb-10">
          {title}
        </h2>
      </div>
      <div className="relative lg:w-1/3">
        <RichText className="text-lg font-light space-y-3" content={about} />
        <BaseButton className="mt-8" type="primary" {...cta} />
      </div>
    </div>
  );
};

export default About;
