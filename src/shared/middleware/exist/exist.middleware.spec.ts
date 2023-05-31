import { ExistMiddleware } from './exist.middleware';

describe('ExistMiddleware', () => {
  it('should be defined', () => {
    expect(new ExistMiddleware()).toBeDefined();
  });
});
