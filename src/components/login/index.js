import { useState } from 'react';
import Input from '../dumb/input';
import Button from '../dumb/button';
import Alert from '../dumb/alert';
import api from '../../services/api'
import { dbValidationLogin } from '../../services/dbValidations';
import './style.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const [destiny, setDestiny] = useState('');
    const [alerta, setAlerta] = useState({ type: '', msg:'' });

    const validaEmail = (event) => {
        const value = event.target.value;

        if ( value.length < 6 && value.length !== 0 ){
            setAlerta({
                type: 'error',
                msg: 'A senha precisa de 6 caracteres!'
            });
            setEmail(value);
        } else {
            setAlerta({});
            setEmail(value);
        }
    };

    const validaSenha = (event) => {
        const value = event.target.value;
        if ( value.length < 6 && value.length !== 0 ){
            setAlerta({
                type: 'error',
                msg: 'A senha precisa de 6 caracteres!'
            });
            setSenha(value);
        } else {
            setAlerta({});
            setSenha(value);
        }
    };

    const onClick = async () => {
        if (!email || !senha) {
            setAlerta({
                type: 'error',
                msg: 'Preencha todos os campos!'
            });
            
        } else {

            const data = {
                email: email,
                password: senha
            } 

            console.log(data)

            const response = await api.post('/user/signin', data);
            const token = response.data.token;
            console.log(response)
            
            if ( token) {
                localStorage.setItem('login-token', token);
                setAlerta([]);
                setDestiny('/home')

            } else {
                setAlerta(dbValidationLogin(response)); 
                
            }
        };
    };
    
    return (
        <div className="wrapper-login">
            <h1>Login</h1>
            <Alert type={alerta.type}>{alerta.msg}</Alert>
            <div className="wrapper-login">
                <Input label="E-mail" type="email" onChange={event => validaEmail(event)} />
                <Input label="Senha" type="password" onChange={event => validaSenha(event)} />
                <Button destiny={''} type="submit" onClick={onClick}>Entrar</Button>
            </div>
        </div>
    );
};

export default Login;