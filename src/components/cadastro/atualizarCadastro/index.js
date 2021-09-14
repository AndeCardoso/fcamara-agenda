import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useLogged } from '../../../context/auth';
import { dbValidationRegister } from '../../../services/dbValidations';
import api from '../../../services/api';

import { Button } from '../../dumb/button';
import Input from '../../dumb/input';
import Alert from '../../dumb/alert';

import './style.css';

const UpdateCadastro = () => {
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
            history.push('/')
        }
    }, [])

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
    
    const onUpdate = async () => {
        if (!nome || !email || !senha) {
            alert("aqui")
            setAlerta({
                type: 'error',
                msg: 'Preencha todos os campos!'
            })
        } else {
            const data = {
                name: nome,
                email: email,
                password: senha
            }
            api.defaults.headers.authorization =  token ;
            const response = await api.put('/user/me', data);
            console.log('aqui')
            console.log(response)
            if ( response.data.token) {
                history.push('/agenda');
            } else {
                setAlerta(dbValidationRegister(response));
            }
        }
    };

    const onDelete = async () => {
        api.defaults.headers.authorization =  token ;
        const response = await api.delete('/user/me');
    }

    return (
        <div className="wrapper-cadastro">
            <h1>Atualizar Cadastro</h1>
            <Alert type={alerta.type} >{alerta.msg}</Alert>
            <div className="form-cadastro">
                <Input label="Nome" type="text" value={nome} onChange={ (event) => validaNome(event) }/>
                <Input label="E-mail" type="email" value={email} onChange={ (event) => validaEmail(event) }/>
                <Input label="Senha" type="password" onChange={ (event) => validaSenha(event) }/>
                <Input label="Confirmação de Senha" type="password" onChange={ (event) => verificaSenha(event.target.value) }/> 
                <Alert type={alertaSenha.type}>{alertaSenha.msg}</Alert>
            </div>
            <Button type='commom' onClick={onUpdate}>Atualizar</Button>
            <Button type='warning' onClick={onDelete}>Deletar Usuario</Button>
        </div>
    );
};

export default UpdateCadastro;