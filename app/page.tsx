import About from "./sections/About";
import Appointment from "./sections/Appointment";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import TechStack from "./sections/TechStack";

export default function Home() {
	return (
		<div>
			<Hero />
			<Services />
			<About />
			<TechStack />
			<Appointment />
		</div>
	);
}
