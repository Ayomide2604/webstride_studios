import Appointment from "./sections/Appointment";
import Hero from "./sections/Hero";
import Services from "./sections/Services";

export default function Home() {
	return (
		<div>
			<Hero />
			<Services/>
			<Appointment/>
		</div>
	);
}
