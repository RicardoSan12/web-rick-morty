import React from 'react';

export const getSectionContent = ({
  section,
  name,
  avatarImg,
  id,
  characters,
  episode,
  link,
}) => {
  let content = {
    title: name,
    url: avatarImg,
    href: `/${section}/card/${id}`,
    icon: section,
  };

  if (['location', 'episode'].includes(section)) {
    const randomAvatarId =
      characters.length - 1 &&
      Math.round(Math.random() * (characters.length - 1));
    content['url'] = getAvatarOrImage(characters[randomAvatarId]).image;
    // console.log({ name, len: characters.length, randomAvatarId });
  }

  switch (section) {
    case 'character':
      return { ...content, titleSection: 'personaje' };
    case 'location':
      return { ...content, titleSection: 'lugar' };
    case 'episode':
      return {
        ...content,
        title: `${name} | ${episode}`,
        titleSection: 'episodio',
      };
    case 'home':
      return { ...content, href: link, icon: link?.slice(1) };
    default:
      return `Error no hay contenido en ${section}}`;
  }
};

const Cardaa = ({ card = {}, section, reverse }) => {
  const {
    id,
    name,
    image,
    residents = [],
    characters = [],
    episode,
    href: link,
  } = card;

  const { title, href, url, titleSection, icon } = getSectionContent({
    section,
    name,
    avatarImg: image,
    id,
    characters: characters.length ? characters : residents,
    episode,
    link,
  });

  const reverseStyle = reverse ? 'card--reverse' : '';

  return (
    <Link to={href} className={`card ${reverseStyle}`}>
      {url && <img src={url} alt={title} className="card__image" />}
      <h3 className="card__title">
        <div className="con">
          <Icon path={icon} />
        </div>
        {titleSection ? `${titleSection}: ` : ''}
        {title}
      </h3>
    </Link>
  );
};