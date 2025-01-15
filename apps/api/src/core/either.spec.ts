import { Either, left, right } from './either';

function doSomething(shouldSucceed: boolean): Either<string, string> {
  if (shouldSucceed) {
    return right('success');
  } else {
    return left('error');
  }
}
test('success result', () => {
  const result = doSomething(true);

  expect(result.isRight()).toBe(true);
  expect(result.isLeft()).toBe(false);
});

test('error result', () => {
  const result = doSomething(false);

  expect(result.isLeft()).toEqual(true);
  expect(result.isRight()).toEqual(false);
});
