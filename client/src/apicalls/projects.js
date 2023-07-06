const { apiRequest } = require("./index");

export const createProject = async (project) => {
    return apiRequest("api/projects/create-project", "POST", project);
}

export const fetchProjects = async (filters) => {
    console.log(filters);
    return apiRequest("api/projects/get-projects", "POST", filters);
}

export const editProject = async (project) => {
    return apiRequest("api/projects/edit-project", "POST", project);
}

export const deleteProject = async (projectId) => {
    return apiRequest("api/projects/delete-project", "POST", { projectId });
}

export const getProjectByRole = async (userId) => {
    return apiRequest("api/projects/get-project-by-role", "POST", { userId });
}

export const getProjectById = async (id) => {
    return apiRequest("/api/projects/get-project-by-id", "POST", { id });
};

export const addMember = async (data) => {
    return apiRequest("/api/projects/add-member", "POST", data);
}

export const removeMember = async (data) => {
    return apiRequest("/api/projects/remove-member", "POST", data);
}
