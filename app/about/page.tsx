import AboutHero from "./AboutHero";
import ImageGallery from "./ImageGallery";
import OurValues from "./OurValues";

const page = () => {
	return (
		<>
			<div className="pattern-square"></div>
			<AboutHero />
			<ImageGallery />
			<OurValues />
		</>
	);
};

export default page;
