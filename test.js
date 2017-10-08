const destructo = require('./destructo')

describe('destructo', () => {
  it('destructs a basic object without nesting', () => {
    const person = {
      name: 'Jane Doe',
      age: '25',
      username: 'janedoe25',
    }

    const expected = {
      name: 'Jane Doe',
      age: '25',
    }

    const result = destructo(person, 'name', 'age')
    expect(result).toEqual(expected)
  })

  it('renames properties', () => {
    const person = {
      name: 'Jane Doe',
      age: '25',
      username: 'janedoe25',
    }

    const expected = {
      newName: 'Jane Doe',
      newAge: '25',
      newUsername: 'janedoe25',
    }

    const result = destructo(
      person,
      'name:newName',
      'age:newAge',
      'username:newUsername',
    )

    expect(result).toHaveProperty('newName')
    expect(result).toHaveProperty('newAge')
    expect(result).toHaveProperty('newUsername')
    expect(result).toEqual(expected)
  })

  it('can handle nested properties', () => {
    const person = {
      name: 'Jane Doe',
      age: '25',
      username: 'janedoe25',
      dog: {
        name: 'Sudo',
        age: 36,
      },
    }
    const expected = {
      name: 'Sudo',
      age: 36,
    }

    const result = destructo(person, 'dog.name', 'dog.age')

    expect(expected).toEqual(result)
  })

  it('can handles deeply nested properties with the same name together with renaming', () => {
    const person = {
      name: 'Jane Doe',
      age: '25',
      username: 'janedoe25',
      dog: {
        name: 'Sudo',
        age: 36,
        toy: {
          name: 'Carrot on a stick',
        },
      },
    }
    const expected = {
      name: 'Sudo',
      age: 36,
      toyName: 'Carrot on a stick',
    }

    const result = destructo(
      person,
      'dog.name',
      'dog.age',
      'dog.toy.name:toyName',
    )

    expect(expected).toEqual(result)
  })

  it('can handle array properties', () => {
    const collector = {
      name: 'Big Bad Wolf',
      wolflings: ['Little Wolf', 'Medium Wolf', 'Good Wolf', 'Crazy Wolf'],
    }

    const expected = {
      wolflings: ['Little Wolf', 'Medium Wolf', 'Good Wolf', 'Crazy Wolf'],
    }

    const result = destructo(collector, 'wolflings')
    expect(result).toEqual(expected)
  })
})
