import { useState, useEffect, useReducer } from 'react';
import getSingleCard from '../services/getSingleCard';

export default function useSingleCard({ section, id }) {
  const [state, setState] = useState({
    card: {},
    loading: false,
  });
  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    getSingleCard({ section, id }).then((card) =>
      setState((prev) => ({ ...prev, card, loading: false }))
    );
  }, [id]);

  return [state.card, state.loading];
}
