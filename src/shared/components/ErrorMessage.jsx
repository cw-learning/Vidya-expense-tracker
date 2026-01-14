import PropTypes from 'prop-types';

export function ErrorMessage({ message, className = '' }) {
    if (!message) {
        return null;
    }

    return (
        <p className={`text-sm text-red-600 mt-1 ${className}`} role="alert">
            {message}
        </p>
    );
}

ErrorMessage.propTypes = {
    message: PropTypes.string,
    className: PropTypes.string,
};