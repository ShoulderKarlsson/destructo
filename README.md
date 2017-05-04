## destructo
---

    npm install destructo

### Basic usage
```javascript
const destructo = require('destructo')

const target = {
    username: 'JohnDoe',
    password: 'secret',
    id: 100
}
const personDetails = destructo(target, 'username', 'id')
console.log(personDetails) // { username: 'JohnDoe', id: 100 }
```

### Nested Objects
```javascript
const target = {
    someKey: 'someValue',
    deep: {
        foo: 'deepFoo',
        bar: 'deepBar',
    }
}
// If there are deeper objects, continue with dot notation until target is reached.
const deep = destructo(target, 'deep.foo', 'deep.bar')
console.log(deep) // { foo: 'deepFoo', bar: 'deepBar' }
```

## Destructo in action!

```javascript
const someList = [
    {name: 'Barkie', 'animalType': 'dog', color: 'brown'},
    {name: 'Mjaui', 'animalType': 'cat', color: 'yellow'},
    {name: 'Rawrie', 'animalType': 'lion', color: 'orange'}
]
const nameAndColor = someList.map(animal => destructo(animal, 'name', 'color'))
console.log(nameAndColor)
/*
    [
        {name: 'Barkie', color: 'brown'},
        {name: 'Mjaui', color: 'yellow'},
        {name: 'Rawrie', color: 'orange'}
    ]
*/
```
