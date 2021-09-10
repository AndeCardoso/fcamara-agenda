import Button from '../../components/dumb/button';
import Login from '../../components/login';
import './style.css';

const PageLogin = () => {

    return (
        <div>
            <Button destiny='/cadastro' type='button' >Novo cadastro</Button>
            <Login />
        </div>
    );
};

export default PageLogin;