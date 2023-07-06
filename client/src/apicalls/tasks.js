const { apiRequest } = require("./index");

export const createTask = async (task) => {
    return apiRequest("/api/tasks/create-task", "POST", task);
}

export const fetchTasks = async (filters) => {
    return apiRequest("/api/tasks/get-tasks", "POST", filters);
}

export const updateTask = async (task) => {
    return apiRequest("/api/tasks/update-task", "POST", task);
}

export const deleteTasks = async (taskId) => {
    return apiRequest("/api/tasks/delete-task", "POST", { taskId });
}