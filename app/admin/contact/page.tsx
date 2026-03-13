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
  status?: 'new' | 'read' | 'replied';
}

export default function ContactPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("contact_messages")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching messages:", error);
        } else {
          setMessages(data || []);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Set up real-time subscription
    const subscription = supabase
      .channel("contact_messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_messages" },
        () => {
          fetchMessages(); // Refetch when data changes
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleStatusUpdate = async (id: string, status: 'read' | 'replied') => {
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
          replied_at: new Date().toISOString()
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
      case "new": return "bg-primary";
      case "read": return "bg-success";
      case "replied": return "bg-info";
      default: return "bg-secondary";
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
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
          <div className="card border-0 bg-primary text-white">
            <div className="card-body">
              <h3 className="mb-1">{messages.length}</h3>
              <p className="mb-0">Total Messages</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 bg-success text-white">
            <div className="card-body">
              <h3 className="mb-1">
                {messages.filter(m => m.status === "new").length}
              </h3>
              <p className="mb-0">New Messages</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 bg-warning text-white">
            <div className="card-body">
              <h3 className="mb-1">
                {messages.filter(m => m.status === "read").length}
              </h3>
              <p className="mb-0">Read Messages</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 bg-info text-white">
            <div className="card-body">
              <h3 className="mb-1">
                {messages.filter(m => m.status === "replied").length}
              </h3>
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
                    <th>Phone</th>
                    <th>Company</th>
                    <th>Message</th>
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
                      <td>{message.phone || "N/A"}</td>
                      <td>{message.company || "N/A"}</td>
                      <td>
                        <div className="text-truncate" style={{ maxWidth: "200px" }}>
                          {message.message}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadge(message.status)}`}>
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
                              onClick={() => handleStatusUpdate(message.id, "read")}
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
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
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
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <p className="form-control-plaintext">{selectedMessage.name}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <p className="form-control-plaintext">{selectedMessage.email}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <p className="form-control-plaintext">{selectedMessage.phone || "N/A"}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Company</label>
                    <p className="form-control-plaintext">{selectedMessage.company || "N/A"}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <label className="form-label">Message</label>
                    <div className="card p-3 bg-light">
                      <p className="mb-0">{selectedMessage.message}</p>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <p className="form-control-plaintext">
                      <span className={`badge ${getStatusBadge(selectedMessage.status)}`}>
                        {selectedMessage.status}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Received</label>
                    <p className="form-control-plaintext">
                      {new Date(selectedMessage.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                {selectedMessage.status === "read" && (
                  <div className="row mb-3">
                    <div className="col-12">
                      <label className="form-label">Reply</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Type your reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                )}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">&nbsp;</label>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setSelectedMessage(null)}
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Back
                    </button>
                    {selectedMessage.status === "read" && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleReply}
                      >
                        <i className="bi bi-send me-2"></i>
                        Send Reply
                      </button>
                    )}
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
