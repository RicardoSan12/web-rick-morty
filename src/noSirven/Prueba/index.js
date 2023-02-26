import {getAll} from '../services/getAll';
import React, { useEffect, useState, useRef } from 'react';
import useCambiante from './useCambiante';
import './style.css';

const Prueba = () => {
  const { character, handleNextPage, personaje, busca, envio } = useCambiante();

  const [element, setElement] = useState(0);

  const rick = character.find((item) => item.id == element);

  const [show, setShow] = useState(false);

  const clase = show ? 'CardContent show-item' : 'CardContent';

  const cosa = useRef();
  // console.log(cosa.current)

  // console.log(element)
  const itemPerson = (item) => {
    // console.log(cosa.current);
  };

  return (
    <div>
      <div className={clase}>
        <div className="CardContent-info">
          {rick && <img src={rick.image} />}
        </div>
      </div>

      <form onSubmit={envio}>
        <input type="text" value={busca} onChange={personaje} />
      </form>
      <button onClick={handleNextPage}>Cambiarr pagina</button>

      <div className="ListOfCards">
        {character
          ? character.map((item) => {
              return (
                <div
                  className="ListContent"
                  key={item.id}
                  ref={cosa}
                  onClick={itemPerson}
                >
                  <img src={item.image} alt="" />
                </div>
              );
            })
          : 'no carga'}
      </div>
    </div>
  );
};

export default Prueba;

const ButtonSite = (props) => (
  <button onClick={props.btn}>Cambiarr pagina</button>
);
