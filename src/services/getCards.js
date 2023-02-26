import { API_URL } from './settings';

const fromApiResponseToCards = (apiResponse) => {
  const {
    info: { pages, count },
    results = [],
  } = apiResponse;
  if (Array.isArray(results)) {
    const cards = results.map((card) => {
      const {
        name,
        image,
        id,
        residents = [],
        episode,
        characters = [],
      } = card;
      return { name, image, id, residents, episode, characters, episode };
    });
    return { cards, pages, count };
  }
  return [];
};

export default function getCards({ section = 'character', page = 1, ...args }) {
  const endpoint = Array.from(
    Object.entries(args),
    ([key, value]) => value && `&${key}=${value}`
  ).join('');

  return fetch(`${API_URL}${section}/?page=${page}${endpoint}`)
    .then((res) => res.json())
    .then(fromApiResponseToCards);
}
