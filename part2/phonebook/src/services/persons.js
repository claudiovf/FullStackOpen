import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(res => res.data)
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res => res.data)
}

const update = (id, updatedCon) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedCon)
    return request.then(res => res.data)
}

export default { getAll, create, deletePerson, update }
