import axios from 'axios';

const url = 'https://meshhouse.art/backend/api/v1';

export const axiosInstance = axios.create({
  baseURL: url,
  responseType: 'json'
});

export function getImageLink(url: string): string {
  return `https://meshhouse.art/backend/upload/thumbnails/${url}`;
}

export function getPreviewLink(url: string): string {
  return `https://meshhouse.art/backend/upload/interactive/${url}`;
}

export function getDccName(item: any): string {
  const names: any = {
    '3dsmax': '3ds Max',
    'maya': 'Maya',
    'blender': 'Blender',
    'cinema4d': 'Cinema 4D',
    'houdini': 'Houdini',
    'modo': 'Modo',
  };
  return names[item.dcc];
}

export function stringCapitalize(string: string): string {
  return string.substr(0, 1).toUpperCase() + string.substr(1);
}

export function getStringedArray(array: string[]): string {
  let string = '';
  array.forEach((item, index) => {
    string += stringCapitalize(item);
    if (index < (array.length - 1)) {
      string += ', ';
    }
  });
  return string;
}

export function getNestedCategories(links: any[]): any {
  if (links === undefined) {
    return [];
  } else {
    const categories: any[] = [];
    const nestedLinks = links.filter((link: any) => link.parentId !== null);
    links.forEach((link: any) => {
      if(link.parentId === null) {
        const newLink = {...link, subcategories: []};
        nestedLinks.forEach((nestedLink: any) => {
          if (nestedLink.parentId === link.id) {
            newLink.modelsCount += nestedLink.modelsCount;
            newLink.subcategories.push(nestedLink);
          }
        });
        categories.push(newLink);
      }
    });
    return categories;
  }
}
