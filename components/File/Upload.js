import FormData from "form-data";
import axios from "axios";


export default async function handler(file) {
    if (!file) return null
    const formData = new FormData()
    formData.append('file', file)
    const fileUpload = await axios.post(`/api/File/Upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return fileUpload.data.data._id
}