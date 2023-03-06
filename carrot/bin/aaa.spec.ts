// 하나의 테스트
it('add a + b', () => {
  const a = 1;
  const b = 2;

  expect(a + b).toBe(3);
});

// 그룹테스트
describe('group test', () => {
  it('group test1', () => {
    console.log('group_test1');
  });
  it('group test2', () => {
    console.log('group_test2');
  });
});

// 상품구매 테스트
describe('buy product', () => {
  beforeEach(() => {
    // login
  });

  it('money validation', () => {
    const result = true;
    expect(result).toBe(true);
  });

  it('buy product', () => {
    const result = true;
    expect(result).toBe(true);
  });
});
