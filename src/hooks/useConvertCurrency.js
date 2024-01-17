export function useConvertCurrency(number) {
    if (!number) return;

    const convert = number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return convert;
}