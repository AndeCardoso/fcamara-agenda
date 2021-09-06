import { useState } from 'react';
import { history } from '../../history';
import api from '../../services/api';
import Button from '../dumb/button';
import Input from '../dumb/input';
import './style.css'

const Cadastro = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [verifSenha, setVerifSenha] = useState('');

    const verificaSenha = (event) => {
        console.log(event.target.value , senha)
        
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
        }

    };

    return (
        <div className="wrapper-cadastro">
            <h1>Cadastro</h1>
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
                    <span>{verifSenha}</span>
                </label>
            </div>
            <Button type="button" onClick={onClick}>Salvar</Button>
        </div>
    );
};

export default Cadastro;