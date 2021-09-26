**Гибка настройка объектов в JS**

создание объекта через Object.create

```javascript
const person = Object.create({}, {})
```

---

Проперти Дескрипторы :

- enumerable: true, Дает разрешение на итерацию по этому ключу объекта
- writable: true, Дает разрешение на изменение этого поля в объекте
- configurable: true, Дает разрешение удалять это поле в объекте
- Все значения по дефолту false

```javascript
const person = Object.create(
  {
    calculateAge() {
      console.log(new Date().getFullYear() - this.birthyear)
    },
  },
  {
    name: {
      value: "vladilen",
      enumerable: true,
      writable: true,
      configurable: true,
    },
    birthyear: {
      value: 1993,
      enumerable: false,
      writable: false,
      configurable: false,
    },
  }
)
for (const key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key)
  }
}
```

- Первый объект это прототипы , В нашем случае мы указали просто функцию
- Второй объект хранит в себя наши поля
- пишем название поля (name) , передаем туда объект с полем value где и будет хранится значения нашего ключа
- **НО** Поля не активные , мы не можем пробежаться по ним циклом forIn , но можем обратьтся (person.name)
- что мы могли итерировать объект(ключи объекта) через массив , то в нужно добавить поле enumerable: true, так как изначально он false
- writable: true , разрешает изменять объект (person.name = 'Dima')
- configurable: true,- разрешает удалить поле объекта

---

**Геттеры и Сеттеры**

```javascript
const person = Object.create(
  {
    calculateAge() {
      console.log(new Date().getFullYear() - this.birthyear)
    },
  },
  {
    name: {
      value: "vladilen",
      enumerable: true,
      writable: true,
      configurable: true,
    },
    birthyear: {
      value: 1993,
      enumerable: false,
      writable: false,
      configurable: false,
    },
    age: {
      get() {
        return new Date().getFullYear() - this.birthyear
      },
      set(value) {
        document.body.style.background = "red"
        console.log("set Age", value)
      },
    },
  }
)
for (const key in person) {
  if (person.hasOwnProperty(key)) {
    // Указывать так forIn пробигается по прототипам тоже
    console.log(key)
  }
}
```

**Метод get - отрабатывает при вызове поля (person.age) , метод set отрабатывает при изменение поля (person.age = 123213)**

- Многие фреймворки построенны на get и set для мониторинга изменение объекта
- Метод get возвращает значенеи функции при обращению к родительскому полю (person.age)
- Метод set принимает значение , при изменения родительского поля (person.age = 123213) => value = 123213
- При задействовании метода сет можно выполнять какую либо логику к примеру , из менение background на странице
