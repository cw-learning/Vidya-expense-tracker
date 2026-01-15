import PropTypes from 'prop-types';

const BASE_STYLES =
	'px-4 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

const VARIANT_STYLES = {
	primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
	secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800',
	danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
};

export function Button({
	children,
	onClick,
	type = 'button',
	variant = 'primary',
	disabled = false,
	className = '',
}) {
	const variantClassName = VARIANT_STYLES[variant] ?? VARIANT_STYLES.primary;

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${BASE_STYLES} ${variantClassName} ${className}`}
		>
			{children}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
	disabled: PropTypes.bool,
	className: PropTypes.string,
};
