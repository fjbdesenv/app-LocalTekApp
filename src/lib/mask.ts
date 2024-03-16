export const Mask = {

    /* Máscara de CPF */
    cpf(cpf: string): string {
        let maskCPF = cpf;

        maskCPF = maskCPF?.replace(/\D/g, "");
        maskCPF = maskCPF?.replace(/(\d{3})(\d)/, "$1.$2");
        maskCPF = maskCPF?.replace(/(\d{3})(\d)/, "$1.$2");
        maskCPF = maskCPF?.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        if (maskCPF.length > 14) maskCPF = maskCPF.slice(0, 14); /* Aceita apenas 11 números */
        return maskCPF;
    },

    /* Máscara de CNPJ */
    cnpj(cpf: string): string {
        let maskCPF = cpf;

        maskCPF = maskCPF?.replace(/\D/g, "");
        maskCPF = maskCPF?.replace(/(\d{2})(\d)/, "$1.$2");
        maskCPF = maskCPF?.replace(/(\d{3})(\d)/, "$1.$2");
        maskCPF = maskCPF?.replace(/(\d{3})(\d{1,6})$/, "$1/$2");
        maskCPF = maskCPF?.replace(/(\d{4})(\d{1,2})$/, "$1-$2");

        if (maskCPF.length > 14) maskCPF = maskCPF.slice(0, 18); /* Aceita apenas 14 números */
        return maskCPF;
    },

    soNumeros(value: string) {
        return value.replace(/\D/g, "");
    }
}