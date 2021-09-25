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
    console.log(key)
  }
}
