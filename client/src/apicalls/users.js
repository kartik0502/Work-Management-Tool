const { apiRequest } = require("./index");

export const registerUser = async (user) => {
    return apiRequest("api/users/register", "POST", user);
};

export const loginUser = async (user) => {
    return apiRequest("api/users/login", "POST", user);
}
