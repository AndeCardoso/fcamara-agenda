// import { useState } from "react";
import Button from "../dumb/button";
import Input from "../dumb/input";

const Cadastro = () => {
    // const [cadastro, setCadastro] = useState({});

    return (
        <div className="wrapper">
            <h2>Cadastro</h2>
            <label>
                Nome
                <Input type="text" onChange={""}/>
            </label>
            <label>
                E-mail
                <Input type="email" onChange={""}/>
            </label>
            <label>
                Senha
                <Input type="password" onChange={""}/>
            </label>
            <label>
                Confirmação de Senha
                <Input type="password" onChange={""}/>
            </label>
            <Button type="button" onClick={""}>Salvar</Button>
        </div>
    );
};

export default Cadastro;