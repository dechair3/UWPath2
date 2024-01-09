import axios from 'axios'
const programUrl = '/program/'
const getAllPrograms = async () => {
    const url = programUrl + 'all'
    const resp = await axios.get(url)
    return resp.data
}

const getOneProgram = async (heading) => {
    const url = programUrl + "heading/" + heading
    const resp = await axios.get(url)
    return resp.data
}
export default {
    getAllPrograms : getAllPrograms,
    getOneProgram : getOneProgram
}