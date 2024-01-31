import slugify from 'slugify';

export const Util = {
  createSlug(input: string): string {
    return slugify(input, { lower: true });
  },
};
