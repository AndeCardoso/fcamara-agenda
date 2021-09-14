export const dbValidationLogin = ( response ) => {
    const status = response.data.error;
    console.log(status)
    let alerta = {type: '', msg: ''};
    switch (status) {
        case '300':
            alerta = {
                type: 'error',
                msg: 'Formato de e-mail invalido!'
            };
            return alerta;
        case '301':
            alerta = {
                type: 'error',
                msg: 'E-mail não cadastrado!'
            };
            return alerta;
        case '302':
            alerta = {
                type: 'error',
                msg: 'Senha incorreta!'
            };
            return alerta;
        default:
            alerta = {
                type: 'error',
                msg: 'Um erro inesperado aconteceu!'
            };
            return alerta; 
    }
}

export const dbValidationRegister = ( response ) => {
    const status = response.data.status;
    console.log(status)
    let alerta = {type: '', msg: ''};
    switch (status) {
        case '300':
            alerta = {
                type: 'error',
                msg: 'O nome precisa no minimo de 2 letras!'
            };
            return alerta;
        case '301':
            alerta = {
                type: 'error',
                msg: 'Formato de e-mail invalido!'
            };
            return alerta;
        case '302':
            alerta = {
                type: 'error',
                msg: 'Senha precisa no minimo de 6 caracteres!'
            };
            return alerta;
        default:
            alerta = {
                type: 'error',
                msg: 'Um erro inesperado aconteceu!'
            }
            return alerta;
    }
}