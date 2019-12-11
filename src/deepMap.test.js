const deepMap = require('./deepMap');

describe('deepMap', function () {
  it('when options is not a function or object -> then throw exception', function () {
    // Given
    var object = {};

    // When
    try {
      deepMap()(object);
    } catch (e) {
      // Then
      expect(e.message).toEqual('Options must be a function or a object');
    }
  });

  it('when using options function -> then using mapValue to map the input', function () {
    // Given
    var object = {
      a: 8,
      b: 'string',
      c: ['a', 0, 'b'],
      d: { e: { f: 'f', g: 10 } }
    };
    var options = function (value) {
      if (!isNaN(value)) {
        return 'The original value is ' + value;
      }

      return value;
    };

    // When
    var result = deepMap(options)(object);

    // Then
    expect(result).toEqual({
      a: 'The original value is 8',
      b: 'string',
      c: ['a', 'The original value is 0', 'b'],
      d: { e: { f: 'f', g: 'The original value is 10' } }
    });
  });

  it('when using mapFn options -> then map object based on mapFn', function () {
    // Given
    var object = {
      a: 8,
      b: 0,
      c: {
        d: {
          x: 1
        },
        e: {
          a: 1
        }
      }
    };
    var options = {
      mapFn: function (value, resolve) {
        if (value instanceof Object) {
          if (value.x) {
            return value.x + 1;
          }

          return deepMap.mapObject(value, resolve);
        }

        return value + 1;
      }
    };

    // When
    var result = deepMap(options)(object);

    // Then
    expect(result).toEqual({
      a: 9,
      b: 1,
      c: {
        d: 2,
        e: {
          a: 2
        }
      }
    });
  });

  it('when using mapValue options -> then map object based on mapValue', function () {
    // Given
    var object = {
      a: 8,
      c: {
        d: {
          t: 'hello',
          x: 1
        }
      }
    };
    var options = {
      mapValue: function (value) {
        return value + 1;
      }
    };

    // When
    var result = deepMap(options)(object);

    // Then
    expect(result).toEqual({
      a: 9,
      c: {
        d: {
          t: 'hello1',
          x: 2
        }
      }
    });
  });

  it('when using mapArray options -> then map object based on mapArray', function () {
    // Given
    var object = {
      a: 8,
      c: [
        {
          d: 'c',
          c: [1, 2, 3]
        },
        1,
        2
      ]
    };
    var options = {
      mapArray: function (values, resolve) {
        return values.map(function (value) {
          if (value instanceof Object) {
            return resolve(value);
          }

          return value + 1;
        });
      }
    };

    // When
    var result = deepMap(options)(object);

    // Then
    expect(result).toEqual({
      a: 8,
      c: [
        {
          d: 'c',
          c: [2, 3, 4]
        },
        2,
        3
      ]
    });
  });

  it('when using mapObject options -> then map object based on mapObject', function () {
    // Given
    var object = {
      a: 8,
      c: [
        {
          d: 'c',
          c: [1, 2, 3]
        },
        1,
        2
      ]
    };
    var options = {
      mapObject: function (object, resolve) {
        if (object.d) {
          return object.c;
        }

        return deepMap.mapObject(object, resolve);
      }
    };

    // When
    var result = deepMap(options)(object);

    // Then
    expect(result).toEqual({
      a: 8,
      c: [
        [1, 2, 3],
        1,
        2
      ]
    });
  });

  it('when using mapValue, mapArray, mapObject options -> then map object based on all options', function () {
    // Given
    var object = {
      a: 8,
      c: [
        {
          d: 'c',
          c: [1, 2, 8]
        },
        1,
        2
      ]
    };
    var options = {
      mapValue: function (value) {
        return value + 1;
      },
      mapArray: function (array, resolve) {
        var newArray = array.concat([1]);

        return deepMap.mapArray(newArray, resolve);
      },
      mapObject: function (object, resolve) {
        if (object.d) {
          return resolve(object.c);
        }

        return deepMap.mapObject(object, resolve);
      }
    };

    // When
    var result = deepMap(options)(object);

    // Then
    expect(result).toEqual({
      a: 9,
      c: [
        [2, 3, 9, 2],
        2,
        3,
        2
      ]
    });
  });

  it('when using object with prototypes -> don\'t map prototype part', function () {
    // Given
    var prototype = {
      p: 1
    };
    var object = {
      a: 8
    };

    object.__proto__ = prototype; // eslint-disable-line

    var options = function (value) {
      return value + 1;
    };

    // When
    var result = deepMap(options)(object);

    // Then
    expect(result).toEqual({
      a: 9
    });

    expect(result.__proto__).toEqual(Object.prototype); // eslint-disable-line
  });
});
