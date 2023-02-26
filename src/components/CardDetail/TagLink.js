import React from 'react';

import Icon from '../Icon';
import Button from '../Button';

const TagLink = ({ id, image, section }) => {  
  const isSectionCharacter = section === 'character'
  let typeIcon = 'character', typeIconClassName = 'card-detail__icon', classname = 'ring', content = <img src={image} />
  
  if (isSectionCharacter){
    typeIcon = 'episode'
    typeIconClassName = ''
    classname = ''
    content = id
  }  
  const pathName = `/${typeIcon}/card/${id}`

  return (
    <li className={`card-detail__item ${classname}`}>
      <Button href={pathName}>
        <Icon path={typeIcon} size={25} classname={typeIconClassName} />
        {content}
      </Button>
    </li>
  )
}
export default TagLink


