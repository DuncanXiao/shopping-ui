import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.BASE_URL}/api/`,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

instance.interceptors.request.use((request) => {
  return request
}, (err) => {
  return Promise.reject(err)
});

instance.interceptors.response.use((response) => {
  return response
}, (err) => {
  return Promise.reject(err)
})

export default instance