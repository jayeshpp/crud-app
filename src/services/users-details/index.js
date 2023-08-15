import axioInstance from '../axiosInstance'
import { convertToFirebasePayload, performRequest } from '../helpers'

export const services = {
    getUserDetails: async () => {
        return performRequest(axioInstance.get, '/users')
    },
    getUserDetailsById: async (id) => {
        return performRequest(axioInstance.get, `/users/${id}`)
    },
    addUser: async (payload) => {
        const data = convertToFirebasePayload(payload)
        return performRequest(axioInstance.post, '/users', data);
    },
    deleteUser: async (id) => {
        return performRequest(axioInstance.delete, `/users/${id}`);
    },
    updateUser: async (payload, id) => {
        const data = convertToFirebasePayload(payload)
        return performRequest(axioInstance.patch, `/users/${id}`, data);
    }
}
