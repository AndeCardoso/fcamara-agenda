import './style.css'

const Login = () => {
    return (
        <div className="wrapper-login">
            <label>
                E-mail:
                <input type="text" />
            </label>
            <label>
                Senha:
                <input type="password" />
            </label>
        </div>
    );
};

export default Login;