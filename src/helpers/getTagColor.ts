export const getTagColor = (tag: string) => {
  switch (tag.toLowerCase()) {
    case 'bonus':
      return '#DBC44F';
    case 'fresh':
      return '#A1E3FF';
    case 'out of season':
      return '#A3FAA2';
    case 'organic':
      return '#F5ADA7';
    default:
      return '#f5f5f5';
  }
};
