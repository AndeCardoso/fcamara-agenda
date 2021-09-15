import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Button, LinkButton } from '../dumb/button';
import Input from '../dumb/input';
import Alert from '../dumb/alert';

import api from '../../services/api';
import { useLogged } from '../../context/auth';
import { dbValidationLogin } from '../../services/dbValidations';

import Logo from './logo.png';
import './style.css';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [alerta, setAlerta] = useState({ type: '', msg: '' });

    const { logged, setLogged } = useLogged();

    let history = useHistory();

    useEffect(()  =>  {
        if(Cookies.get('token')) {
            setLogged(true);
            history.push('/agenda');
        } else {
            setLogged(false);
        }
    }, []);

    const validaEmail = (event) => {
        const value = event.target.value;

        if ( value.includes("@") && value.includes(".com") ) {
            setEmail(value);
            setAlerta({});
        } else {
            if (!value) {
                setAlerta({});
            }
            setAlerta({
                type: 'error',
                msg: 'Formato de E-mail invalido!'
            });
        }
    }

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
            const response = await api.post('/user/signin', data)
            .then(response => {
                Cookies.set("token", response.data.token);
                setAlerta([]);
                setLogged(true);
                history.push('/agenda');
                
            }).catch(errors => {
                    setAlerta({
                        type: 'error',
                        msg: 'Erro!'
                    });
                    setLogged(false);
            });
            // if (Cookies.get("token") !== undefined){
            //     setAlerta([]);
            //     setLogged(true);
            //     history.push('/agenda');
            // } else {
                
            //     setAlerta({
            //         type: 'error',
            //         msg: response.data.error
            //     });
            //     setLogged(false);
            // }
        };
    };
    
    return (
        <div className="wrapper">
            <div className="login-top">
                <img src={Logo} />
                <p>
                Olá Sanque Laranja.<br/>
                Agende seu retorno ao escritório,
                sem burocracia e sem aglomeração!
                </p>
            </div>
            <Alert className="alert" type={alerta.type}>{alerta.msg}</Alert>
            <div className="wrapper-login">
                <Input label="E-mail" type="email" onChange={event => validaEmail(event)} />
                <Input label="Senha" type="password" onChange={event => validaSenha(event)} />
            </div>
            <div className="login-btns">
                <Button type="button primary" onClick={onClick}>Entrar</Button>
                <LinkButton type="button secondary" destiny='/cadastro' >Cadastrar</LinkButton>
            </div>
        </div>
    );
};

export default Login;