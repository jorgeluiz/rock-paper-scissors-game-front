import { get, post, put, destroy } from "Utils/api";

//Define a rota base desse serviço
const baseRoute = "games";


export const findAll = async () => {
    return await get(baseRoute);
};

export const findById = async (id) => {
    return await get(baseRoute, "/" + id);
};

export const add = async (postData) => {
    var data = JSON.stringify(postData);
    return await post(baseRoute, "", data);
};

export const update = async (id, postData) => {
    var data = JSON.stringify(postData);
    return await put(baseRoute, "", id, data);
};

export const remove = async (id) => {
    return await destroy(baseRoute, "", id);
};

const gamesService = {
    findAll,
    findById,
    add,
    update,
    remove,
}

export default gamesService;