type Token = string | null | undefined;

export class LocalStorage {
    private keys = {
        token: 'token',
        usuario: 'usuario',
        modulo: 'modulo'
    }

    get token(): Token {
        return localStorage.getItem(this.keys.token);
    }

    set token(token: Token) {
        if (token) localStorage.setItem(this.keys.token, token);
    }

    get modulo(): string {
        return localStorage.getItem(this.keys.modulo) || '';
    }

    set modulo(modulo: string) {
        if (modulo) localStorage.setItem(this.keys.modulo, modulo);
    }

    get usuario(): any {
        const dados = localStorage.getItem(this.keys.usuario);

        if (dados) return JSON.parse(dados);
        else undefined;
    }

    set usuario(usuario: object) {
        if (usuario) localStorage.setItem(this.keys.usuario, JSON.stringify(usuario));
    }

    /* Funcões para limpar dados do localStorage */
    tokenClear() {
        localStorage.removeItem(this.keys.token);
    }
    usuarioClear() {
        localStorage.removeItem(this.keys.usuario);
    }
    moduloClear() {
        localStorage.removeItem(this.keys.modulo);
    }
    allClear() {
        this.tokenClear();
        this.usuarioClear();
        this.moduloClear();
    }
}