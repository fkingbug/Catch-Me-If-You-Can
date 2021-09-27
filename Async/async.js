const delay = (ms) => {
  return new Promise((resolve) => setTimeout(() => resolve(), ms))
}
delay(2000).then(() => console.log("2 sec"))

const url = "https://jsonplaceholder.typicode.com/todos/1"

// function fetchTodos() {
//   return delay(2000)
//     .then(() => fetch(url))
//     .then((response) => response.json)
// }
// fetchTodos()
//   .then((data) => console.log(data))
//   .catch((e) => console.error(e))

async function fetchAsyncTodos() {
  try {
    await delay(2000)
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  } finally {
    console.log("finally")
  }
}
fetchAsyncTodos()
