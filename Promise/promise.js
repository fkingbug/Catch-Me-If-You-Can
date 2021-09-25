console.log("Request data...")

const p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log("Preparin data...")
    const backetndData = {
      server: "aws",
      port: 2000,
      status: "working",
    }
    resolve(backetndData)
  }, 2000)
})

p.then((data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      data.modified = true
      resolve(data)
    }, 2000)
  })
})
  .catch((err) => console.error("Error", err))
  .then((clientData) => {
    clientData.fromPromise = true
    return clientData
  })
  .then((data) => console.log("modified", data))
  .finaly(() => console.log("finaly"))

const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))

sleep(2000).then(() => console.log("after 2 sec"))
sleep(3000).then(() => console.log("after 3 sec"))

Promise.all([sleep(2000), sleep(3000)]).then(() => console.log("All promises"))
Promise.race([sleep(2000), sleep(3000)]).then(() => console.log("Race promises"))
