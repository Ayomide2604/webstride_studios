"use client";

import { useState, useEffect } from "react";
import { getAllTestimonials, updateTestimonialStatus, updateTestimonialFeatured, deleteTestimonial } from "@/lib/testimonials";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  email?: string;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await getAllTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
    try {
      await updateTestimonialStatus(id, status);
      await fetchTestimonials();
    } catch (error) {
      console.error("Error updating testimonial status:", error);
    }
  };

  const handleFeaturedUpdate = async (id: string, featured: boolean) => {
    try {
      await updateTestimonialFeatured(id, featured);
      await fetchTestimonials();
    } catch (error) {
      console.error("Error updating testimonial featured status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await deleteTestimonial(id);
        await fetchTestimonials();
      } catch (error) {
        console.error("Error deleting testimonial:", error);
      }
    }
  };

  const filteredTestimonials = testimonials.filter(t => 
    filter === 'all' || t.status === filter
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success';
      case 'pending': return 'bg-warning';
      case 'rejected': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-4">
        <div className="btn-group" role="group">
          <button
            type="button"
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('all')}
          >
            All ({testimonials.length})
          </button>
          <button
            type="button"
            className={`btn ${filter === 'pending' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({testimonials.filter(t => t.status === 'pending').length})
          </button>
          <button
            type="button"
            className={`btn ${filter === 'approved' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('approved')}
          >
            Approved ({testimonials.filter(t => t.status === 'approved').length})
          </button>
          <button
            type="button"
            className={`btn ${filter === 'rejected' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('rejected')}
          >
            Rejected ({testimonials.filter(t => t.status === 'rejected').length})
          </button>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="row">
        {filteredTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="col-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="mb-1">{testimonial.name}</h6>
                    <small className="text-muted">
                      {testimonial.role} {testimonial.company && `• ${testimonial.company}`}
                    </small>
                    {testimonial.email && (
                      <div>
                        <small className="text-muted">{testimonial.email}</small>
                      </div>
                    )}
                  </div>
                  <div className="d-flex gap-2">
                    <span className={`badge ${getStatusBadgeClass(testimonial.status)}`}>
                      {testimonial.status}
                    </span>
                    {testimonial.featured && (
                      <span className="bg-primary text-white badge">Featured</span>
                    )}
                  </div>
                </div>

                <p className="mb-3 fst-italic">"{testimonial.quote}"</p>

                <div className="d-flex gap-2 flex-wrap">
                  {testimonial.status === 'pending' && (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleStatusUpdate(testimonial.id, 'approved')}
                      >
                        <i className="bi bi-check me-1"></i>Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleStatusUpdate(testimonial.id, 'rejected')}
                      >
                        <i className="bi bi-x me-1"></i>Reject
                      </button>
                    </>
                  )}
                  
                  {testimonial.status === 'approved' && (
                    <>
                      <button
                        className={`btn btn-sm ${testimonial.featured ? 'btn-warning' : 'btn-outline-warning'}`}
                        onClick={() => handleFeaturedUpdate(testimonial.id, !testimonial.featured)}
                      >
                        <i className="bi bi-star me-1"></i>
                        {testimonial.featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleStatusUpdate(testimonial.id, 'pending')}
                      >
                        <i className="bi bi-clock me-1"></i>Pending
                      </button>
                    </>
                  )}

                  {testimonial.status === 'rejected' && (
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleStatusUpdate(testimonial.id, 'pending')}
                    >
                      <i className="bi bi-clock me-1"></i>Pending
                    </button>
                  )}

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(testimonial.id)}
                  >
                    <i className="bi bi-trash me-1"></i>Delete
                  </button>
                </div>

                <div className="mt-2">
                  <small className="text-muted">
                    Submitted: {new Date(testimonial.created_at).toLocaleDateString()}
                    {testimonial.updated_at !== testimonial.created_at && (
                      <> • Updated: {new Date(testimonial.updated_at).toLocaleDateString()}</>
                    )}
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredTestimonials.length === 0 && (
          <div className="col-12 text-center py-5">
            <p className="text-muted">No testimonials found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
