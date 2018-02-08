<div align="center"><strong>Status</strong></div>

<div align="center">
  <!-- devDependency Status -->
  <a href="https://david-dm.org/sonybinhle/deep-map-object#info=devDependencies">
    <img src="https://david-dm.org/sonybinhle/deep-map-object/dev-status.svg" alt="devDependency Status" />
  </a>
</div>

# deep-map-object v0.0.1

The utility for deep mapping object keys and values

## Why deep-map-object?

The util help facilitating the deep transform from one object to another by given helpers function.


## Install:

```shell
npm i deep-map-object
```

## Usage:

<strong>ES6</strong>

```javascript
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
`deepMap: function(options: function|object) => (resolve: function(value: any) => result:any)`

+ deepMap(options) will create a resolve function which can transform(resolve) object into another format.
+ the resolve function is the util function that help you to loop deeper into input value.
+ options may be a function that take a primitive value and transform it to target value or may take a object with below format:

`mapValue: function(value: primitive, resolve: function(value: any)) => result: any`

`mapArray: function(value: array, resolve: function(value: any)) => result: any`

`mapObject: function(value: object, resolve: function(value: any)) => result: any`

`// If mapFn is used, mapValue, mapArray, mapObject options will be disabled`
`mapFn: function(value:any, resolve: function(value: any)) => result: any`

+ Based on the type of variable we want to convert, it may be object, array or primitive value.
+ deepMap internally support you to loop deeply in nested object, so you only need to care about transform business

## Static functions

`deepMap.mapValue: function(value: primitive) => result:any`

`deepMap.mapArray: function(value: array, resolve: function) => result:any`

`deepMap.mapObject: function(value: object, resolve: function) => result:any`
