import axios from 'axios'

// TODO: replace with actual endpoint.
export const api = axios.create({
    baseURL:"http://localhost:5000/"
})

