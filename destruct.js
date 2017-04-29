function destruct(target, ...keys) {
  const deepKeys = keys.filter(key => key.indexOf('.') > 1)
  const deepObjects = deepKeys
    .map(key => getDeepObject(target, key))
    .reduce((build, obj) => Object.assign({}, build, obj), {})

  const shallowObjects = keys.reduce((build, key) => {
    return target.hasOwnProperty(key) ?
      Object.assign({}, build, { [key]: target[key] }) : build
  }, {})

  const collidingKeys = Object.keys(shallowObjects).filter(
    k => Object.keys(deepObjects).includes(k)
  )

  if (collidingKeys.length !== 0) throw new Error(`Colliding keys: ${collidingKeys.join(', ')}`)

  return Object.assign({}, shallowObjects, deepObjects)
}

function getDeepObject(target, key) {
  if (target && target.hasOwnProperty(key)) {
    return {[key]: target[key]}
  }

  const splittedKey = key.split('.')
  const parent = splittedKey.shift()
  const children = splittedKey.join('.')

  if (target.hasOwnProperty(parent)) {
    return getDeepObject(target[parent], children)
  } else {
    throw new Error(`Non existing key ${parent}`)
  }
}

module.exports = destruct
