import { Route, BrowserRouter } from 'react-router-dom';
import PageLogin from './pages/login';
import PageCadastro from './pages/cadastro';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component = { PageLogin } path="/" exact />
            <Route component = { PageCadastro } path="/cadastro" />
        </BrowserRouter>
    )
}

export default Routes;