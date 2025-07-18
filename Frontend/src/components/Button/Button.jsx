import "./Button.css";

const Button = ({ text, className = {}, ...props }) => {
    className += ` ButtonComponent`;
    return (
        <div>
            <button className={className} {...props}>
                {text}
            </button>
        </div>
    );
};

export default Button;
