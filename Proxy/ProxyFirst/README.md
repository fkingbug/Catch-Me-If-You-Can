Proxy - это класс которы помогает создавать различный ловушки для объектов , функций классов

# Object :

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
})
```

- в op хранится результат выполнения оператор new и класса Proxy
- В конструктор Proxy приходит 2 параметра :
  - таргет - та цель на кого хотим повесить proxy
  - набор хендлеров которые помогают сделать "ловушки" для объекта
- get :
  - Принимает в себя 2 параметра target и проп
