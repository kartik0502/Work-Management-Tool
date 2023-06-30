const { apiRequest } = require("./index");

export const createProject = async (project) => {
    return apiRequest("api/projects/create-project", "POST", project);
}

export const fetchProjects = async () => {
    return apiRequest("api/projects/get-projects", "GET");
}