const destructo = require('../destructo')

const target = {
  username: 'Tengil',
  password: 'Trump'
}


console.log(
  destructo(target, 'username', 'password:pw')
)