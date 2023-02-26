import { useState } from 'react';

const useTheme = () => {
  const localStorageTheme = JSON.parse(localStorage.getItem('tema'));
  const [theme, setTheme] = useState(!localStorageTheme);

  const changeTheme = () => {
    setTheme((prev) => !prev);
    localStorage.setItem('theme', theme);
  };

  return [theme, changeTheme];
};

export default useTheme;
