import Image from "next/image";

interface TestimonialCardProps {
	id: number;
	quote: string;
	name: string;
	role: string;
	company?: string;
	avatar: string;
}

const TestimonialCard = ({
	id,
	quote,
	name,
	role,
	company,
	avatar,
}: TestimonialCardProps) => {
	return (
		<div className="h-100 px-2 px-md-3 pb-3 pb-md-4">
			<div className="card shadow-sm border-0 rounded-4 h-100 overflow-hidden">
				<div className="card-body p-4 p-lg-5">
					<p className="mb-5 lead text-muted fst-italic">"{quote}"</p>
					<div className="mt-auto d-flex align-items-center">
						<Image
							src={avatar}
							alt={name}
							className="avatar avatar-lg rounded-circle me-3"
							width={70}
							height={70}
							style={{ objectFit: "cover" }}
						/>
						<div>
							<h6 className="mb-1 fw-bold">{name}</h6>
							<span className="small text-body-tertiary">
								{role}
								{company && ` • ${company}`}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TestimonialCard;
