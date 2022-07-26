
export function formatNumber(number) {  //Da formato de pesos a los numeros
    return new Intl.NumberFormat("es-AR", {
        style: "decimal"
    }).format(number)
};