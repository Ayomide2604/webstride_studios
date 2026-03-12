const ThemeToggle = () => {
	const handleClick = (e: React.MouseEvent) => {
		console.log("Theme toggle clicked");
		console.log("Event target:", e.target);
		console.log(
			"Bootstrap loaded:",
			typeof window !== "undefined" && (window as any).bootstrap,
		);

		// Try to manually trigger Bootstrap dropdown
		const button = e.currentTarget as HTMLElement;
		const dropdown = button.nextElementSibling as HTMLElement;

		if (
			dropdown &&
			typeof window !== "undefined" &&
			(window as any).bootstrap
		) {
			console.log("Attempting manual Bootstrap dropdown");
			try {
				const bsDropdown = new (window as any).bootstrap.Dropdown(button);
				bsDropdown.toggle();
				console.log("Bootstrap dropdown toggle called");
			} catch (error) {
				console.error("Bootstrap dropdown error:", error);
			}
		}
	};

	return (
		<div className="dropdown dropup">
			<button
				className="btn btn-light btn-icon rounded-circle d-flex align-items-center"
				type="button"
				aria-expanded="false"
				data-bs-toggle="dropdown"
				data-bs-auto-close="outside"
				data-bs-boundary="viewport"
				data-theme-js-ignore="true"
				onClick={handleClick}
				aria-label="Toggle theme (auto)"
			>
				<i className="bi theme-icon-active lh-1">
					<i className="bi theme-icon bi-sun-fill"></i>
				</i>
				<span className="visually-hidden bs-theme-text">Toggle theme</span>
			</button>
			<ul
				className="dropdown-menu dropdown-menu-end shadow"
				style={{
					zIndex: 1055,
					position: "absolute",
				}}
				aria-labelledby="bs-theme-text"
			>
				<li>
					<button
						type="button"
						className="dropdown-item d-flex align-items-center active"
						data-bs-theme-value="light"
						aria-pressed="true"
					>
						<i className="bi theme-icon bi-sun-fill"></i>
						<span className="ms-2">Light</span>
					</button>
				</li>
				<li>
					<button
						type="button"
						className="dropdown-item d-flex align-items-center"
						data-bs-theme-value="dark"
						aria-pressed="false"
					>
						<i className="bi theme-icon bi-moon-stars-fill"></i>
						<span className="ms-2">Dark</span>
					</button>
				</li>
				<li>
					<button
						type="button"
						className="dropdown-item d-flex align-items-center"
						data-bs-theme-value="auto"
						aria-pressed="false"
					>
						<i className="bi theme-icon bi-circle-half"></i>
						<span className="ms-2">Auto</span>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default ThemeToggle;
