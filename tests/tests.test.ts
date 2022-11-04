import {DataState} from "../src/instances/DataState";
import { PreventPropsValue } from '../src/value-objects/PreventPropsValue';

test('PreventStoreOptionsValue', () => {
  const prevent = new PreventPropsValue(['lorem', 'ipsum']);
  const data = {
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
        sample: '2',
      }
    }
  };
  const expected = {
    dolor: 3,
    sit: 4,
    amet: 5,
    test: {
      sample: '1',
      test: {
        sample: '2',
      }
    }
  };
  const result = prevent.clear(data);
  expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
});

test('DataStateController', () => {
  const data = {
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
  const data2 = {
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

  const expected = {
    from: {
      dolor: '3',
      test: {
        test: {
          sample: '32',
        }
      }
    },
    to: {
      dolor: '34',
      test: {
        test: {
          sample: '2',
        }
      }
    }
  }
  const state = new DataState(data, {
    preventProps: ['lorem', 'ipsum']
  });
  state.store(data2);
  expect(state.changed()).toEqual(true);
  expect(JSON.stringify(state.differences())).toEqual(JSON.stringify(expected));
});

test('DataStateController - preventTypes', () => {
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
  const data2 = {
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

  const expected = {
    from: {
      boolProp: false,
    },
    to: {
      boolProp: true,
    }
  }
  const state = new DataState(data, {
    preventProps: ['lorem', 'ipsum'],
    preventTypes: ['number', 'string', 'object']
  });
  state.store(data2);
  expect(state.changed()).toEqual(true);
  expect(JSON.stringify(state.differences())).toEqual(JSON.stringify(expected));
});

test('DataStateController - preventTypes with array of objects', () => {
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
    },
    testArray: [3, {a: 1, b: 2, c: true, d: [0, 1, 2]}
    ]
  };
  const data2 = {
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
    },
    testArray: [4, {a: 1, b: 2, c: false, d: [0, 1, 3]}
    ]
  };

  const expected = {
    from: {
      boolProp: false,
    },
    to: {
      boolProp: true,
    }
  }
  const state = new DataState(data, {
    preventProps: ['lorem', 'ipsum'],
    preventTypes: ['string', 'number', 'object']
  });
  state.store(data2);
  expect(state.changed()).toEqual(true);
  expect(JSON.stringify(state.differences())).toEqual(JSON.stringify(expected));
});
