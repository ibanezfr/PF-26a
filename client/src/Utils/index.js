
export function formatNumber(number) {
    return new Intl.NumberFormat("es-AR", {
        style: "decimal"
    }).format(number)
};

export function filterProducts(state, auxs) {
    let res = state.filter(product => {
        let productCategories = product.categories.map(cat => cat.name)
        return auxs.reduce((prevFilter, nextFilter) => {
            return prevFilter && productCategories.includes(nextFilter);
        }, true);
    });
    return res;
};