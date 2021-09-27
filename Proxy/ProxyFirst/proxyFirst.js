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
  set(target, prop, value) {
    if (prop in target) {
      target[prop] = value
    } else {
      throw new Error(`No ${prop} field in target`)
    }
  },
  has(target, prop) {
    return ["age", "name", "job"].includes(prop)
  },
  deleteProperty(target, prop) {
    console.log("Deleting...", prop)
    delete target[prop]
    return true
  },
})
