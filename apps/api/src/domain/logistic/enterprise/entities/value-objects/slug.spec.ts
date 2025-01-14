import { Slug } from './slug';

describe('slug tests', () => {
  it('should be able to create a new slug from text', () => {
    const slug = Slug.createFromText('Example slug restaurant');

    expect(slug.value).toEqual('example-slug-restaurant');
  });
});
