import './style.css';

const Select = ({ value, onChange, label }) => {
    return (
        <label className="label-select">
            <span>{label}</span>
            <select value={value} onChange={onChange} className="select" >
                <option value="Santos">Santos</option>
                <option value="São Paulo">São Paulo</option>
            </select>
        </label>
    );
};

export default Select;