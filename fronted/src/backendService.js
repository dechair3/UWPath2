import ky from 'ky'
const programUrl = '/program/'
const getAllPrograms = async () => {
    const url = programUrl + 'all'
    const resp = await ky.get(url).json()
    return resp
}

const getOneProgram = async (heading) => {
    const url = programUrl + "heading/" + heading
    const resp = await ky.get(url).json()
    return resp
}
export default {
    getAllPrograms : getAllPrograms,
    getOneProgram : getOneProgram
}