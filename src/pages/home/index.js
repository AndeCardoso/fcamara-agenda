import { history } from '../../history';
import Button from '../../components/dumb/button';

const PageHome = () => {
    const onClick = () => {
        history.push('/agenda');
    }

    return (
        <div>
            <h1>Home</h1>
            <Button type='button' onClick={ onClick } >Agenda</Button>
        </div>
    )
}

export default PageHome;