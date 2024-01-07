export function capitalize(word) {
    return word.toLowerCase()[0].toUpperCase() + word.toLowerCase().slice(1)
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString()
}