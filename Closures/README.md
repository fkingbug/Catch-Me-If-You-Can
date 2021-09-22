замыкания - функция внутри другйо функции

```javascript
function createCalcFunction(n) {
  return function () {
    console.log(1000 * n)
  }
}
createCalcFunction(42)
```

## мы не получим результата так функция возвращает функцию\_

```javascript
function createCalcFunction(n) {
  return function () {
    console.log(1000 * n)
  }
}
const calc = createCalcFunction(42)
calc()
```

- calc - это функция котоорую мы получаем из функции createCalcFunction (возврщает функцию)
- createCalcFunction(42) отработала и вернула новую функцию (return func()) которая была вызвана в контексте createCalcFunction
- то передаенное значение 42 (createCalcFunction(42)) замкнулось в той функции в которую возврщаем передаем доступ до скоупа верхней функции
- calc вызывается с значением n которое было передано при инициализации (42) число замкнулось
- calc() 42000 так как мы передали функцию createCalcFunction с параметром 42

---

**Примеры**

Замыкание + 1

```javascript
function createIncrement(n) {
  return function (num) {
    return n + num
  }
}
const addOne = createIncrement(1)
const addTen = createIncrement(10)
console.log(addOne(11))
```

- addOne хранит в себе return function (num) и имеет доступ к скоупу верхней функции (значение n)
- addOne - функция которая принимает в себя параметр num - то необходимо задать его перед вызовом
- замыкаем функцию которая может работать с другими параметрами

---

**urlGenerator**

```javascript
function urlGenerator(domain) {
  return function (url) {
    return `https://${url}.${domain}`
  }
}
const comUrl = urlGenerator("com")
console.log(comUrl("google"))
console.log(comUrl("netflix"))
//https://google.com
//https://netflix.com

const ruUrl = urlGenerator("ru")
console.log(ruUrl("yandex"))
console.log(ruUrl("vk"))
// https://yandex.ru
// https://vk.ru
```

Замыкаем domain(com) в comUrl при вызове функции comUrl нужно указать url , а домен сам подтянется

---

**bind**

```javascript
function bind(context, fn) {
  return function (...args) {
    fn.apply(context, args)
  }
}
function logPerson() {
  console.log(`Person : ${this.name} , ${this.age} , ${this.job}`)
}
const person1 = { name: "Misha", age: 22, job: "fronEnd" }

bind(person1, logPerson)()
```

- bind(person1, logPerson)(args хранится тут)
- для удобства используем apply так он принимает массив args
