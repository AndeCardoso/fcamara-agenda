import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PageLogin from './pages/login';
import PageCadastro from './pages/cadastro';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component = { PageLogin } path="/" exact />
                <Route component = { PageCadastro } path="/cadastro" />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;