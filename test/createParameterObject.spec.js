import test from 'ava';
import fn from '../lib/parameterObject';

test('if request passed undefined, then return []', t => {
  t.deepEqual(fn.create('get'), []);
});
