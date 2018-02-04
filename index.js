'use strict';

function isObject(o) {
    return o !== null && typeof o === 'object';
}

function isFunction(f) {
    return !!(f && f.constructor && f.call && f.apply);
}

function defaultMapValue(value) {
    return value;
}

function defaultMapArray(array, resolve) {
    return array.map(resolve);
}

function defaultMapObject(object, resolve) {
    var mappedObject = {};

    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            mappedObject[key] = resolve(object[key]);
        }
    }

    return mappedObject;
}

function deepMap(options) {
    var mapFn, mapValue, mapArray, mapObject;
    var resolveFn, resolveArray, resolveObject;

    if (!isObject(options) && !isFunction(options)) throw new Error('Options must be a function or a object');

    if (isFunction(options)) {
        options.mapValue = options;
    }

    mapFn = options.mapFn;
    mapValue = options.mapValue || defaultMapValue;
    mapArray = options.mapArray || defaultMapArray;
    mapObject = options.mapObject || defaultMapObject;

    function resolve(value) {
        if (mapFn) {
            return mapFn(value, resolve);
        }

        if (!isObject(value)) {
            return mapValue(value, resolve);
        }

        if (Array.isArray(value)) {
            return mapArray(value, resolve);
        }

        if (isObject(value)) {
            return mapObject(value, resolve);
        }

        return value;
    }

    return resolve;
}

deepMap.mapValue = defaultMapValue;
deepMap.mapArray = defaultMapArray;
deepMap.mapObject = defaultMapObject;

module.exports = deepMap;
