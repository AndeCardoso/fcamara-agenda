import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Header from "../header";
import Login from '../login';
import Cadastro from '../cadastro';
import UpdateCadastro from '../cadastro/atualizarCadastro';
import Agenda from '../agenda';
import NotFound from '../not-found';

import { AuthProvider } from '../../context/auth';

import './style.css';

const Home = () => {
    return (
        <AuthProvider>
            <Router>
                <div className='wrapper-home'>
                    <Header />
                    <main>
                        <Switch>
                            <Route component = { Login } path="/" exact />
                            <Route component = { Cadastro } path="/cadastro" />
                            <Route component = { UpdateCadastro } path="/updatecadastro" />
                            <Route component = { Agenda } path="/agenda" />
                            <Route component = { NotFound } path="*" />
                        </Switch>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    )
}

export default Home;