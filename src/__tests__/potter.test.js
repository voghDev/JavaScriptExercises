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

test('should apply several discounts for various books', () => {
  expect(calculatePrice([0, 0, 1])).toBe(oneBookPrice + (oneBookPrice * 2 * 0.95));
  expect(calculatePrice([0, 0, 1, 1])).toBe(2 * (oneBookPrice * 2 * 0.95));
  expect(calculatePrice([0, 0, 1, 2, 2, 3])).toBe((oneBookPrice * 4 * 0.8) + (oneBookPrice * 2 * 0.95));
  expect(calculatePrice([0, 1, 1, 2, 3, 4])).toBe(oneBookPrice + (oneBookPrice * 5 * 0.75));
});

export function calculatePrice(cart) {
    const booksMap = countBooks(cart);
    const result = calculatePriceBasedOnTheNumberOfBooks(booksMap);
    return result;
}

function countBooks(cart) {
    const booksMap = new Map();
    cart.forEach(book => {
        if (booksMap.has(book)) {
            const value = booksMap.get(book);
            booksMap.set(book, value + 1);
        } else {
            booksMap.set(book, 1);
        }
    });
    return Array.of(...booksMap.values());
}

function calculatePriceBasedOnTheNumberOfBooks(books) {
    const numberOfDifferentBooks = books.filter(x => x > 0).length;
    if (numberOfDifferentBooks === 0) {
        return 0.0;
    } else if (numberOfDifferentBooks === 1) {
        return oneBookPrice * books[0];
    } else if (numberOfDifferentBooks === 2) {
        return (oneBookPrice * 2 * 0.95 +
            calculatePriceBasedOnTheNumberOfBooks(removeDiscountedBooks(books)));
    } else if (numberOfDifferentBooks === 3) {
        return (oneBookPrice * 3 * 0.9 +
            calculatePriceBasedOnTheNumberOfBooks(removeDiscountedBooks(books)));
    } else if (numberOfDifferentBooks === 4) {
        return (oneBookPrice * 4 * 0.8 +
            calculatePriceBasedOnTheNumberOfBooks(removeDiscountedBooks(books)));
    } else if(numberOfDifferentBooks === 5) {
        return (oneBookPrice * 5 * 0.75 +
            calculatePriceBasedOnTheNumberOfBooks(removeDiscountedBooks(books)));
    }

    return 0.0;
}

function removeDiscountedBooks(books) {
    return books.map(x => x - 1).filter(x => x > 0);
}
