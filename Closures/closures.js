function createCalcFunction(n) {
  return function () {
    console.log(1000 * n)
  }
}
createCalcFunction(42)
//=====================================
function createIncrement(n) {
  return function (num) {
    return n + num
  }
}

const addOne = createIncrement(1)
console.log(addOne(11))

const addTen = createIncrement(10)
console.log(addTen(32))

//=====================================
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

//===============================================Bind

function bind(context, fn) {
  return function (...args) {
    //хотя в args мы не передаем дланные
    fn.apply(context, args)
  }
}
function logPerson() {
  console.log(`Person : ${this.name} , ${this.age} , ${this.job}`)
}
const person1 = { name: "Misha", age: 22, job: "fronEnd" }

bind(person1, logPerson)()
//bind(person1, logPerson)(args хранится тут)
