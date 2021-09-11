import { Route, BrowserRouter as Router, Switch, Prompt } from 'react-router-dom';
import Header from "../header";
import Login from '../login';
import Cadastro from '../cadastro';
import Agenda from '../agenda';
import NotFound from '../../pages/not-found';
import './style.css';


const Home = () => {

    return (
        <Router>
            <div className='wrapper-home'>
                <Header />
                <main>
                    <Switch>
                        <Route component = { Login } path="/" exact />
                        <Route component = { Cadastro } path="/cadastro" />
                        <Route component = { Agenda } path="/agenda" />
                        <Route component = { NotFound } path="*" />
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default Home;