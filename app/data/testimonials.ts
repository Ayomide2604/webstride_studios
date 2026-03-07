// data/testimonials.ts
export interface Testimonial {
	id: number;
	name: string;
	role: string;
	avatar: string;
	quote: string;
	company?: string; // optional
}

export const testimonials: Testimonial[] = [
	{
		id: 1,
		name: "Sandeep Chauhan",
		role: "Frontend Lead",
		avatar: "/assets/images/avatar.jpg",
		quote:
			"Working with this team transformed our online presence. Page speed went from 42 to 98 and our conversion rate increased by 37% in just three months.",
	},
	{
		id: 2,
		name: "Aisha Patel",
		role: "Marketing Director",
		avatar: "/assets/images/avatar.jpg",
		quote:
			"The headless commerce solution they built for us is rock-solid. We now handle 10× more traffic without any slowdowns. Truly impressive work.",
	},
	{
		id: 3,
		name: "Marcus Johnson",
		role: "CTO",
		avatar: "/assets/images/avatar.jpg",
		quote:
			"Fastest development turnaround we've ever experienced while still maintaining excellent code quality and best practices. Highly recommend.",
	},
	{
		id: 4,
		name: "Elena Rodriguez",
		role: "E-commerce Manager",
		avatar: "/assets/images/avatar.jpg",
		quote:
			"Our new Next.js storefront loads in under 1 second. Customers noticed the difference immediately — bounce rate dropped 41%. Game changer.",
	},
	{
		id: 5,
		name: "David Kim",
		role: "Product Owner",
		avatar: "/assets/images/avatar.jpg",
		quote:
			"They didn't just build what we asked for — they anticipated needs we didn't even know we had. The admin experience is a joy to use.",
	},
	{
		id: 6,
		name: "Sophie Laurent",
		role: "Founder & CEO",
		avatar: "/assets/images/avatar.jpg",
		quote:
			"From strategy to launch in under 10 weeks. Beautiful design, lightning performance, and SEO that actually works. Worth every penny.",
	},
	{
		id: 7,
		name: "James Okoro",
		role: "Growth Lead",
		avatar: "/assets/images/avatar.jpg",
		quote:
			"The Jamstack migration cut our hosting costs by 68% and made content updates instant. The team really knows modern web architecture.",
	},
];
