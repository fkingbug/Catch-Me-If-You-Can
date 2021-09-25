**Промисы**

**Promise** - глобальный класс в констуктор которого необходимо передать колбек
Promise принимает в себя 2 параметра resolve и reject

---

(без промисов) Имитация запроса на сервер .........

```javascript
console.log("Request data...")

setTimeout(() => {
  console.log("Preparing data...")

  const backendData = {
    server: "aws",
    port: 2000,
    status: "working",
  }

  setTimeout(() => {
    backendData.modified = true
    console.log("Data received", backendData)
  })
}, 2000)
```

- console.log("Request data...") - первая операция в коде
- console.log("Preparing data...") - вторая операция в коде
- "Получение объекта с Api"
- Второй setTimeout для добавления данных в объект и вывода на его экран ("Data received", backendData)

---

**new Promise**

```javascript
const p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log("Preparing data...")

    const backendData = {
      server: "aws",
      port: 2000,
      status: "working",
    }
    resolve(backetndData)
  }, 2000)
})

p.then((data) => {
  console.log("Promise resolved", data)
})
```

- Создаем новый промис и передем в него асинхронный код (setTimeout())
- resolve вызывается когда асинхронная операция выполнена успешно
- p.then() - будет вызван если закончится асинхронная операция => resolve()
- then говорит что будет происходить если промис будет выполнен
- resolve(backetndData) переданные аргументы в функцию resolve будут доступны в методе then((data) =>)

---

Пример с вложенностью

```javascript
console.log("Request data...")

const p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log("Preparin data...")
    const backetndData = {
      server: "aws",
      port: 2000,
      status: "working",
    }
    resolve(backetndData)
  }, 2000)
})

p.then((data) => {
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      data.modified = true
      resolve(data)
    }, 2000)
  })
  p2.then((clientData) => {
    console.log("Data received", clientData)
  })
})
```

## P2 - создаем новый промис дял выполнения вторйо асинхронной операции

Запись без вложенности
chainИТЬ - действия через точку (p.then().then())

```javascript
console.log("Request data...")

const p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log("Preparin data...")
    const backetndData = {
      server: "aws",
      port: 2000,
      status: "working",
    }
    resolve(backetndData)
  }, 2000)
})

p.then((data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      data.modified = true
      resolve(data)
    }, 2000)
  })
}).then((clientData) => {
  console.log("Data received", clientData)
})
```

- Не создается новый промис , а возвращается , поэтому мы можем просто вызвать then через точку
- Вызываем then после первого then p.then().then()

---

В then можно передавать не только промисы но и обычные данные и послежовательно их модифицировать , с помощью return ,а не reject , как с промисом

```javascript
console.log("Request data...")

const p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log("Preparin data...")
    const backetndData = {
      server: "aws",
      port: 2000,
      status: "working",
    }
    resolve(backetndData)
  }, 2000)
})

p.then((data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      data.modified = true
      resolve(data)
    }, 2000)
  })
})
  .then((clientData) => {
    clientData.fromPromise = true
    return clientData
  })
  .then((data) => console.log("modified", data))
```

---

**обработка ошибок**
Если использовать обычные CallBack то нужно писать очень много if(для статуса сервера и тд)
В промисе существует метож Cath - который отрабатывает если произошла ошибка.
resolve подразумивает метод then , то reject подразумивает метод cath
(так как у нас тайм ауты , а не ответы от сервера то передаем в reject наш объект )

```javascript
console.log("Request data...")

const p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log("Preparin data...")
    const backetndData = {
      server: "aws",
      port: 2000,
      status: "working",
    }
    resolve(backetndData)
  }, 2000)
})

p.then((data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      data.modified = true
      reject(data)
    }, 2000)
  })
})
  .then((clientData) => {
    clientData.fromPromise = true
    return clientData
  })
  .then((data) => console.log("modified", data))
  .catch((err) => console.error("Error", err))
```

---

Метод finaly - будет вызван в любом случае (ошибка или нет )

```javascript
console.log("Request data...")

const p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log("Preparin data...")
    const backetndData = {
      server: "aws",
      port: 2000,
      status: "working",
    }
    resolve(backetndData)
  }, 2000)
})

p.then((data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      data.modified = true
      resolve(data)
    }, 2000)
  })
})
  .catch((err) => console.error("Error", err))
  .then((clientData) => {
    clientData.fromPromise = true
    return clientData
  })
  .then((data) => console.log("modified", data))
  .finaly(() => console.log("finaly"))
```

---

```javascript
const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))
sleep(2000).then(() => console.log("after 2 sec"))
sleep(3000).then(() => console.log("after 3 sec"))
```

функция sleep которая возвращает новый промис

- вызываем с значением милисек для таймаута
- указываем метод then с колбеком
- такая запись более удобная

---

Promise.all

```javascript
Promise.all([sleep(2000), sleep(3000)]).then(() => console.log("All promises"))
```

- Promise.all - возврщает промис
- Promise.all - принимаем в себя массив промисов
- Promise.all - выполнится когда (then) завершатся все промисы в массиве

---

Promise.race

```javascript
Promise.race([sleep(2000), sleep(3000)]).then(() => console.log("Race promises"))
```

- Promise.race - возврщает промис
- Promise.race - принимаем в себя массив промисов
- Promise.race - выполнится когда (then) завершится самый быстрый промис
