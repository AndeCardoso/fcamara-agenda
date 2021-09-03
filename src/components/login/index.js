import { useState } from 'react/cjs/react.development';
import Button from '../dumb/button'
import Input from '../dumb/input'
import './style.css'

const Login = () => {
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    let usuario = [email, senha];
    usuario.email = "admin";
    usuario.senha = "admin";

    const submitLogin = () => {
        if (!email) {
            alert("Informe um E-mail para fazer login!");
        }
        if (!senha) {
            alert("Informe uma Senha para fazer login!");
        } else {
            if (email === usuario.email & senha === usuario.senha) {
                alert( email + " logado com sucesso!");
            }
        }
    };

    return (
        <div className="wrapper-login">
            <h1>Login</h1>
            <label>
                E-mail:
                <Input type="text" onChange={(event => setEmail(event.target.value))} />
            </label>
            <label>
                Senha:
                <Input type="password" onChange={(event => setSenha(event.target.value))} />
            </label>
            <Button type="submit" onClick={submitLogin}>Entrar</Button>
        </div>
    );
};

export default Login;