export interface Testimonial {
	id: string;
	name: string;
	role: string;
	company?: string;
	quote: string;
	email?: string;
	avatar: string;
	status: 'pending' | 'approved' | 'rejected';
	featured: boolean;
	created_at: string;
	updated_at: string;
}

export interface TestimonialFormData {
	name: string;
	role: string;
	company: string;
	quote: string;
	email: string;
	avatar?: File;
}
