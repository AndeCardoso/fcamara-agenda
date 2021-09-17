export const dbValidationLogin = ( errors ) => {
    const status = errors.response.status;
    let alerta = {type: '', msg: ''};
    switch (status) {
        case 400:
            alerta = {
                type: 'error',
                msg: 'Dados inválidos!'
            };
            return alerta;
        case 401:
            alerta = {
                type: 'error',
                msg: 'E-mail ou senha inválido!'
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

export const dbValidationRegister = ( errors ) => {
    const status = errors.response.status;
    let alerta = {type: '', msg: ''};
    switch (status) {
        case 400:
            alerta = {
                type: 'error',
                msg: 'Dados inválidos!'
            };
            return alerta;
        case 409:
            alerta = {
                type: 'error',
                msg: 'E-mail já cadastrado!'
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

export const dbValidationUserInfo = ( errors ) => {
    const status = errors.response.status;
    let alerta = {type: '', msg: ''};
    switch (status) {
        case 401:
            alerta = {
                type: 'error',
                msg: 'A sessão expirou!'
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

export const dbValidationUserUpdate = ( errors ) => {
    const status = errors.response.status;
    let alerta = {type: '', msg: ''};
    switch (status) {
        case 400:
            alerta = {
                type: 'error',
                msg: 'E-mail inválido!'
            };
            return alerta;
        case 409:
            alerta = {
                type: 'error',
                msg: 'E-mail já cadastrado!'
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

export const dbValidationUserDelete = ( errors ) => {
    const status = errors.response.status;
    let alerta = {type: '', msg: ''};
    switch (status) {
        case 401:
            alerta = {
                type: 'error',
                msg: 'A sessão expirou!'
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

export const dbValidationSchedule = ( errors ) => {
    const status = errors.response.status;
    let alerta = {type: '', msg: ''};
    switch (status) {
        case 400:
            alerta = {
                type: 'error',
                msg: 'Não há mais vagas para este dia!'
            };
            return alerta;
        case 401:
            alerta = {
                type: 'error',
                msg: 'Esta data já está agendada!'
            };
            return alerta;
        case 404:
            alerta = {
                type: 'error',
                msg: 'Erro ao agendar data!'
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

export const dbValidationCancelAppoint = ( errors ) => {
    const status = errors.response.status;
    let alerta = {type: '', msg: ''};
    switch (status) {
        case 400:
            alerta = {
                type: 'error',
                msg: 'A sessão expirou!'
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