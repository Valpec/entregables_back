export const generateSessionErrorInfo = (user) => {
    return `Una o más propiedades fueron enviadas incompletas o no son válidas.
    Lista de propiedades requeridas:
        -> email: type String, recibido: ${user.email}
        -> password: type String, recibido: ${user.password}
`;
}
