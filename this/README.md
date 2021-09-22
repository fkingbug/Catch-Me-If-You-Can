this указываеет на объект в контексте которого был вызван obj.hello() this выведет все поля объекта obj (так как указали просто this)

```javascript
function hello() {
  console.log("Hello", this) // в Данном случае в this хранится глобальный объект window
}
const person = {
  name: "Vladilen",
  age: 25,
  sayHello: hello,
  sayHelloWindow: hello.bind(window), //hello.bind(this) одно и тоже
}
```

- Переделаи в объект person ссылку на объект hello
- если вызвать person.seyHello то функция hello подставит вместо this - объект person
- встроенный метод bind(контекст)

---

```javascript
function hello() {
  console.log("Hello", this) // в Данном случае в this хранится глобальный объект window
}
const person = {
  name: "Vladilen",
  age: 25,
  sayHello: hello, // в this находит объект person
  sayHelloWindow: hello.bind(window),
  logInfo: function () {
    console.log(`Name is ${this.name}`) //Name is Vladilen
    console.log(`Age is ${this.age}`) //Age is 25
  },
}
```

- this.name тоже самое что и person.name только более универсально чтобы мы могли с помощью функций менять контекст

---

```javascript
const lena = {
  name: "Elena",
  age: 23,
}
person.logInfo()
preson.logInfo.bind(lena)()
```

- person.logInfo() - вызывает функцию logInfo с контекстом объекта person
- bind возвращает новую функцию , а не вызывает ее - preson.logInfo.bind(lena)
- preson.logInfo.bind(lena)() - вызов функции logInfo объекта person с контекстом lena

---

Домолнительные параметры

```javascript
const person = {
  name: "Vladilen",
  age: 25,
  seyHello: hello,

  logInfo: function (job, phone) {
    console.group(`${this.name} info :`)
    console.log(`Name is ${this.name}`)
    console.log(`Age is ${this.age}`)
    console.log(`Job is ${job}`)
    console.log(`age is ${phone}`)
    console.groupEnd()
  },
}
person.logInfo.bind(lena, "FrontEnd", "8-999-999-99-99")()
```

в bind можно помимо контекста можно передать параметры :

- job - "FrontEnd"
- phone - "8-999-999-99-99"

_при обращении к ним this не нужен так они взяты не из контекста , просто переданы в функцию_

---

**call**
Так же как и в bind передает контекст , но call сразу вызывает функцию

```javascript
const person = {
  name: "Vladilen",
  age: 25,
  seyHello: hello,

  logInfo: function (job, phone) {
    console.group(`${this.name} info :`)
    console.log(`Name is ${this.name}`)
    console.log(`Age is ${this.age}`)
    console.log(`Job is ${job}`)
    console.log(`age is ${phone}`)
    console.groupEnd()
  },
}
person.logInfo.call(lena, "FrontEnd", "8-999-999-99-99")
```

---

**aplly**
Так же как и call вызывает функцию , но все аргнументы функции передаем в массиве

```javascript
const person = {
  name: "Vladilen",
  age: 25,
  seyHello: hello,

  logInfo: function (job, phone) {
    console.group(`${this.name} info :`)
    console.log(`Name is ${this.name}`)
    console.log(`Age is ${this.age}`)
    console.log(`Job is ${job}`)
    console.log(`age is ${phone}`)
    console.groupEnd()
  },
}
person.logInfo.apply(lena, ["FrontEnd", "8-999-123-12-23"])
```

---

**Пример использования**

Создание функции умножающая каждый элемент массива на n

```javascript
const array = [1, 2, 3, 4, 5]
function multBy(arr, n) {
  return arr.map(function (i) {
    return i * n
  })
}
console.log(multBy(array, 5)) // [1, 2, 3, 4, 5] =>  [ 5, 10, 15, 20, 25 ]
```

## Довольно большая и сложная запись + необходимо импортировать фунцию , самый простой вариант сделать prototype

Prototype :

```javascript
const array = [1, 2, 3, 4, 5]
Array.prototype.multByS = function (n) {
  return this.map(function (i) {
    return i * n
  })
}
console.log(array.multByS(15))
```

- Array - глобальный объект к которым относятся массивы
- Array.prototype.multByS - создание функции(прототипа с именем multByS)
- this является массивом у которого выполняется этот метод
- console.log("multBy", this) //array.multByS() - this принимает значение массива array
