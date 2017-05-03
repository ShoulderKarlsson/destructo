# destructo

    npm install destructo

## Usage
```javascript

const destructo = require('destructo')

const target = {
    username: 'someUsername',
    deep: {
        someData: 'someAmazingData',
        deeper: {
            moreData: 'evenDeeperData'
        }
    }
}
const result = destructo(target, 'username', 'deep.someData', 'deep.deeper.moreData')

 // { username: 'someUsername', someData: 'someAmazingData', moreData: 'evenDeeperData' }
console.log(result)
```