/** Conventional annual cash flows: investment at t=0, receipts at year end. */
export function npv(rate: number, cashFlows: readonly number[]): number {
  if (
    !Number.isFinite(rate) ||
    rate <= -1 ||
    cashFlows.some((value) => !Number.isFinite(value))
  )
    throw new RangeError("Invalid cash flow or discount rate");
  return cashFlows.reduce(
    (total, value, year) => total + value / (1 + rate) ** year,
    0,
  );
}

export function irr(cashFlows: readonly number[]): number | null {
  if (
    cashFlows.length < 2 ||
    cashFlows[0] >= 0 ||
    cashFlows.slice(1).some((value) => value < 0) ||
    cashFlows.some((value) => !Number.isFinite(value)) ||
    !cashFlows.slice(1).some((value) => value > 0)
  )
    return null;
  let low = -0.9999,
    high = 1;
  while (npv(high, cashFlows) > 0 && high < 1e6) high *= 2;
  if (npv(high, cashFlows) > 0) return null;
  for (let i = 0; i < 100; i++) {
    const middle = (low + high) / 2;
    if (npv(middle, cashFlows) > 0) low = middle;
    else high = middle;
  }
  return (low + high) / 2;
}

/** Simple payback, with linear interpolation inside the recovery year. */
export function payback(cashFlows: readonly number[]): number | null {
  if (
    !cashFlows.length ||
    cashFlows[0] >= 0 ||
    cashFlows.some((value) => !Number.isFinite(value)) ||
    cashFlows.slice(1).some((value) => value < 0)
  )
    return null;
  let balance = cashFlows[0];
  for (let year = 1; year < cashFlows.length; year++) {
    const receipt = cashFlows[year];
    if (balance + receipt >= 0 && receipt > 0)
      return year - 1 + -balance / receipt;
    balance += receipt;
  }
  return null;
}

export const example = {
  cashFlows: [-100000, 32000, 32000, 32000, 32000, 32000],
  rate: 0.1,
};
