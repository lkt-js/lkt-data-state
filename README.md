# LKT State

This Vue 3 plugin allows you to manage data state and check if there are changes.

## Installation

### With npm

```bash
npm i -S lkt-state
```

## Typical use:

In your main.js

```js
import LktState from 'lkt-state';

app.use(LktState);
```

## Methods

One used by your app, all your components will have the following methods:

### $storeDataState (data = {})

Given an input data object (```{key: value}```), it will be stored in an internal controller.

Each time you store new data with this method, it will be automatically compared with the first data input.

```js
export default {
    data() {
        return {
            state: {}
        }
    },
    mounted() {
        this.$storeDataState(this.state);
    },
    methods: {
        onDataChange() {
            this.$storeDataState(this.state);
        }
    }
}
```

### $resetDataState (data = {})

Similar to ```$storeDataState``` but this method sets the comparable data to check in each ```$storeDataState``` call.

### $preventStoreDataProps(props: string[])

Configure some object keys which won't be stored.

Important: If there are objects inside the stored object, any of those will store this props.

```js
export default {
    data() {
        return {
            state: {
                test: 'test',
                dontStoreMe: 'God hates me :(',
                fn: () => 1,
            }
        }
    },
    mounted() {
        this.$preventStoreDataProps(['dontStoreMe', 'fn']);

        // This call only stores 'test' property
        this.$storeDataState(this.state);
    },
    methods: {
        onDataChange() {
            // This call only stores 'test' property
            this.$storeDataState(this.state);
        }
    }
}
```

## Computed properties

### $hasModifiedDataStored boolean

Controls if there are modified data.

```js
export default {
    data() {
        return {
            state: {}
        }
    },
    methods: {
        save() {
            if (!this.$hasModifiedDataStored) {
                return;
            }
            // Do your stuff
        }
    }
}
```

## Events

### data-state-changed

Params:

- `state` boolean
    - `true` if there are modifications
    - `false` if original data and current data are the same