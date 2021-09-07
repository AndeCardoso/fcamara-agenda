import { useState } from 'react';
import Input from '../dumb/input';
import Button from '../dumb/button';
import { history } from '../../history';
import api from '../../services/api'
import './style.css';
import Alert from '../dumb/alert';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [alerta, setAlerta] = useState({type: '', msg:''});

    const onClick = async () => {
        if (!email || !senha) {
            setAlerta({
                type: 'error',
                msg: 'Preencha todos os campos!'
            })
        } else {
            const data = {
                email: email,
                password: senha
            }
            
            const response = await api.post('/user/signin', data);
            
            if ( response.data.token) {
                localStorage.setItem('login-token', response.data.token);
                console.log(response.data)
                history.push('/home');
            } else {
                switch (response.status) {
                    case 301:
                        setAlerta({
                            type: 'error',
                            msg: 'E-mail não cadastrado!'
                        });
                        break;
                    case 302:
                        setAlerta({
                            type: 'error',
                            msg: 'Senha incorreta!'
                        })                   
                }
            }    
        }
          
    };
    
    return (
        <div className="wrapper-login">
            <h1>Login</h1>
            <Alert type={alerta.type}>{alerta.msg}</Alert>
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