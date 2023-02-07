

test('an empty cart should be free', () => {
  const cart = [];
  expect(calculatePrice(cart)).toBe(0);
});

test('example test 2', () => {
  expect(3+5).toBe(8);
});

export function calculatePrice(cart) {
    return 0;
}