# LKT Data State

This package allows you to manage data state and check if there are changes.

## Installation

### With npm

```bash
npm i -S lkt-data-state
```

## Usage

### Create a data state controller

```ts
import DataState from 'lkt-state';

const data = {
    boolProp: false,
    lorem: 1,
    ipsum: 2,
    dolor: 3,
    sit: 4,
    amet: 5,
    test: {
        lorem: '1',
        sample: '1',

        test: {
            lorem: '1',
            sample: '32',
        }
    }
};

const state = new DataState(data, {
    preventProps: ['lorem', 'ipsum'], // These props won't be stored
    preventTypes: ['number', 'string', 'object'] // The data types won't be stored
});

// Or instantiate without additional config
const state = new DataState(data);
```

### Update with modified data

Once you have your DataState instance you can store an update like following:

```ts
const updatedData = {
    boolProp: true,
    lorem: 1,
    ipsum: 2,
    dolor: 34,
    sit: 4,
    amet: 5,
    test: {
        lorem: '1',
        sample: '1',

        test: {
            lorem: '1',
            sample: '2',
        }
    }
};

state.store(updatedData)
```

### Check modifications
```ts
if (state.changed()) {
    // Do your stuff
}
```
If you want to see modifications, you can use:
```ts
const diff = state.differences();
```
In the example with `preventProps` and `preventTypes` it will output:

```ts
const diff = {
    from: {
      boolProp: false,
    },
    to: {
      boolProp: true,
    }
}
```

## preventTypes

Available types to remove are:
- string
- number
- undefined
- function
- null
- boolean
- object
- array

`preventTypes` option works recursively in objects

## preventProps

This options prevent some object properties to be stored. Works recursively.