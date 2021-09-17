import Image from './notfound.png'
import './style.css'

const NotFound = () => {
    return (
        <div className="wrapper-nf">
            <h2>Ops!</h2>
            <img src={Image} alt="Imagem de um triangulo com ponto de exclamação" />
            <h3 >Página não encontrada!</h3>
        </div>
    );
};

export default NotFound;