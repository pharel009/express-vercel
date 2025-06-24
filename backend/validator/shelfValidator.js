import validator from 'validator';


export const shelfValidator = (reqBody = {}) => {
    const { name } = reqBody;

    if (!name || validator.isEmpty(name)) {
        return { message: 'Shelf name is required', statusCode: 400 }
    }

    return null;
};