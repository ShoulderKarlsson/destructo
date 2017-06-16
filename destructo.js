
/**
 * @param {Object} target - the target object
 * @param {Array} keys - with keys that is to be extracted from the target
 */
const destructo = (target, ...keys) => {
  if (typeof target !== 'object') return

  const deepKeys = getDeepKeys(keys)
  const deepObjects = getDeepObjects(target, deepKeys)
  const shallowObjects = getShallowObjects(target, keys)

  return Object.assign({}, shallowObjects, deepObjects)
}

/**
 * Finds all keys that are for deep objects.
 * Sorting out keys with .
 * @param {Array} keys 
 */
const getDeepKeys = keys => keys.filter(key => key.indexOf('.') > 1)


/**
 * Builds the deep objects together
 * @param {Object} target 
 * @param {Array} deepKeys 
 */
const getDeepObjects = (target, deepKeys) => deepKeys
  .map(key => getDeepObject(target, key))
  .reduce((build, obj) => Object.assign({}, build, obj), {}) 


/**
 * recusivly walks down the target object until key is found.
 * @param {Object} target 
 * @param {String} key - the current active key in loop above.
 */
const getDeepObject = (target, key) => {
  if (key.includes(':')) {
    const [ originalName, renamed ] = key.split(':')
    if (target && target.hasOwnProperty(originalName)) {
      return { [renamed]: target[originalName] }
    }
  }

  if (target && target.hasOwnProperty(key)) {
    return { [key]: target[key] }
  }

  const splittedKey = key.split('.')
  const parent = splittedKey.shift()
  const children = splittedKey.join('.')

  if (target.hasOwnProperty(parent)) {
    return getDeepObject(target[parent], children)
  }
}

/**
 * Takes all the shallow keys from the target object
 * @param {Object} target 
 * @param {Array} keys 
 */
const getShallowObjects = (target, keys) => {
  return keys.reduce((build, key) => {
    if (key.includes(':')) {
      const [ originalName, renamed ] = key.split(':')
      if (target.hasOwnProperty(originalName)) {
        return Object.assign({}, build, {
          [renamed]: target[originalName]
        })
      }
    }
    
    return target.hasOwnProperty(key) ? 
      Object.assign({}, build, {[key]: target[key]}) : build
  }, {})
}

module.exports = destructo