import Button from '../../components/dumb/button';
import Login from '../../components/login';
import { history } from '../../history';
import './style.css';

const PageLogin = () => {

    const onClick = () => {
        history.push('/cadastro');
    }

    return (
        <div>
            <Button type='button' onClick={ onClick } >Novo cadastro</Button>
            <Login />
        </div>
    );
};

export default PageLogin;