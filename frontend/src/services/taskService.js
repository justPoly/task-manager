import api from "./api";

const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getTasks = async () => {
    const response = await api.get(
        "/tasks",
        getAuthHeaders()
    );

    return response.data;
};

export const createTask = async (task) => {
    const response = await api.post(
        "/tasks",
        task,
        getAuthHeaders()
    );

    return response.data;
};

export const updateTask = async (id, task) => {
    const response = await api.put(
        `/tasks/${id}`,
        task,
        getAuthHeaders()
    );

    return response.data;
};

export const deleteTask = async (id) => {
    const response = await api.delete(
        `/tasks/${id}`,
        getAuthHeaders()
    );

    return response.data;
};