# deep-map-object v0.0.1

The utility for deep mapping object keys and values

## Why deep-map-object?

The util help facilitating the deep transform from one object to another by given helpers function.


## Install:

```shell
npm i deep-map-object
```

## Usage:

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

### Static functions

deepMap.mapValue: value:Primitive => result:any

deepMap.mapArray: (value:Array, resolve:Func) => result:any

deepMap.mapObject: (value:Object, resolve:Func) => result:any

deepMap: (Func(options:(Func|Object)) => resolve:(Func(value:any) => result:any))

options:

    mapValue: Func(value:Primitive, resolve:Func) => result:any
    mapArray: Func(value:Array, resolve:Func) => result:any
    mapObject: Func(value:Object, resolve:Func) => result:any

    // If mapFn used, mapValue, mapArray, mapObject options will be disabled
    mapFn: Func(value:any, resolve:Func) => result:any

