import { useState, useEffect } from 'react';
import api from '../../services/api';
import Button from '../dumb/button';
import Input from '../dumb/input';
import Alert from '../dumb/alert';

import './style.css';
import { dbValidationRegister } from '../../services/dbValidations';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [verifSenha, setVerifSenha] = useState('');

    const [alertaSenha, setAlertaSenha] = useState({type: '', msg: ''});
    const [alerta, setAlerta] = useState({type: '', msg: ''});

    //state senha listener
    useEffect(() => {
        verificaSenha(verifSenha);
    }, [senha]);
    
    const validaEmail = (event) => {
        const value = event.target.value;

        if ( value.includes("@") && value.includes(".") ) {
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
            const response = await api.post('/user/signup', data);

            if ( response.data.token) {
                localStorage.setItem('cadastro-token', response.data.token)
            } else {
                setAlerta(dbValidationRegister(response));
            }
        }
    };

    return (
        <div className="wrapper-cadastro">
            <h1>Cadastro</h1>
            <Alert type={alerta.type} >{alerta.msg}</Alert>
            <div className="form-cadastro">
                <Input label="Nome" type="text" onChange={ (event) => validaNome(event) }/>
                <Input label="E-mail" type="email" onChange={ (event) => validaEmail(event) }/>
                <Input label="Senha" type="password" onChange={ (event) => validaSenha(event) }/>
                <Input label="Confirmação de Senha" type="password" onChange={ (event) => verificaSenha(event.target.value) }/> 
                <Alert type={alertaSenha.type}>{alertaSenha.msg}</Alert>
            </div>
            <Button destiny={''} type='submit' onClick={onClick}>Salvar</Button>
        </div>
    );
};

export default Cadastro;