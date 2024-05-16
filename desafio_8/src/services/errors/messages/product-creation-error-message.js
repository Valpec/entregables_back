
export const generateProdErrorInfo = (prod) => {
    return `Una o más propiedades fueron enviadas incompletas o no son válidas.
    Lista de propiedades requeridas:
        -> title: type String, recibido: ${prod.title}
        -> description: type String, recibido: ${prod.description}
        -> code: type String, recibido: ${prod.code}
        -> price: type Number, recibido: ${prod.price}
        -> status: type Boolean, recibido: ${prod.status}
        -> stock: type Number, recibido: ${prod.stock}
        -> category: type String, recibido: ${prod.category}
        -> thumbnail: type String, recibido: ${prod.thumbnail}
`;
}
