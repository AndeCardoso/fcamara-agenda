import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useLogged } from '../../context/auth';
import { dbValidationRegister } from '../../services/dbValidations';
import api from '../../services/api';

import { Button, LinkButton } from '../dumb/button';
import Input from '../dumb/input';
import Alert from '../dumb/alert';

import './style.css';

const Cadastro = () => {
    const { logged, setLogged } = useLogged();
    const token = Cookies.get("token");

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [verifSenha, setVerifSenha] = useState('');

    const [alertaSenha, setAlertaSenha] = useState({type: '', msg: ''});
    const [alerta, setAlerta] = useState({type: '', msg: ''});

    const history = useHistory();

    useEffect( async () => {
        if (logged){
            api.defaults.headers.token =  token ;
            const response = await api.get('/user/me');
            setNome(response.data.name);
            setEmail(response.data.email);          
        } else {
            setLogged(false)
        }
    }, [])

    useEffect(() => {
        verificaSenha(verifSenha);

    }, [senha]);
    
    const validaEmail = (event) => {
        const value = event.target.value;

        if ( value.includes("@") && value.includes(".com") ) {
            setEmail(value);
            setAlerta({});
        } else {
            setAlerta({
                type: 'error',
                msg: 'Formato de E-mail invalido!'
            });
        }
    }
    
    const validaNome = (event) => {
        const value = event.target.value;
        if ( value.length < 2 && value.length !== 0 ){
            setAlerta({
                type: 'error',
                msg: 'O nome precisa de 2 letras!'
            });
        } else {
            setAlerta({});
            setNome(value);
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

    const verificaSenha = (event) => {
        setVerifSenha();
        if (event) {
            if (senha === event) {
                setAlertaSenha({
                    type: 'sucess',
                    msg: 'Senha confirmada'
                });
                setVerifSenha(event);
            } else {
                setAlertaSenha({
                    type: 'error',
                    msg: 'Senhas diferentes!'
                });
                setVerifSenha(event);
            }
        } else {
            setAlertaSenha({})
        }
    };

    const onClick = async () => {

        const data = {
            name: nome,
            email: email,
            password: senha
        }

        if (!nome || !email || !senha) {
            setAlerta({
                type: 'error',
                msg: 'Preencha todos os campos!'
            })
        } else {
            await api.post('/user/signup', data)
            .then(response => {
                Cookies.set('token', response.data.token);
                setLogged(true);
                setAlerta({})
                history.push('/agenda');
                
            }).catch(errors => {
                const errorMsg = dbValidationRegister(errors);
                setAlerta({
                    type: errorMsg.type,
                    msg: errorMsg.msg
                });
                setLogged(false);
            });
        }
    };
    
    return (
        <div className="wrapper-register">
            <h1>CADASTRO</h1>
            <Alert type={alertaSenha.type}>{alertaSenha.msg}</Alert>
            <Alert type={alerta.type} >{alerta.msg}</Alert>
            <div className="register-form">
                <Input label="Nome" type="text" onChange={ (event) => validaNome(event) }/>
                <Input label="E-mail" type="email" onChange={ (event) => validaEmail(event) }/>
                <Input label="Senha" type="password" onChange={ (event) => validaSenha(event) }/>
                <Input label="Confirmação de Senha" type="password" onChange={ (event) => verificaSenha(event.target.value) }/>  
            </div>
            <div className="register-btns">
                <Button type='button primary' onClick={onClick}>Cadastrar</Button>
                <LinkButton type='button secondary' destiny='/' >Login</LinkButton>
            </div>
        </div>
    );
};

export default Cadastro;