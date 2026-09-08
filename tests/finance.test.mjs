import { test } from 'node:test';
import assert from 'node:assert/strict';
import { npv, irr, payback, example } from '../src/lib/finance.ts';

test('NPV includes initial investment and discounts end-of-year receipts', () => {
  assert.ok(Math.abs(npv(0.1, [-100, 110])) < 1e-10);
  assert.equal(npv(0, [-100, 50, 60]), 10);
  assert.ok(Math.abs(npv(example.rate, example.cashFlows) - 21305.1766210703) < 0.001);
});
test('IRR solves NPV=0, including negative and above-100% returns', () => {
  for (const flows of [[-100, 110], [-100, 90], [-100, 300], example.cashFlows]) assert.ok(Math.abs(npv(irr(flows), flows)) < 1e-7);
  assert.equal(irr([-100, 0, 0]), null);
  assert.equal(irr([-100, 300, -200]), null);
});
test('simple payback interpolates recovery and reports unrecovered investments', () => {
  assert.equal(payback(example.cashFlows), 3.125);
  assert.equal(payback([-100, 50, 50]), 2);
  assert.equal(payback([-100, 0, 20]), null);
  assert.equal(payback([-100, -5, 200]), null);
});
test('invalid rate or non-finite cash flow is rejected', () => {
  assert.throws(() => npv(-1, [-100, 110]), RangeError);
  assert.throws(() => npv(0.1, [NaN]), RangeError);
  assert.equal(irr([-100, Infinity]), null);
});
