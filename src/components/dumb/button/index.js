import { Link } from "react-router-dom";

import './style.css';

const Button = ({ type, children, onClick}) => {
    return (
        <button type='button' className={ type } onClick={onClick}>{children}</button>
    );
};

const LinkButton = ({destiny, type, children, onClick}) => {
    return (
        <Link to={ destiny }>
            <button type='button' className={ type } onClick={onClick}>{children}</button>
        </Link>
    );
};

export { Button, LinkButton };