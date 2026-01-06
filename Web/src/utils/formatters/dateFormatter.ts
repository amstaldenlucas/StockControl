
// Usa a região do navegador automaticamente
export const formatDate = (date: string | Date): string =>
    internalFormatDate(date)

// opção mais flexível, recebendo locale
export const formatDateWithLocale = (date: string | Date, locale?: string): string =>
    internalFormatDate(date, locale);


const internalFormatDate = (date: string | Date, locale?: string): string => {
    const validDate = date instanceof Date ? date : new Date(date);
    if (isNaN(validDate.getTime()))
        return "";
    
    return new Intl.DateTimeFormat(locale || undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
    .format(validDate)
}