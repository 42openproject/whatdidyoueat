test("two plus tow is four ", () => {
  expect(2 + 2).toBe(4);
  //expect(2 + 2).not.toBe(5);
});

describe("Calculation", () => {
  test("two plus tow is foure ", () => {
    expect(2 + 2).toBe(4);
  });
  test("two plus tow is foure ", () => {
    expect(2 + 2).not.toBe(5);
  });
});
