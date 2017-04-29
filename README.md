# destruct

## Usage
```javascript

const destruct = require('destruct')

const target = {
    username: 'someUsername',
    deep: {
        someData: 'someAmazingData',
        deeper: {
            moreData: 'evenDeeperData'
        }
    }
}
const result = destruct(target, 'username', 'deep.someData', 'deep.deeper.moreData')

 // { username: 'someUsername', someData: 'someAmazingData', moreData: 'evenDeeperData' }
console.log(result)
```