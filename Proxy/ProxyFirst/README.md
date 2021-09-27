Proxy - это класс которы помогает создавать различный ловушки для объектов , функций классов

**Object :**

Проксирвоание ? :

```javascript
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
```

- в op хранится результат выполнения оператор new и класса Proxy
- В конструктор Proxy приходит 2 параметра :
  - target - та цель на кого хотим повесить proxy
  - набор хендлеров которые помогают сделать "ловушки" для объекта
- get :
  - Принимает в себя 2 параметра target и prop (op.name)
  - target - это объект который был передан в Proxy
  - prop - имя поял объекта который был передан в Proxy
  - Хендлер get при вызове поля объекта (op.name) выведет на экран :
    - "target" и переданынй объект
    - "prop" и вызванное поле (name)
    - и значение хранящиеся в op.name
- set :
  - Принимает в себя 3 параметра target , prop и value (op.age = 15)
    - target - это объект который был передан в Proxy
    - prop - имя поял объекта который был передан в Proxy
    - value -значение которое хотим добавить
  - Prop in target - есть ли указанное поле в объекте :
    - true - измени значение
    - false - выдай ошибку
- has :
  - Принимает в себя 2 параметра target и prop ('job' in op)
  - Говорит есть ли поле в объекте (true / false)
- deleteProperty :
  - Принимает в себя 2 параметра target и prop (delete op.age)
  - Удаляет поле из op и person
  - return true - чтобы после удаления в консоле false не писался (выведется true c:)
