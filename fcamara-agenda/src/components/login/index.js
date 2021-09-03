import Button from '../dumb/button'
import Input from '../dumb/input'
import './style.css'

const Login = () => {
    return (
        <div className="wrapper-login">
            <label>
                E-mail:
                <Input type="text" onChange={""} />
            </label>
            <label>
                Senha:
                <Input type="password" onChange={""} />
            </label>
            <Button type="submit" onClick="">Entrar</Button>
        </div>
    );
};

export default Login;