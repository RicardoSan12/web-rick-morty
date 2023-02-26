import { useState, useEffect } from 'react';
import { getAvatarOrImage } from '../../utils';

const extractDataCard = ({ card, section = 'home' }) => {
  let { id, name, image, residents = [], characters = [], episode, sectionName: title, url } = card;

  if (id) {
    title = `${episode?.padEnd ? `${episode} | ` : ''}${name}`;
    url = `/${section}/card/${id}`;

    if (['location', 'episode'].includes(section)) {
      const avatars = characters?.length ? characters : residents;
      const randomAvatarId =
        avatars.length - 1 && Math.round(Math.random() * (avatars.length - 1));
      image = getAvatarOrImage(avatars[randomAvatarId]).image;
    }
  }
  return { iconType: section, url, title, image };
};

export const useExtractCard = ({ card, section }) => {
  const [state, setState] = useState({ iconType: '', image: '', title: '', url: '' });
  useEffect(() => {
    setState(extractDataCard({ card, section }));
  }, []);
  return { ...state };
};
