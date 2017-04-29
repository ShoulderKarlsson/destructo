
/**
 * @param {Object} target - the target object
 * @param {Array} keys - with keys that is to be extracted from the target
 */
const destruct = (target, ...keys) => {
  const deepKeys = getDeepKeys(keys)
  const deepObjects = getDeepObjects(target, deepKeys)
  const shallowObjects = getShallowObjects(target, keys)
  const collidingKeys = getCollidingKeys(deepObjects, shallowObjects)

  if (collidingKeys.length !== 0) throw new Error(`found colliding keys: ${collidingKeys.join(', ')}`)

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
 * @param {String} key - the current active key in .map above.
 */
const getDeepObject = (target, key) => {
  if (target && target.hasOwnProperty(key)) {
    return {[key]: target[key]}
  }

  const splittedKey = key.split('.')
  const parent = splittedKey.shift()
  const children = splittedKey.join('.')

  if (target.hasOwnProperty(parent)) {
    return getDeepObject(target[parent], children)
  } else {
    throw new Error(`Could not find key ${parent} on target object.`)
  }
}


/**
 * Takes all the shallow keys from the target object
 * @param {Object} target 
 * @param {Array} keys 
 */
const getShallowObjects = (target, keys) => keys
  .reduce((build, key) => 
    target.hasOwnProperty(key) ? Object.assign({}, build, {[key]: target[key]}) : build , {})

/**
 * Validates if there is any colliding keys from the deep and shallow objects
 * if not - they keys will "overwrite" eachother and one will disapear.
 * @param {Object} deepObjects 
 * @param {Object} shallowObjects 
 */
const getCollidingKeys = (deepObjects, shallowObjects) => 
  Object.keys(deepObjects).filter(key => Object.keys(shallowObjects).includes(key))


module.exports = destruct