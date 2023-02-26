import { useState } from 'react';
// import getGifs from '../services/getGifs';
// import GifsContext from '../context/GifsContext';
const getArgs = (query) => {
  let [key, value] = query?.split('-');
  value = value?.includes('%20') ? value.split('%20').join(' ') : value;
  return { [key]: value.toLowerCase() };
};

const initial_state = {
  loading: false,
  cards: [],
  page: 1,
  keyword: '',
};
function useCardsee({ section = 'location', name = '' }) {
  const [state, setState] = useState(initial_state);

  useEffect(() => setState((prev) => ({ ...prev, keyword: '' })), [section]);

  useEffect(() => {
    if (!state.keyword && name) return;
    setState((prev) => ({ ...prev, loading: true }));
    const timer = setTimeout(() => {
      getCards({ section, page: state.page, name: state.keyword }).then(
        ({ cards, pages, count }) => {
          setState((prev) => ({ ...prev, cards, loading: false }));
        }
      );
    }, 2000);
    return () => clearTimeout(timer);
  }, [section, page, keyword]);

  const args = getArgs(name);

  useEffect(() => {
    if (!name) return;
    setState((prev) => ({ ...prev, loading: true }));
    getCards({ section, page: state.page, ...args }).then(
      ({ cards, count }) => {
        setState((prevState) => ({ ...prevState, cards, loading: false }));
      }
    );
  }, [state.page, name]);

  const consumir = () => {
    getCards({ section, page: state.page, ...args }).then(
      ({ cards, count }) => {
        setState((prevState) => ({ ...prevState, cards, loading: false }));
      }
    );
  };

  const handleChange = ({ target: { value } }) =>
    setState((prevState) => ({
      prevState,
      keyword: value.toLocaleLowerCase(),
    }));

  const [_, pushLocation] = useLocation();

  const handleSubmitKeyword = (evt) => {
    evt.preventDefault();
    const query = {
      keyword: `${section}: ${state.keyword}`,
      url: `/${section}/name-${state.keyword}`,
    };

    pushLocation(query.url);

    const lastQueries =
      JSON.parse(localStorage.getItem('lastQueries'))?.slice(0, 5) || [];
    localStorage.setItem(
      'lastQueries',
      JSON.stringify([query, ...lastQueries])
    );
  };

  return {
    loading,
    cards,
    page,
    setPage,
    keyword,
    handleChange,

    onSubmitKeyword,
  };
}




const INITIAL_PAGE = 0;
function useGifs({ keyword, rating } = { keyword: null }) {
  const [loading, setLoading] = useState(false);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  const [page, setPage] = useState(INITIAL_PAGE);
  const { gifs, setGifs } = useContext(GifsContext);

  // recuperamos la keyword del localStorage
  const keywordToUse =
    keyword || localStorage.getItem('lastKeyword') || 'random';

  useEffect(() => {
    setLoading(true);

    getGifs({ keyword: keywordToUse, rating }).then((gifs) => {
      setGifs(gifs);
      setLoading(false);
      // guardamos la keyword en el localStorage
      localStorage.setItem('lastKeyword', keyword);
    });
  }, [keyword, keywordToUse, rating, setGifs]);

  useEffect(() => {
    if (page === INITIAL_PAGE) return;

    setLoadingNextPage(true);

    getGifs({ keyword: keywordToUse, page, rating }).then((nextGifs) => {
      setGifs((prevGifs) => prevGifs.concat(nextGifs));
      setLoadingNextPage(false);
    });
  }, [keywordToUse, page, rating, setGifs]);

  return { loading, loadingNextPage, gifs, setPage };
}

