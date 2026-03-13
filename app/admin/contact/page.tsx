"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface ContactMessage {
	id: string;
	name: string;
	email: string;
	phone?: string;
	company?: string;
	message: string;
	created_at: string;
	status?: "new" | "read" | "replied";
}

export default function ContactPage() {
	const [messages, setMessages] = useState<ContactMessage[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
		null,
	);
	const [replyContent, setReplyContent] = useState("");
	const [stats, setStats] = useState({
		total: 0,
		new: 0,
		read: 0,
		replied: 0,
	});
	const [filter, setFilter] = useState<string>("all");
	const supabase = createClient();

	const fetchMessages = async () => {
		try {
			let query = supabase
				.from("contact_messages")
				.select("*")
				.order("created_at", { ascending: false });

			// Apply filter
			if (filter === "new") {
				query = query.eq("status", "new");
			} else if (filter === "read") {
				query = query.eq("status", "read");
			} else if (filter === "replied") {
				query = query.eq("status", "replied");
			}

			const { data, error } = await query;

			if (error) {
				console.error("Error fetching messages:", error);
			} else {
				const messageData = data || [];
				setMessages(messageData);

				// Calculate stats from all messages (not filtered)
				const { data: allData } = await supabase
					.from("contact_messages")
					.select("*")
					.order("created_at", { ascending: false });

				const allMessages = allData || [];
				const total = allMessages.length;
				const newMessages = allMessages.filter(
					(m) => m.status === "new",
				).length;
				const readMessages = allMessages.filter(
					(m) => m.status === "read",
				).length;
				const repliedMessages = allMessages.filter(
					(m) => m.status === "replied",
				).length;

				setStats({
					total,
					new: newMessages,
					read: readMessages,
					replied: repliedMessages,
				});
			}
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMessages();

		// Set up real-time subscription
		const subscription = supabase
			.channel("contact_messages")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "contact_messages" },
				() => {
					fetchMessages(); // Refetch when data changes
				},
			)
			.subscribe();

		return () => {
			subscription.unsubscribe();
		};
	}, [supabase, filter]);

	const handleStatusUpdate = async (id: string, status: "read" | "replied") => {
		try {
			const { error } = await supabase
				.from("contact_messages")
				.update({ status })
				.eq("id", id);

			if (error) {
				console.error("Error updating message status:", error);
				alert("Failed to update message status");
			} else {
				alert("Message status updated successfully");
				fetchMessages();
			}
		} catch (error) {
			console.error("Error updating message status:", error);
		}
	};

	const handleDelete = async (id: string) => {
		if (
			!confirm(
				"Are you sure you want to delete this message? This action cannot be undone.",
			)
		) {
			return;
		}

		try {
			const { error } = await supabase
				.from("contact_messages")
				.delete()
				.eq("id", id);

			if (error) {
				console.error("Error deleting message:", error);
				alert("Failed to delete message");
			} else {
				alert("Message deleted successfully");
				setSelectedMessage(null);
				fetchMessages();
			}
		} catch (error) {
			console.error("Error deleting message:", error);
		}
	};

	const handleReply = async () => {
		if (!selectedMessage || !replyContent.trim()) {
			alert("Please select a message and enter a reply");
			return;
		}

		try {
			// Send email notification (you can integrate with your email service)
			const { error } = await supabase
				.from("contact_messages")
				.update({
					status: "replied",
					reply: replyContent,
					replied_at: new Date().toISOString(),
				})
				.eq("id", selectedMessage.id);

			if (error) {
				console.error("Error sending reply:", error);
				alert("Failed to send reply");
			} else {
				alert("Reply sent successfully!");
				setReplyContent("");
				setSelectedMessage(null);
				fetchMessages();
			}
		} catch (error) {
			console.error("Error sending reply:", error);
		}
	};

	const getStatusBadge = (status?: string) => {
		switch (status) {
			case "new":
				return "bg-primary";
			case "read":
				return "bg-success";
			case "replied":
				return "bg-info";
			default:
				return "bg-secondary";
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
				<h2 className="mb-0">Contact Messages</h2>
				<div className="d-flex gap-2">
					<button className="btn btn-outline-primary">
						<i className="bi bi-download me-2"></i>
						Export
					</button>
				</div>
			</div>

			{/* Stats Cards */}
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
							<p className="mb-0">All Messages</p>
						</div>
					</div>
				</div>
				<div className="col-md-3 mb-3">
					<div
						className={`card border-0 text-white cursor-pointer ${
							filter === "new" ? "bg-primary" : "bg-secondary"
						}`}
						onClick={() => setFilter("new")}
					>
						<div className="card-body text-center">
							<h3 className="mb-1">{stats.new}</h3>
							<p className="mb-0">New Messages</p>
						</div>
					</div>
				</div>
				<div className="col-md-3 mb-3">
					<div
						className={`card border-0 text-white cursor-pointer ${
							filter === "read" ? "bg-warning" : "bg-secondary"
						}`}
						onClick={() => setFilter("read")}
					>
						<div className="card-body text-center">
							<h3 className="mb-1">{stats.read}</h3>
							<p className="mb-0">Read Messages</p>
						</div>
					</div>
				</div>
				<div className="col-md-3 mb-3">
					<div
						className={`card border-0 text-white cursor-pointer ${
							filter === "replied" ? "bg-info" : "bg-secondary"
						}`}
						onClick={() => setFilter("replied")}
					>
						<div className="card-body text-center">
							<h3 className="mb-1">{stats.replied}</h3>
							<p className="mb-0">Replied Messages</p>
						</div>
					</div>
				</div>
			</div>

			{/* Messages Table */}
			<div className="card border-0 shadow-sm">
				<div className="card-body p-0">
					{messages.length === 0 ? (
						<div className="text-center py-5">
							<i className="bi bi-envelope fs-1 text-muted mb-3"></i>
							<h5 className="text-muted">No contact messages found</h5>
							<p className="text-muted">
								When users submit the contact form, messages will appear here.
							</p>
						</div>
					) : (
						<div className="table-responsive">
							<table className="table table-hover mb-0">
								<thead className="table-light">
									<tr>
										<th>Name</th>
										<th>Email</th>
										<th>Company</th>
										<th>Status</th>
										<th>Date</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{messages.map((message) => (
										<tr key={message.id}>
											<td>
												<div className="d-flex align-items-center">
													<div className="avatar avatar-sm rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2">
														<i className="bi bi-person fs-6"></i>
													</div>
													{message.name}
												</div>
											</td>
											<td>{message.email}</td>
											<td>{message.company || "N/A"}</td>
											<td>
												<span
													className={`badge ${getStatusBadge(message.status)}`}
												>
													{message.status}
												</span>
											</td>
											<td>
												{new Date(message.created_at).toLocaleDateString()}
											</td>
											<td>
												<div className="btn-group" role="group">
													<button
														className="btn btn-sm btn-outline-primary"
														title="View Details"
														onClick={() => setSelectedMessage(message)}
													>
														<i className="bi bi-eye"></i>
													</button>
													{message.status === "new" && (
														<button
															className="btn btn-sm btn-success"
															title="Mark as Read"
															onClick={() =>
																handleStatusUpdate(message.id, "read")
															}
														>
															<i className="bi bi-check"></i>
														</button>
													)}
													{message.status === "read" && (
														<button
															className="btn btn-sm btn-info"
															title="Reply"
															onClick={() => setSelectedMessage(message)}
														>
															<i className="bi bi-reply"></i>
														</button>
													)}
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

			{/* Message Detail Modal */}
			{selectedMessage && (
				<div
					className="modal fade show d-block"
					style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
				>
					<div className="modal-dialog modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Message Details</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setSelectedMessage(null)}
								>
									<span>&times;</span>
								</button>
							</div>
							<div className="modal-body">
								{/* Contact Information */}
								<div className="card mb-4">
									<div className="card-header bg-primary text-white">
										<h6 className="mb-0">
											<i className="bi bi-person-fill me-2"></i>
											Contact Information
										</h6>
									</div>
									<div className="card-body">
										<div className="row">
											<div className="col-md-6 mb-3">
												<label className="form-label fw-bold">Name</label>
												<p className="form-control-plaintext fs-6">
													{selectedMessage.name}
												</p>
											</div>
											<div className="col-md-6 mb-3">
												<label className="form-label fw-bold">Email</label>
												<p className="form-control-plaintext fs-6">
													<a
														href={`mailto:${selectedMessage.email}`}
														className="text-primary text-decoration-none"
													>
														{selectedMessage.email}
													</a>
												</p>
											</div>
										</div>
										<div className="row">
											<div className="col-md-6 mb-3">
												<label className="form-label fw-bold">Phone</label>
												<p className="form-control-plaintext fs-6">
													{selectedMessage.phone ? (
														<a
															href={`tel:${selectedMessage.phone}`}
															className="text-primary text-decoration-none"
														>
															{selectedMessage.phone}
														</a>
													) : (
														<span className="text-muted">Not provided</span>
													)}
												</p>
											</div>
											<div className="col-md-6 mb-3">
												<label className="form-label fw-bold">Company</label>
												<p className="form-control-plaintext fs-6">
													{selectedMessage.company || (
														<span className="text-muted">Not provided</span>
													)}
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* Message Content */}
								<div className="card mb-4">
									<div className="card-header bg-info text-white">
										<h6 className="mb-0">
											<i className="bi bi-envelope-fill me-2"></i>
											Message Content
										</h6>
									</div>
									<div className="card-body">
										<div className="bg-light p-3 rounded">
											<p
												className="mb-0 fs-6"
												style={{ whiteSpace: "pre-wrap" }}
											>
												{selectedMessage.message}
											</p>
										</div>
									</div>
								</div>

								{/* Message Details */}
								<div className="card mb-4">
									<div className="card-header bg-secondary text-white">
										<h6 className="mb-0">
											<i className="bi bi-info-circle-fill me-2"></i>
											Message Details
										</h6>
									</div>
									<div className="card-body">
										<div className="row">
											<div className="col-md-6 mb-3">
												<label className="form-label fw-bold">Status</label>
												<div>
													<span
														className={`badge ${getStatusBadge(selectedMessage.status)} fs-6`}
													>
														{selectedMessage.status}
													</span>
												</div>
											</div>
											<div className="col-md-6 mb-3">
												<label className="form-label fw-bold">Received</label>
												<p className="form-control-plaintext fs-6">
													{new Date(
														selectedMessage.created_at,
													).toLocaleString()}
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* Reply Section */}
								{selectedMessage.status === "read" && (
									<div className="card">
										<div className="card-header bg-success text-white">
											<h6 className="mb-0">
												<i className="bi bi-reply-fill me-2"></i>
												Reply to Message
											</h6>
										</div>
										<div className="card-body">
											<div className="mb-3">
												<label className="form-label fw-bold">Your Reply</label>
												<textarea
													className="form-control"
													rows={4}
													placeholder="Type your reply here..."
													value={replyContent}
													onChange={(e) => setReplyContent(e.target.value)}
												></textarea>
											</div>
											<div className="d-flex gap-2">
												<button
													type="button"
													className="btn btn-primary"
													onClick={handleReply}
													disabled={!replyContent.trim()}
												>
													<i className="bi bi-send me-2"></i>
													Send Reply
												</button>
												<button
													type="button"
													className="btn btn-outline-secondary"
													onClick={() => setReplyContent("")}
												>
													<i className="bi bi-x-circle me-2"></i>
													Clear
												</button>
											</div>
										</div>
									</div>
								)}

								{/* Action Buttons */}
								<div className="d-flex justify-content-between mt-4">
									<button
										type="button"
										className="btn btn-secondary"
										onClick={() => setSelectedMessage(null)}
									>
										<i className="bi bi-arrow-left me-2"></i>
										Back to List
									</button>

									<div className="d-flex gap-2">
										{selectedMessage.status === "new" && (
											<button
												type="button"
												className="btn btn-success"
												onClick={() =>
													handleStatusUpdate(selectedMessage.id, "read")
												}
											>
												<i className="bi bi-check me-2"></i>
												Mark as Read
											</button>
										)}
										{selectedMessage.status === "read" && (
											<button
												type="button"
												className="btn btn-info"
												onClick={() => setReplyContent("")}
											>
												<i className="bi bi-reply me-2"></i>
												Reply
											</button>
										)}
										<button
											type="button"
											className="btn btn-danger"
											onClick={() => handleDelete(selectedMessage.id)}
										>
											<i className="bi bi-trash me-2"></i>
											Delete
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
