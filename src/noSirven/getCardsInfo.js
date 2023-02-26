function getCard({ section = 'character', page = 1, keyword, ...args }) {
  let endpoint = keyword
    ? `${section}/?page=${page}&name=${keyword}`
    : `${section}/?page=${page}`;

  return fetch(`${API_URL}${endpoint}`)
    .then((res) => res.json())
    .then(fromApiResponseToCards)
    .catch((error) => console.log(error));
}


// Informacion de info
// const  info = {count: 826,next: "https://rickandmortyapi.com/api/character/?page=2",pages: 42,prev: null}

// const fromApiResponseToCards = (apiResponse) => {
//   const { info, results = [] } = apiResponse;

//   if (Array.isArray(results)) {
//     const cards = results.map((card) => {
//       const { name, image, type, dimension, residents=[], episode, air_date, characters= [],gender, species, status, location, episode= [] } = card
//       return {
//         name, image, type, dimension, residents, episode, air_date, characters, gender, species, status, location, episode
//       }
//     });
//     return cards;
//   }
//   return []
// };



// personajes
//name: filter by the given name.
// status: filter by the given status (alive, dead or unknown).
// species: filter by the given species.
// type: filter by the given type.
// gender: filter by the given gender (female, male, genderless or unknown).

// Location
// name: filter by the given name.
// type: filter by the given type.
// dimension: filter by the given dimension.

// Filter episodes
// name: filter by the given name.
// episode: filter by the given episode code.

// const characterURL = `${api}&status=${status}&species=${species}&gender=${gender}`
//   const locationURL= `${api}&dimesion=${dimension}`
//   const episodeURL = `${api}&episode=${episode}`

// {name, dimension, residents[], type, || episode, air_date, characters[],  || image, gender, species, status, location.name, episode[]}