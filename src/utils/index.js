const baseAvatarImgUrl = 'https://rickandmortyapi.com/api/character/avatar/';
let noCharacter = 'https://rickandmortyapi.com/api/character/avatar/249.jpeg'; //  avatar sin rostro

export function getAvatarOrImage(avatarUrl = '') {
  let card = {};
  if (avatarUrl.includes('episode')) card['avatarId'] = avatarUrl.substring(40);
  else if (avatarUrl.includes('character')) {
    const avatarId = avatarUrl.substring(42);
    card = { image: `${baseAvatarImgUrl + avatarId}.jpeg`, avatarId };
  } else card['avatarId'] = avatarUrl.substring(41);

  if (!card?.image) card['image'] = noCharacter;

  return { ...card };
}

export const sections = [
  { name: 'home', sectionName: 'inicio', image: '', url: '/' },
  {
    name: 'character',
    sectionName: 'personajes',
    image:
      'https://1.bp.blogspot.com/-0vvoJLN8EDE/WEBbIsjD7yI/AAAAAAAACSE/xA80rGqAXvEwBk52lAaDK7fOWov2TvaBgCLcB/w1200-h630-p-k-no-nu/Season1MonsterPosterV3.jpg',
    url: '/character',
  },
  {
    name: 'location',
    sectionName: 'localizaciones',
    image:
      'https://www.pixel4k.com/wp-content/uploads/2020/01/rick-and-morty-smith-adventures_1580056495-2048x1199.jpg',
    url: '/location',
  },
  {
    name: 'episode',
    sectionName: 'episodios',
    image:
      'https://yt3.ggpht.com/a/AATXAJyA1gqoKB0ic0fc3zS29cqhxJomo4_5qKvrKA=s900-c-k-c0xffffffff-no-rj-mo',
    url: '/episode',
  },
];

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
}

export const getParams = (query) => {
  let [key, value] = query?.split('-');
  value = value?.replaceAll('%20', ' ');
  return { [key]: value?.toLowerCase() };
};

export const saveKeywordLocalStorage = (query) => {
  const lastQueries =
    JSON.parse(localStorage.getItem('lastQueries'))?.slice(0, 5) || [];
  localStorage.setItem('lastQueries', JSON.stringify([query, ...lastQueries]));
};
