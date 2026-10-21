/**
 * Test logiki kalkulatora bez frameworka testowego.
 * Node 22: import pliku .ts przez --experimental-strip-types.
 */
import assert from 'node:assert/strict';
import { compute, paybackVerdict } from '../src/lib/calc.ts';

const cases = [];
const check = (name, fn) => cases.push({ name, fn });

check('3.7 mies. => ok', () => assert.equal(paybackVerdict(3.7), 'ok'));
check('12 mies. => ok', () => assert.equal(paybackVerdict(12), 'ok'));
check('12.01 mies. => bad', () => assert.equal(paybackVerdict(12.01), 'bad'));
check('Infinity => bad', () => assert.equal(paybackVerdict(Infinity), 'bad'));
check('NaN => bad', () => assert.equal(paybackVerdict(NaN), 'bad'));
check('0 mies. => bad', () => assert.equal(paybackVerdict(0), 'bad'));
check('brak oszczędności (share 0) => bad', () => {
  const result = compute(20, 4, 22, 45, 0);
  assert.equal(result.saving, 0);
  assert.equal(paybackVerdict(2380 / result.saving), 'bad');
});
check('domyślne wartości kalkulatora (20, 4, 22, 45, 70; Start 2380) => ok', () => {
  const result = compute(20, 4, 22, 45, 70);
  assert.ok(Math.abs(result.hours - 29.3333) < 0.001);
  assert.equal(Math.round(result.cost), 1320);
  assert.equal(Math.round(result.saving), 924);
  assert.equal(Math.round(result.saving12), 11088);
  const payback = 2380 / result.saving;
  assert.ok(Math.abs(payback - 2.5758) < 0.001);
  assert.equal(Number(payback.toFixed(1)), 2.6);
  assert.equal(paybackVerdict(payback), 'ok');
});

let failed = 0;
for (const testCase of cases) {
  try {
    testCase.fn();
    console.log(`ok   ${testCase.name}`);
  } catch (error) {
    failed += 1;
    console.error(`FAIL ${testCase.name}`);
    console.error(error instanceof Error ? error.message : error);
  }
}

if (failed > 0) {
  console.error(`\n${failed}/${cases.length} testów nie przeszło`);
  process.exit(1);
}
console.log(`\n${cases.length}/${cases.length} testów przeszło`);
