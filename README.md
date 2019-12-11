<div align="center"><strong>Status</strong></div>

<div align="center">
  <a href="https://david-dm.org/sonybinhle/deep-map-object?type=dev" title="devDependencies status">
    <img src="https://david-dm.org/sonybinhle/deep-map-object/dev-status.svg"/>
  </a>
  
  <a href="https://travis-ci.org/sonybinhle/deep-map-object.svg?branch=master">
      <img src="https://travis-ci.org/sonybinhle/deep-map-object.svg?branch=master" alt="Build Status" />
    </a>
    
  <a href='https://coveralls.io/github/sonybinhle/deep-map-object?branch=master'>
  <img src='https://coveralls.io/repos/github/sonybinhle/deep-map-object/badge.svg?branch=master' alt='Coverage Status' />
  </a>

</div>

# deep-map-object v0.0.5

The utility for deep mapping object keys and values

## Why deep-map-object?

The util help facilitating the deep transform from one object to another by given helpers function.


## Install:

```shell
npm i deep-map-object
```

## Usage:

<strong>ES6</strong>

```jsx harmony
import deepMap from 'deep-map-object';

const options = function(value) {
    return value + 1;
};

const data = {
    x: 1,
    y: {
        z: [2, 3],
        t: 4
    }
};

const result = deepMap(options)(data);

console.log(result);
/*
{
    x: 2,
    y: {
        z: [3, 4],
        t: 5
    }
}
*/
```

<strong>ES5</strong>

```javascript
var deepMap = require('deep-map-object');

var options = function(value) {
    return value + 1;
};

var data = {
    x: 1,
    y: {
        z: [2, 3],
        t: 4
    }
};

var result = deepMap(options)(data);

console.log(result);
/*
{
    x: 2,
    y: {
        z: [3, 4],
        t: 5
    }
}
*/
```

## Api:

### deepMap(options)(obj)
<strong>deepMap: function(options: function|object) => (resolve: function(value: any) => result:any)</strong>

+ deepMap(options) will create a resolve function which can transform(resolve) object into another format.
+ the resolve function is the util function that help you to loop deeper into input value.
+ options may be a function that take a primitive value and transform it to target value or may take a object with below format:
```jsx harmony
import deepMap from 'deep-map-object';

const data = { x: 1 };

const result = deepMap(value => value + 1)(data);

console.log(result); // {x : 2}
```

<strong>mapValue: function(value: primitive, resolve: function(value: any))</strong>
```jsx harmony
import deepMap from 'deep-map-object';

const data = { x: 1 };

const result = deepMap({ mapValue: value => value + 1 })(data);

console.log(result); // {x : 2}
```

<strong>mapArray: function(value: array, resolve: function(value: any))</strong>
```jsx harmony
import deepMap from 'deep-map-object';

const data = { a: [1, 2, 3] };

const result = deepMap({ mapArray: values => values.map(value => value + 1) })(data);

console.log(result); // { a: [2, 3, 4] };
```

<strong>mapObject: function(value: object, resolve: function(value: any))</strong>
```jsx harmony
import deepMap from 'deep-map-object';

const data = { a: { num: 0 }, b: { num: 1 } };

const result = deepMap({ 
   mapObject: (obj, resolve) => obj.num > 0 
       ? {...obj, num: obj.num + 1 } 
       : deepMap.mapObject(obj, resolve) 
})(data);

console.log(result); // { a: { num: 0 }, b: { num: 2 } };
```

<strong>mapFn: function(value:any, resolve: function(value: any))</strong>
`// If mapFn is used, mapValue, mapArray, mapObject options will be disabled`
```jsx harmony
import deepMap from 'deep-map-object';

const data = { a: { num: 0 }, c: { d: [1, 2] } };

const result = deepMap({ 
   mapFn: (val, resolve) => {
     if (Array.isArray(val)) return val.map(resolve);
     if (val instanceof Object) return deepMap.mapObject(val, resolve);
     
     return val + 1;
   } 
})(data);

console.log(result); // { a: { num: 1 }, c: { d: [2, 3] } };
```

+ Based on the type of variable we want to convert, it may be object, array or primitive value.
+ deepMap internally support you to loop deeply in nested object, so you only need to care about transform business

## Static functions

<strong>deepMap.mapArray: function(value: array, resolve: function(value: any))</strong>

+ default mapArray util which run resolve to every array's items

<strong>deepMap.mapObject: function(value: object, resolve: function(value: any))</strong>

+ default mapObject util which run resolve to every object's key