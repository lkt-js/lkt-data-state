import {ObjectParser} from "../src/helpers/data-parser/ObjectParser";
import {ObjectTypeFilter} from "../src/helpers/type-filter/ObjectTypeFilter";
import {DataState} from "../src/instances/DataState";
import { PreventPropsValue } from '../src/value-objects/PreventPropsValue';


const sampleData = {
  lorem: 1,
  ipsum: 2,
  dolor: 3,
  sit: 4,
  amet: 5,
  // @ts-ignore
  amet1: null,
  test: {
    lorem: '1',
    sample: '1',

    test: {
      lorem: '1',
      sample: '2',
    }
  },
  testArray: [3, {a: 1, b: 2, c: true, d: [0, 1, 2]}]
};

test('ObjectParser', () => {
  const data = {
    lorem: 1,
    ipsum: 2,
    dolor: 3,
    sit: 4,
    amet: 5,
    // @ts-ignore
    amet1: null,
    test: {
      lorem: '1',
      sample: '1',

      test: {
        lorem: '1',
        sample: '2',
      }
    },
    // testArray: [3, {a: 1, b: 2, c: true, d: [0, 1, 2]}]
  };
  const expected = {
    amet: 5,
    // @ts-ignore
    amet1: null,
    dolor: 3,
    ipsum: 2,
    lorem: 1,
    sit: 4,
    test: {
      lorem: '1',
      sample: '1',

      test: {
        lorem: '1',
        sample: '2',
      }
    },
  };
  const parser = new ObjectParser(data);
  const result = parser.parse();
  expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
});

test('ObjectTypeFilter - no numbers', () => {
  const expected = {
    // @ts-ignore
    amet1: null,
    test: {
      lorem: '1',
      sample: '1',

      test: {
        lorem: '1',
        sample: '2',
      }
    },
    // @ts-ignore
    testArray: [{c: true, d: []}]
  };
  const parser = new ObjectTypeFilter(sampleData);
  const result = parser.filter(['number']);
  expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
});

test('ObjectTypeFilter - no strings', () => {
  const expected = {
    amet: 5,
    // @ts-ignore
    amet1: null,
    dolor: 3,
    ipsum: 2,
    lorem: 1,
    sit: 4,
    test: {
      test: {
      }
    },
    testArray: [3, {a: 1, b: 2, c: true, d: [0, 1, 2]}]
  };
  const parser = new ObjectTypeFilter(sampleData);
  const result = parser.filter(['string']);
  expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
});

test('ObjectTypeFilter - no strings,numbers', () => {
  const expected = {
    // @ts-ignore
    amet1: null,
    test: {
      test: {
      }
    },
    // @ts-ignore
    testArray: [{c: true, d: []}]
  };
  const parser = new ObjectTypeFilter(sampleData);
  const result = parser.filter(['string', 'number']);
  expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
});

test('ObjectTypeFilter - no strings,numbers,objects', () => {
  const expected = {
    // @ts-ignore
    amet1: null,
    // @ts-ignore
    testArray: []
  };
  const parser = new ObjectTypeFilter(sampleData);
  const result = parser.filter(['string', 'number', 'object']);
  expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
});

test('ObjectTypeFilter - no strings,numbers,objects, arrays', () => {
  const expected = {
    // @ts-ignore
    amet1: null,
  };
  const parser = new ObjectTypeFilter(sampleData);
  const result = parser.filter(['string', 'number', 'object', 'array']);
  expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
});

test('ObjectTypeFilter - no strings,numbers,objects, arrays, null', () => {
  const expected = {
  };
  const parser = new ObjectTypeFilter(sampleData);
  const result = parser.filter(['string', 'number', 'object', 'array', 'null']);
  expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
});
