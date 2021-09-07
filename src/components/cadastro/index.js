import { useState } from 'react';
import { history } from '../../history';
import api from '../../services/api';
import Button from '../dumb/button';
import Input from '../dumb/input';
import Alert from '../dumb/alert';
import './style.css';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [verifSenha, setVerifSenha] = useState('');

    const [alerta, setAlerta] = useState('');

    const verificaSenha = (event) => {        
        if (senha === event.target.value) {
            setVerifSenha("Senha confirmada!");
        } else {
            setVerifSenha("Senhas diferentes!");
        }
    };

    const onClick = async () => {

        const data = {
            name: nome,
            email: email,
            password: senha
        }  
        
        const response = await api.post('/user/signup', data);

        if ( response.data.token) {
            localStorage.setItem('cadastro-token', response.data.token)
            history.push('/')
        } else {
            console.log(response.data)
            if (response.data.error.password) {
                const erro = JSON.stringify(response.data.error.password.msg);
                setAlerta(erro);
            } else { 
                if (response.data.error.name) {
                    const erro = JSON.stringify(response.data.error.name.msg);
                    setAlerta(erro);
                } else {
                    const erro = JSON.stringify(response.data.error.email.msg);
                    setAlerta(erro);
                }
            }
        }
    };

    return (
        <div className="wrapper-cadastro">
            <h1>Cadastro</h1>
            <Alert type={alerta.type} >{alerta.msg}</Alert>
            <div className="form-cadastro">
                <label>
                    Nome
                    <Input type="text" onChange={ (event) => setNome(event.target.value) }/>
                </label>
                <label>
                    E-mail
                    <Input type="email" onChange={ (event) => setEmail(event.target.value) }/>
                </label>
                <label>
                    Senha
                    <Input type="password" onChange={ (event) => setSenha(event.target.value) }/>
                </label>
                <label>
                    Confirmação de Senha
                    <Input type="password" onChange={ (event) => verificaSenha(event) }/> 
                </label>
                <span>{verifSenha}</span>
            </div>
            <Button type="button" onClick={onClick}>Salvar</Button>
        </div>
    );
};

export default Cadastro;