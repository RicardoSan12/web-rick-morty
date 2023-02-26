import React, { useContext } from 'react';

import Card from '../../components/Card';
import LastQueries from '../../components/LastQueries';
import ListOfCards from '../../components/ListOfCards';

import {sections} from '../../utils'

const Home= () => (
<section className="home container">
  <LastQueries />
  <ListOfCards flexbox>
    {Array.from(sections, ({ name, ...card }) => 
      name !== 'home' && <Card key={name} card={...card} section={name} reverse />)}
  </ListOfCards>
</section>
); 





export default Home