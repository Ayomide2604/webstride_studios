"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { testimonials } from "../data/testimonials";
import TestimonialCard from "../components/TestimonialCard";

export default function Testimonials() {
	// Show only first 5 testimonials
	const displayedTestimonials = testimonials.slice(0, 5);

	return (
		<section className="py-5 py-xl-9 bg-gray-100">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-8 col-xl-6 text-center mb-5 mb-xl-7">
						<h2 className="mb-3">Customer success stories</h2>
						<p className="mb-0 lead">
							Real results from real clients — faster sites, better conversions,
							happier teams.
						</p>
					</div>
				</div>

				<div className="position-relative">
					<Swiper
						modules={[Navigation, Pagination, Autoplay]}
						spaceBetween={24}
						slidesPerView={1}
						breakpoints={{
							768: { slidesPerView: 2 },
							992: { slidesPerView: 2 },
						}}
						pagination={{
							el: ".custom-swiper-pagination",
							clickable: true,
						}}
						autoplay={{
							delay: 6000,
							disableOnInteraction: false,
						}}
						loop={false}
						className="pb-5 pb-md-6"
					>
						{displayedTestimonials.map((item) => (
							<SwiperSlide key={item.id}>
								<TestimonialCard
									id={item.id}
									quote={item.quote}
									name={item.name}
									role={item.role}
									company={item.company}
									avatar={item.avatar}
								/>
							</SwiperSlide>
						))}
					</Swiper>

					{/* External pagination – always below */}
					<div className="custom-swiper-pagination mt-4 mt-md-5 text-center"></div>
				</div>

				{/* See More Testimonials Button */}
				{testimonials.length > 5 && (
					<div className="text-center mt-5">
						<a href="#" className="btn btn-outline-primary">
							<i className="bi bi-arrow-right me-2"></i>
							See More Testimonials
						</a>
					</div>
				)}
			</div>
		</section>
	);
}
