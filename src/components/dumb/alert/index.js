import './style.css'

const Alert = ({ type, children }) => {
    return (
        <span className={type} >{ children }</span>
    );
};

export default Alert;