const d = require('./destructo')

const target = {
  username: 'Samuel',
  deep: {
    password: '123admin',
    deeper: {
      number: 123
    }
  }
}
const getItems = d('username', 'deep.deeper.number:sequence')

const items = getItems(target)

console.log(items)
