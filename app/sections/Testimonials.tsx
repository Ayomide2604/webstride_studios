// components/Testimonials.jsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { testimonials } from "./data/testimonials";

export default function Testimonials() {
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
						loop={true}
						className="pb-5 pb-md-6"
					>
						{testimonials.map((item) => (
							<SwiperSlide key={item.id}>
								{/* Added p-3 or p-4 here restores internal spacing around each card */}
								<div className="h-100 px-2 px-md-3 pb-3 pb-md-4">
									<div className="card shadow-sm border-0 rounded-4 h-100 overflow-hidden">
										<div className="card-body p-4 p-lg-5">
											{" "}
											{/* bigger internal padding */}
											<p className="mb-5 lead text-muted fst-italic">
												"{item.quote}"
											</p>
											<div className="mt-auto d-flex align-items-center">
												<img
													src={item.avatar}
													alt={item.name}
													className="avatar avatar-lg rounded-circle me-3"
													width="70"
													height="70"
												/>
												<div>
													<h6 className="mb-1 fw-bold">{item.name}</h6>
													<span className="small text-body-tertiary">
														{item.role}
														{item.company && ` • ${item.company}`}
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					{/* External pagination – always below */}
					<div className="custom-swiper-pagination mt-4 mt-md-5 text-center"></div>
				</div>
			</div>
		</section>
	);
}
