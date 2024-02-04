type Token = string | null | undefined;

export class LocalStorage {
    private keys = {
        token: 'token'
    }

    get token(): Token {
        return localStorage.getItem(this.keys.token);
    }

    set token(token: Token) {
        if (token) localStorage.setItem(this.keys.token, token);
    }

    /* Funcões para limpar dados do localStorage */
    tokenClear() {
        localStorage.removeItem(this.keys.token);
    }
}