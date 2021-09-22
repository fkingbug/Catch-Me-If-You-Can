function hello() {
  console.log("Hello", this)
}
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
person.logInfo.call(lena, "FrontEnd", "8-999-999-99-99")
person.logInfo.apply(lena, ["FrontEnd", "8-999-123-12-23"])

const array = [1, 2, 3, 4, 5]

function multBy(arr, n) {
  return arr.map(function (i) {
    return i * n
  })
}
console.log(multBy(array, 5))

Array.prototype.multByS = function (n) {
  return this.map(function (i) {
    return i * n
  })
}
console.log(array.multByS(15))
