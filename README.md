![ts](https://img.shields.io/badge/Typescript-3178c6?style=for-the-badge)
![js](https://img.shields.io/badge/Javascript-f68333?style=for-the-badge)
![jest](https://img.shields.io/badge/Tested%20with%20Jest-15c213?style=for-the-badge)
![framework independent](https://img.shields.io/badge/Framework%20independent-d4d4d4?style=for-the-badge)
![node](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Flekrat%2Flkt-data-state%2Fmaster%2Fpackage.json&query=%24.engines.node&style=for-the-badge&label=node&color=026e00)

This package allows you to manage data state and check if there are changes.

# Installation

Using npm

```bash
npm i -S lkt-data-state
```

# Usage

## Create a data state controller

```ts
import DataState from 'lkt-data-state';

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
    preventTypes: ['number', 'string', 'object'] // These data types won't be stored
});

// Or instantiate without additional config
const state = new DataState(data);
```

## Update with modified data

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

## Partial increment

Sometimes you just want to modify one property. In that case, you don't need to use all the object, you can use the `increment` method this way:

```ts
state.increment({lorem: 2})
```

## Check modifications
```ts
if (state.changed()) {
    // Do your stuff
}
```

## Get data

```ts
state.getData(); // Returns modified data
state.getOriginalData(); // Returns original data
```

Keep in mind returned data will cast integer to string.

## Turn stored data into original data

```ts
state.turnStoredIntoOriginal();
```

# preventTypes

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

# preventProps

This options prevent some object properties to be stored. Works recursively in objects.