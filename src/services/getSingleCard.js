import { API_URL } from './settings';

const fromApiResponseToCard = (apiResponse) => {
  const { id, created, url, origin, ...rest } = apiResponse;
  return { ...rest };
};

export default function getSingleCard({ section = 'character', id }) {
  let endpoint = id ? `${section}/${id}` : section;
  return fetch(`${API_URL}${endpoint}`)
    .then((res) => res.json())
    .then(fromApiResponseToCard);
}