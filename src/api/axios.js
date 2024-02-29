import axios from 'axios'

export default axios.create({
  baseURL: 'https://172.43.44.51/api/3.4',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})
