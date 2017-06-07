## destructo
---

    npm install destructo
    yarn add destructo

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

### Rename
```javascript
const target = {
    someKey: 'someValue',
    deep: {
        foo: 'deepFoo'
    }
}

const newKeyNames = destructo(target, 'someKey:newName', 'deep.foo:newFoo') 
console.log(newKeyNames) // {newName: 'someValue', newFoo: 'deepFoo'}
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
    {name: 'Lassie', 'animalType': 'dog', color: 'brown'},
    {name: 'CatStevens', 'animalType': 'cat', color: 'yellow'},
    {name: 'Christian', 'animalType': 'lion', color: 'orange'}
]
const nameAndColor = someList.map(animal => destructo(animal, 'name', 'color'))
console.log(nameAndColor)
/*
    [
        {name: 'Lassie', color: 'brown'},
        {name: 'CatStevens', color: 'yellow'},
        {name: 'Christian', color: 'orange'}
    ]
*/
```

