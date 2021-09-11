const isLogged = () => {
    const token = sessionStorage.getItem('token-login');
    if (token) {
        return true;
    } else {
        return false;
    }
}

export default isLogged;