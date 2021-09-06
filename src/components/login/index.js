import { useState } from 'react';
import Input from '../dumb/input';
import Button from '../dumb/button';
import api from '../../services/api'
import './style.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const onClick = async () => {

        const data = {
            email: email,
            password: senha
        }  
        
        const response = await api.post('/user/signin', data);
        
        if (response.data.token) {
            alert('usuairo logado com token: ' + response.data.token)
        }
        console.log(response);        
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
            <Button type="submit" onClick={onClick}>Entrar</Button>
        </div>
    );
};

export default Login;