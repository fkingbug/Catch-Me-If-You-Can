const person = new Object({
  name: "Maxim",
  age: 25,
  greet: function () {
    console.log("Greet!")
  },
})

Object.prototype.sayHello = function () {
  console.log("Hello")
}
person.sayHello()

const newObject = Object.create(person)

newObject.name = "Dima"
