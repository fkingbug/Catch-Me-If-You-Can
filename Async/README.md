Async

Функция создающаая задержку которая возвращает промис

```javascript
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(() => resolve(), ms))
}
delay(2000).then(() => console.log("2 sec"))
```

- функция дилей которая принмает в себя колличество мс и возврщает промис
- delay(2000) - then отработает через 2 секунты и выведет в консоль "2sec"

---

**Fetch**

```javascript
const url = "https://jsonplaceholder.typicode.com/todos/1"

function fetchTodos() {
  return delay(2000)
    .then(() => fetch(url))
    .then((response) => response.json)
}
fetchTodos()
  .then((data) => console.log(data))
  .catch((e) => console.error(e))
```

- delay(2000) когда данная задержка будет выполнена то отработает then (для fetch запроса)
- fetch - нативная функция браузера для запроса насервер и возвращает промис
- responce.json() - для преобразования строки в obj
- fetchTodos() вызываем функцию , получаем промис и с помощью then выводим в консоль
- cath - для обработки ошибок

---

**Async**

```javascript
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
```

- нужно сделать функцию асинхронной , для этого нужно до ее инициализации прописать async
- await - дожидается выполнения промиса и переходит к другой строчке кода
- fetch возвращает промис и мы оборачиваем его в await и помещаем полученынй промис в response (мы синхронно получаем даннные)
- далее мы преобразовываем response в вид объекта в переменной data
- try cath для поиска ошибок

Как рабоатет async :

- babel пробегаясь по коду видит оператор async и оборачивают все в промисы
