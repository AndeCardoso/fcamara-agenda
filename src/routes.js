import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './component/login';
import Cadastro from './component/cadastro';
import Agenda from './component/agenda';
import NotFound from './component/not-found';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route component = { Login } path="/" exact />
                <Route component = { Cadastro } path="/cadastro" />
                <Route component = { Agenda } path="/agenda" />
                <Route component = { NotFound } path="*" />
            </Switch>
        </Router>
    )
}

export default Routes;