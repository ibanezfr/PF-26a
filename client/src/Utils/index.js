
export function formatNumber(number) {
    return new Intl.NumberFormat("es-AR", {
        style: "decimal"
    }).format(number)
};