import { useState, useEffect  } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api'
import Input from '../dumb/input';
import Button from '../dumb/button';
import Alert from '../dumb/alert';
import { dbValidationLogin } from '../../services/dbValidations';
import isLogged from '../../services/isLogged'

import './style.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const [destiny, setDestiny] = useState('');
    const [alerta, setAlerta] = useState({ type: '', msg:'' });

    let history = useHistory();

    useEffect(()  =>  {
        if(isLogged) {
            history.push('/agenda');
        }
    }, []);

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
            
            if ( token) {
                sessionStorage.setItem('login-token', token);
                setAlerta([]);
                setDestiny('/main');

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
                <Button destiny={'/agenda'} type="commom" onClick={onClick}>Entrar</Button>
            </div>
        </div>
    );
};

export default Login;