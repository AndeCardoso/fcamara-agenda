import { Route, Router, Switch } from 'react-router';
import PageLogin from './pages/login';
import PageCadastro from './pages/cadastro';
import PageAgenda from './pages/agenda';
import PageHome from './pages/home';
import NotFound from './pages/not-found';
import { history } from './history';

const Routes = () => {
    return (
        <Router history={ history }>
            <Switch>
                <Route component = { PageLogin } path="/" exact />
                <Route component = { PageCadastro } path="/cadastro" />
                <Route component = { PageHome } path="/home" />
                <Route component = { PageAgenda } path="/agenda" />
                <Route component = { NotFound } path="/not-found" />
            </Switch>
        </Router>
    )
}

export default Routes;