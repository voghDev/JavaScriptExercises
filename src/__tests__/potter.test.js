const oneBookPrice = 8;

test('an empty cart should be free', () => {
  const cart = [];
  expect(calculatePrice(cart)).toBe(0);
});

test('price for a single book should be the same', () => {
  expect(calculatePrice([0])).toBe(oneBookPrice);
  expect(calculatePrice([1])).toBe(oneBookPrice);
  expect(calculatePrice([2])).toBe(oneBookPrice);
  expect(calculatePrice([3])).toBe(oneBookPrice);
  expect(calculatePrice([4])).toBe(oneBookPrice);
});

test('should apply simple discounts', () => {
  expect(calculatePrice([0, 1])).toBe(oneBookPrice * 2 * 0.95);
  expect(calculatePrice([0, 2, 4])).toBe(oneBookPrice * 3 * 0.9);
  expect(calculatePrice([0, 1, 2, 4])).toBe(oneBookPrice * 4 * 0.8);
  expect(calculatePrice([0, 1, 2, 3, 4])).toBe(oneBookPrice * 5 * 0.75);
})

export function calculatePrice(cart) {
    if (cart.length == 1)
        return oneBookPrice;
    if (cart.length == 2)
        return oneBookPrice * 2 * 0.95;
    if (cart.length == 3)
        return oneBookPrice * 3 * 0.9;
    if (cart.length == 4)
        return oneBookPrice * 4 * 0.8;
    if (cart.length == 5)
        return oneBookPrice * 5 * 0.75;

    return 0;
}
