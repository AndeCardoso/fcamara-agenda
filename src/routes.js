import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PageLogin from './pages/login';
import PageCadastro from './pages/cadastro';
import PageAgenda from './pages/agenda';
import PageHome from './pages/home';
import NotFound from './pages/not-found';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route component = { PageLogin } path="/" exact />
                <Route component = { PageCadastro } path="/cadastro" />
                <Route component = { PageHome } path="/home" />
                <Route component = { PageAgenda } path="/agenda" />
                <Route component = { NotFound } path="*" />
            </Switch>
        </Router>
    )
}

export default Routes;