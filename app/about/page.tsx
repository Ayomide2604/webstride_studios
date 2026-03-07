import Newsletter from "../components/Newsletter";
import AboutHero from "./AboutHero";
import ImageGallery from "./ImageGallery";
import OurProcess from "./OurProcess";
import OurValues from "./OurValues";

const page = () => {
	return (
		<>
			<div className="pattern-square"></div>
			<AboutHero />
			<ImageGallery />
			<OurValues />
			<OurProcess />
			<Newsletter />
		</>
	);
};

export default page;
