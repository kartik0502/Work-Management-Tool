const { apiRequest } = require("./index");

export const createTask = async (task) => {
    return apiRequest("/api/tasks/create-task", "POST", task);
}

export const fetchTasks = async (filters) => {
    return apiRequest("/api/tasks/get-tasks", "POST", filters);
}