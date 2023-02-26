import React from 'react';
import './Tags.css';
import Button from '../Button';

import useTags from '../../hooks/useTags';

const Tags = () => {
  const [tags, setTags] = useTags();

  const onCheck = (evt) => {
    let { target } = evt;
    setTags((prev) => ({ ...prev, [target.name]: !prev[target.name] }));
    console.log(tags);
  };
  // <button onClick={onCheck} name={tag}>{tag}</button>
  return (
    <div className="Tags">
      {Object.keys(tags).map((tag) => (
        <Button>{tag}</Button>
      ))}
    </div>
  );
};

export default Tags;

// pathName,
// name = '',
// type = '',
// status = '',
// species = '',
// gender = '',
// dimension = '',
// episode = ''
