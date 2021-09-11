import Button from "../dumb/button"

const Header = () => {
    return (
        <div>
            <Button type='button' destiny='/cadastro' >Cadastrar Novo Usuario</Button>
            <Button type='button' destiny='/' >Login</Button>
        </div>
    )
}

export default Header;