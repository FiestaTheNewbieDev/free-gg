import axios from 'axios'

export const freetogame = axios.create({
  baseURL: 'https://www.freetogame.com/api',
  headers: {
    Accept: 'application/json'
  }
})
