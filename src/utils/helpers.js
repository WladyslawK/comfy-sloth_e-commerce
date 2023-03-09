export const formatPrice = (number) => {
    const newNumber = new Intl.NumberFormat('pl', {
        style: 'currency',
        currency: 'PLN',
    }).format(number/100)
    return newNumber
}

export const getUniqueValues = () => {}
