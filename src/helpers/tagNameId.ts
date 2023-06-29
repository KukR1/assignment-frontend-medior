import { fruitTags } from 'app/mocks/fruitTags';
import { vegetableTags } from 'app/mocks/vegetableTags';

export function getTagName(tagId: string): string {
  const fruitTag = fruitTags.find((tag) => tag.id === tagId);
  if (fruitTag) return fruitTag.name;

  const vegetableTag = vegetableTags.find((tag) => tag.id === tagId);
  if (vegetableTag) return vegetableTag.name;

  throw new Error(`Invalid tag ID: ${tagId}`);
}
