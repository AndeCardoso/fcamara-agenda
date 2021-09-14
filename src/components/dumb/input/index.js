import './style.css';

const Input = ({ onChange, type, label, name, value }) => {
    return (
        <label>
            <span>{label}</span>
            <input
            type={type}
            name={name}
            onChange={onChange}
            value={value}
            />
        </label>
    );
};

export default Input;