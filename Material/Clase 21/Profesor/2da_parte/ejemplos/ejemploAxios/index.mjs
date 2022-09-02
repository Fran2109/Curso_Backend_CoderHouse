import axios from 'axios'

// try {
//   const { data: data1 } = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
//   console.log(data1)
// } catch (error) {
//   console.log(error.message)
// }

// try {
//   const { data: data2 } = await axios.post('https://jsonplaceholder.typicode.com/posts', { nombre: 'pepe' })
//   console.log(data2)
// } catch (error) {
//   console.log(error.message)
// }

try {
  const { data: data3 } = await axios.get('http://localhost:8080/api/noticias/5d6e8f4d-7f56-498a-ac4a-5cd4a2a9ada7')
  console.log(data3)
} catch (error) {
  console.log(error.response.status)
  console.log(error.message)
}