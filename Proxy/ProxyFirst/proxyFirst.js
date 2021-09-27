const person = {
  name: "Vladilen",
  age: 25,
  job: "FullStack",
}

const op = new Proxy(person, {
  get(target, prop) {
    console.log("target", target)
    console.log("prop", prop)
    return target[prop]
  },
})
