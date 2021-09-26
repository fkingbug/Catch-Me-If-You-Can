Классы

Создание обычного объекта :

```javascript
const animal = {
  name: "Animal",
  age: 5,
  hasTail: true,
}
```

---

Создание объекта через класс :

```javascript
class Animal {
  constructor(options) {
    this.name = options.name
    this.age = options.age
    this.hasTail = options.hasTail
  }
  voice() {
    console.log(`i am ${this.name}!`)
  }
}

const animal = new Animal({
  name: "Dog",
  age: 5,
  hasTail: true,
})
```

- Создаем класс Animal (все классы называются с большой буквы)
- Необходим метод констуктор который будет принмать в себя параметры (options) изи инициализации объекта от класса Animal
- Если сделать объектчерез класс то он будет наследоваться от класса (класс будет являться для него прототипом)
- у такого объекта будет 2 прототипапа constructor(class Animal) и **proto**
- поскольку наш объект наследуется от Animal (является прототипом) мы можем создать новые методы внутри класса которые будут наследовать объекты созданные от класса Animal
- метод voice - при вызове пишет в консоль "i am (Имя из констекста которого мы вызываем)" animal.voice() для вызова

---

Статическе методы и поля

```javascript
class Animal {
  static type = "Animal"
}
```

- Если переменная или метод является статической то она доступна у самого класса (Animal.type) , а не у созданного объекта (animal.type - undefined)

---

наследование

```javascript
class Animal {
  static type = "Animal"

  constructor(options) {
    this.name = options.name
    this.age = options.age
    this.hasTail = options.hasTail
  }
  voice() {
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
}

const cat = new Cat({
  name: "Cat",
  age: 7,
  hasTail: true,
})
```

- Клас Cat наследуется от класса Animal (Принимая все его поля и методы (даже static))
- Объект cat создается как экзмпляр объекта Cat
- Объект cat в первую очередь прототипируется от class Cat => далее class Animal => ObjectО
- Если и класса Animal и Cat будет поле static type - то вызовется то в контексте какого класса было создан объект

---

Добавления полей в класс который наслдеуется от другого объекта и не имеет этих полей

```javascript
class Animal {
  static type = "Animal"

  constructor(options) {
    this.name = options.name
    this.age = options.age
    this.hasTail = options.hasTail
  }
  voice() {
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
  voice() {
    super.voice()
    console.log(`i am CAT !`)
  }
}

const cat = new Cat({
  name: "Cat",
  age: 7,
  hasTail: true,
  color: "Black",
})
```

- Класс Cat наследуется от класса Animal (class Cat extends Animal )
- Вызываем constructor
- метод super нужен дял того чтобы передать полученный options в класс от которого наследуется (в его констурктор без поля color)
- this.color = options.color создание нового поля и присваивание ему значения
- Так же в дочерних классах (Cat) мы можем переписывать методы родительских (Animal) , создав ее заново
- Если в методе voice вызвать super с методом voice (super.voice()) , то сначало вызловется voice у родителя(Animal) , дальше у Cat

---

get / set

```javascript
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
```

- get ageInfo() - геттер который отображается как поле (не метод) и при его вызове (cat.ageInfo) выдаст 49(7\*7)
- set ageInfo(newAge) - сеттер который меныет значение age у объекта при вызове (cat.ageInfo = 8)

---

Примеры !

```javascript
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
```

- Класс Component - Который хранит в себе селектор (делаем див с именем класса и имя класса передаем сюда)
- $el - переменные которые хранят в себе ноду начинаются с $
- метод hide и show для скрытия нашей ноды(div) box1.hide()
- Класс Box наследуется от класса Component и принимает в себя параметры ширины и цвета дива
- Так как в классе Component конструктор принмает только селектор поэтому передаем в него только селектор ( uper(options.selector))
- box1 и box2 - 2 объекта (2 дива с индексами (box1 и box2 )) с стилями переданными в конструктора
- Класс Circle наследуется от Box отправляет полученный options в конструктор класса Box и задает закрглуение
