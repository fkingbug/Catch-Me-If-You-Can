class Animal {
  static type = "Animal"

  constructor(options) {
    this.name = options.name
    this.age = options.age
    this.hasTail = options.hasTail
  }
  voice() {
    super.voice()
    console.log(`i am ${this.name}!`)
  }
}

const animal = new Animal({
  name: "Dog",
  age: 5,
  hasTail: true,
})

class Cat extends Animal {
  static type = "CAT"

  constructor(options) {
    super(options)
    this.color = options.color
  }
  get ageInfo() {
    return this.age * 7
  }
  set ageInfo(newAge) {
    this.age = newAge
  }
}

const cat = new Cat({
  name: "Cat",
  age: 7,
  hasTail: true,
  color: "Black",
})

class Component {
  constructor(selector) {
    this.$el = document.querySelector(selector)
  }
  hide() {
    this.$el.style.display = "none"
  }
  show() {
    this.$el.style.display = "block"
  }
}
class Box extends Component {
  constructor(options) {
    super(options.selector)

    this.$el.style.width = this.$el.style.heigth = options.size + "px"
    this.$el.style.background = options.color
  }
}
const box1 = new Box({
  selector: "#box1",
  size: 100,
  color: "red",
})
const box2 = new Box({
  selector: "#box1",
  size: 100,
  color: "red",
})

class Circle extends Box {
  constructor(options) {
    super(options)

    this.$el.style.borderRadius = "50%"
  }
}

const c = new Circle({
  selector: "#circle",
  size: 90,
  color: "green",
})
