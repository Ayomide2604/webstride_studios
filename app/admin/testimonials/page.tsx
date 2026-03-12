"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import TestimonialManager from "@/app/components/admin/TestimonialManager";
import Link from "next/link";

interface Testimonial {
	id: string;
	name: string;
	company?: string;
	quote: string;
	status?: string;
	created_at?: string;
	approved?: boolean;
	email?: string;
	avatar?: string;
	featured?: boolean;
	role?: string;
}

export default function TestimonialsPage() {
	const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedTestimonial, setSelectedTestimonial] =
		useState<Testimonial | null>(null);
	const [stats, setStats] = useState({
		total: 0,
		approved: 0,
		pending: 0,
		rejected: 0,
	});
	const [filter, setFilter] = useState<string>("all");
	const supabase = createClient();

	useEffect(() => {
		const fetchTestimonials = async () => {
			try {
				let query = supabase
					.from("testimonials")
					.select("*")
					.order("created_at", { ascending: false });

				// Apply filter
				if (filter === "approved") {
					query = query.eq("status", "approved");
				} else if (filter === "pending") {
					query = query.eq("status", "pending");
				} else if (filter === "rejected") {
					query = query.eq("status", "rejected");
				}

				const { data, error } = await query;

				if (error) {
					console.error("Error fetching testimonials:", error);
				} else {
					const testimonialData = data || [];
					setTestimonials(testimonialData);

					// Calculate stats from all testimonials (not filtered)
					const { data: allData } = await supabase
						.from("testimonials")
						.select("*")
						.order("created_at", { ascending: false });

					const allTestimonials = allData || [];
					const total = allTestimonials.length;
					const approved = allTestimonials.filter(
						(t) => t.status === "approved",
					).length;
					const pending = allTestimonials.filter(
						(t) => t.status === "pending",
					).length;
					const rejected = allTestimonials.filter(
						(t) => t.status === "rejected",
					).length;

					setStats({ total, approved, pending, rejected });
				}
			} catch (error) {
				console.error("Error:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTestimonials();

		// Set up real-time subscription
		const subscription = supabase
			.channel("testimonials")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "testimonials" },
				() => {
					fetchTestimonials(); // Refetch when data changes
				},
			)
			.subscribe();

		return () => {
			subscription.unsubscribe();
		};
	}, [supabase, filter]);

	const getStatusBadge = (testimonial: Testimonial) => {
		if (testimonial.status === "rejected") {
			return <span className="badge bg-danger">Rejected</span>;
		}
		if (testimonial.status === "approved") {
			return <span className="badge bg-success">Approved</span>;
		}
		return <span className="badge bg-warning">Pending</span>;
	};

	// Handle approve/reject testimonial
	const handleApproveReject = async (
		testimonial: Testimonial,
		action: "approved" | "rejected",
	) => {
		try {
			const { error } = await supabase
				.from("testimonials")
				.update({
					status: action, // Only update status field
				})
				.eq("id", testimonial.id);

			if (error) {
				console.error(`Error ${action} testimonial:`, error);
				alert(`Failed to ${action} testimonial`);
			} else {
				alert(`Testimonial ${action} successfully!`);
				// Refetch data
				const { data } = await supabase
					.from("testimonials")
					.select("*")
					.order("created_at", { ascending: false });
				setTestimonials(data || []);
				setSelectedTestimonial(null); // Close modal
			}
		} catch (error) {
			console.error(`Error ${action} testimonial:`, error);
		}
	};

	if (loading) {
		return (
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ minHeight: "200px" }}
			>
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="d-flex justify-content-between align-items-center mb-4">
				<h2 className="mb-0">Testimonial Management</h2>
				<div className="d-flex gap-2">
					<button className="btn btn-outline-primary">
						<i className="bi bi-download me-2"></i>
						Export
					</button>
					<a
						href="/testimonials/submit"
						className="btn btn-primary"
						target="_blank"
					>
						<i className="bi bi-plus-circle me-2"></i>
						Add Testimonial
					</a>
				</div>
			</div>

			{/* Filter Boxes */}
			<div className="row mb-4">
				<div className="col-md-3 mb-3">
					<div
						className={`card border-0 text-white cursor-pointer ${
							filter === "all" ? "bg-primary" : "bg-secondary"
						}`}
						onClick={() => setFilter("all")}
					>
						<div className="card-body text-center">
							<h3 className="mb-1">{stats.total}</h3>
							<p className="mb-0">All Testimonials</p>
						</div>
					</div>
				</div>
				<div className="col-md-3 mb-3">
					<div
						className={`card border-0 text-white cursor-pointer ${
							filter === "approved" ? "bg-success" : "bg-secondary"
						}`}
						onClick={() => setFilter("approved")}
					>
						<div className="card-body text-center">
							<h3 className="mb-1">{stats.approved}</h3>
							<p className="mb-0">Approved</p>
						</div>
					</div>
				</div>
				<div className="col-md-3 mb-3">
					<div
						className={`card border-0 text-white cursor-pointer ${
							filter === "pending" ? "bg-warning" : "bg-secondary"
						}`}
						onClick={() => setFilter("pending")}
					>
						<div className="card-body text-center">
							<h3 className="mb-1">{stats.pending}</h3>
							<p className="mb-0">Pending</p>
						</div>
					</div>
				</div>
				<div className="col-md-3 mb-3">
					<div
						className={`card border-0 text-white cursor-pointer ${
							filter === "rejected" ? "bg-danger" : "bg-secondary"
						}`}
						onClick={() => setFilter("rejected")}
					>
						<div className="card-body text-center">
							<h3 className="mb-1">{stats.rejected}</h3>
							<p className="mb-0">Rejected</p>
						</div>
					</div>
				</div>
			</div>

			{/* Testimonials Table */}
			<div className="card border-0 shadow-sm">
				<div className="card-body p-0">
					{testimonials.length === 0 ? (
						<div className="text-center py-5">
							<i className="bi bi-chat-quote fs-1 text-muted mb-3"></i>
							<h5 className="text-muted">No testimonials found</h5>
							<p className="text-muted">
								Start by adding your first testimonial or check if database is
								properly configured.
							</p>
						</div>
					) : (
						<div className="table-responsive">
							<table className="table table-hover mb-0">
								<thead className="table-light">
									<tr>
										<th>Name</th>
										<th>Company</th>
										<th>Quote</th>
										<th>Status</th>
										<th>Date</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{testimonials.map((testimonial) => (
										<tr key={testimonial.id}>
											<td>
												<div className="d-flex align-items-center">
													<div className="avatar avatar-sm rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2">
														<i className="bi bi-person fs-6"></i>
													</div>
													{testimonial.name}
												</div>
											</td>
											<td>{testimonial.company || "N/A"}</td>
											<td>
												<div
													className="text-truncate"
													style={{ maxWidth: "200px" }}
												>
													{testimonial.quote}
												</div>
											</td>
											<td>{getStatusBadge(testimonial)}</td>
											<td>
												{testimonial.created_at
													? new Date(
															testimonial.created_at,
														).toLocaleDateString()
													: "N/A"}
											</td>
											<td>
												<div className="btn-group" role="group">
													<button
														className="btn btn-sm btn-outline-primary"
														title="View"
														onClick={() => setSelectedTestimonial(testimonial)}
													>
														<i className="bi bi-eye"></i>
													</button>
													<button
														className="btn btn-sm btn-outline-danger"
														title="Delete"
														onClick={async () => {
															if (
																window.confirm(
																	"Are you sure you want to delete this testimonial?",
																)
															) {
																try {
																	await supabase
																		.from("testimonials")
																		.delete()
																		.eq("id", testimonial.id);
																	// Refetch data
																	const { data } = await supabase
																		.from("testimonials")
																		.select("*")
																		.order("created_at", {
																			ascending: false,
																		});
																	setTestimonials(data || []);
																} catch (error) {
																	console.error(
																		"Error deleting testimonial:",
																		error,
																	);
																}
															}
														}}
													>
														<i className="bi bi-trash"></i>
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>

			{/* Detail View Modal */}
			{selectedTestimonial && (
				<div
					className="modal fade show d-block"
					style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
				>
					<div className="modal-dialog modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Testimonial Details</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setSelectedTestimonial(null)}
								>
									<span>&times;</span>
								</button>
							</div>
							<div className="modal-body">
								{/* Debug: Show testimonial data */}
								<div className="alert alert-info mb-3">
									<strong>Debug:</strong>{" "}
									{JSON.stringify(selectedTestimonial, null, 2)}
								</div>

								<div className="row mb-3">
									<div className="col-md-6">
										<label className="form-label">Name</label>
										<p className="form-control-plaintext">
											{selectedTestimonial?.name || "No name"}
										</p>
									</div>
									<div className="col-md-6">
										<label className="form-label">Company</label>
										<p className="form-control-plaintext">
											{selectedTestimonial?.company || "N/A"}
										</p>
									</div>
								</div>
								<div className="row mb-3">
									<div className="col-12">
										<label className="form-label">Quote</label>
										<div className="card p-3 bg-light">
											<p className="mb-0">
												{selectedTestimonial?.quote || "No quote"}
											</p>
										</div>
									</div>
								</div>
								<div className="row mb-3">
									<div className="col-md-6">
										<label className="form-label">Status</label>
										<p className="form-control-plaintext">
											{getStatusBadge(selectedTestimonial)}
										</p>
									</div>
									<div className="col-md-6">
										<label className="form-label">Date</label>
										<p className="form-control-plaintext">
											{selectedTestimonial.created_at
												? new Date(
														selectedTestimonial.created_at,
													).toLocaleString()
												: "N/A"}
										</p>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={() => setSelectedTestimonial(null)}
								>
									<i className="bi bi-arrow-left me-2"></i>
									Back
								</button>
								{selectedTestimonial.status === "pending" && (
									<>
										<button
											type="button"
											className="btn btn-success me-2"
											onClick={() =>
												handleApproveReject(selectedTestimonial, "approved")
											}
										>
											<i className="bi bi-check-circle me-2"></i>
											Approve
										</button>
										<button
											type="button"
											className="btn btn-danger"
											onClick={() =>
												handleApproveReject(selectedTestimonial, "rejected")
											}
										>
											<i className="bi bi-x-circle me-2"></i>
											Reject
										</button>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
