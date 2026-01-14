import PropTypes from "prop-types";

export function Button({
	children,
	onClick,
	type = "button",
	variant = "primary",
	disabled = false,
	className = "",
}) {
	const baseStyles =
		"px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 shadow-md hover:shadow-lg";

	const variantStyles = {
		primary:
			"bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 shadow-teal-200",
		secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800",
		danger:
			"bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-red-200",
	};

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${baseStyles} ${variantStyles[variant]} ${className}`}
		>
			{children}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
	type: PropTypes.oneOf(["button", "submit", "reset"]),
	variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
	disabled: PropTypes.bool,
	className: PropTypes.string,
};
