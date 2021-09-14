import { memo, useEffect, useState } from 'react';
import { useLogged } from '../../context/auth';
import Cookies from 'js-cookie';
import api from '../../services/api';
import { Button, LinkButton } from "../dumb/button";
import './style.css';

const Header = () => {
    const [userName, setUserName] = useState();
    const { logged, setLogged } = useLogged();
    const token = Cookies.get('token');

    useEffect( async () => {
        if (logged) {
            api.defaults.headers.token =  token ;
            const response = await api.get('/user/me');
            setUserName(response.data.name)
        }
    }, [logged])

    const onClick = () => {
        Cookies.remove('token');
        setLogged(false);
    }

    return (
        <header>
            { logged ? (
                <div>
                    <h2>Seja bem vindo {userName}!</h2>
                    <LinkButton type='commom' destiny='/updatecadastro'>Editar Cadastro</LinkButton>
                    <Button type='commom' onClick={onClick}>Logout</Button>
                </div>
            ) : (
            <div>
                <LinkButton type='button' destiny='/cadastro' >Cadastrar Novo Usuario</LinkButton>
                <LinkButton type='button' destiny='/' >Login</LinkButton>
            </div>
            )}
        </header>
    )
}

export default memo(Header);