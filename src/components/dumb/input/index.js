import './style.css';

const Input = ({ onChange, type, label, name }) => {
    return (
        <label>
            {label}
            <input
            type={type}
            name={name}
            onChange={onChange}
            />
        </label>
    );
};

export default Input;