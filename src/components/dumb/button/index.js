import { Link } from "react-router-dom";
import './style.css';

const Button = ({destiny, type, children, onClick}) => {
    return (
        <Link to={ destiny }>
            <button type={ type } onClick={onClick}>{children}</button>
        </Link>
    );
};

export default Button;