import { useState } from 'react';
import api from '../../services/api';
import Button from '../dumb/button';
import Input from '../dumb/input';

const Cadastro = () => {
    // const [cadastro, setCadastro] = useState({
    //     nome: '',
    //     email: '',
    //     senha: '',
    //     verifSenha: ''
    // });

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [verifSenha, setVerifSenha] = useState('');

    const verificaSenha = (event) => {
        console.log(event.target.value , senha)
        
        if (senha === event.target.value) {
            setVerifSenha("Senha confirmada!");
            console.log(verifSenha);
        } else {
            setVerifSenha("Senhas diferentes!");
            console.log(verifSenha);
        }
    };

    const onClick = async () => {

        const data = {
            name: nome,
            email: email,
            password: senha
        }  
        
        const response = await api.post('/user/signup', data);

        console.log(response);
              
    };

    return (
        <div className="wrapper">
            <h2>Cadastro</h2>
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
                <h3>{verifSenha}</h3>
            </label>
            <Button type="button" onClick={onClick}>Salvar</Button>
        </div>
    );
};

export default Cadastro;