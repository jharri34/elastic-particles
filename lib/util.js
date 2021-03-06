'use strict';
var _ = require('lodash');

/**
 * Assign property as non-enumerable property - won't serialize/iterate but can be accessed.
 * Use this to set attributes while maintaining valid elastic fields. 
 * @param {object}   scope Object to set the property on. Usually 'this';
 * @param {string}   prop  Property to set as non enumerable.
 * @param {anything} value Sets the property to this value.
 */
function createNonEnumerableProperty(scope, prop, value) {
  Object.defineProperty(scope, prop, {
    enumerable: false,
    writable: true,
    value: value
  });
}

/**
 * Merges two objects, concatonating matching arrays instead of overwriting them.
 */
function merge(obj1, obj2) {
  return _.merge(obj1, obj2, function(a, b) {
    return _.isArray(a) ? a.concat(b) : undefined;
  });
}

module.exports = {
  createNonEnumerableProperty: createNonEnumerableProperty,
  merge: merge
};