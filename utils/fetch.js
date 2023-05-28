import axios from "axios"

const getFetch = async (url, params = {}) => {
  return await axios({
    url,
    method: "GET",
    params,
  })
    .then(
      (response) => response.data
      // return {
      //   status: response.status,
      //   data: response.data,
      // }
    )
    .catch(
      (error) => error.response.data
      // return {
      //   status: error.response.status,
      //   data: error.response.data.err.body,
      // }
    )
}
const getPost = async (url, body = {}) => {
  return await axios({
    url,
    method: "POST",
    data: body,
  })
    .then((response) => response.data)
    .catch((error) => error.response.data)
}

export { getFetch, getPost }
