export const formatNumber = (value?: number, options?: Intl.NumberFormatOptions) => {
    if (value === null || value === undefined)
        return "";

    return new Intl.NumberFormat("pt-BR", options).format(value);
}