import { useState, useEffect } from 'react';

const useThemeOrQueries = (itemName, initialValue) => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const localStorageItems = localStorage.getItem(itemName);
      const parsedItem = JSON.parse(localStorageItems);

      if (!parsedItem)
        localStorage.setItem(itemName, JSON.stringify(initialValue));
      else setItem(parsedItem);

      setLoading(false);
    }, 1000);
  }, []);

  const saveItem = (newItem) => {
    setItem((prevItem) =>
      Array.isArray(item) && !!newItem ? [newItem, ...prevItem] : !prevItem
    );

    const stringItem = JSON.stringify(item);
    localStorage.setItem(itemName, stringItem);
  };

  return [item, saveItem, loading];
};

export default useThemeOrQueries;
