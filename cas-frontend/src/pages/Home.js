import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Header } from '../components/Header';
import { Selects } from '../components/Selects';
import { TranslatorsList } from '../components/TranslatorsList';

import { getHomeTranslators } from '../http/homeService';
import { Footer } from '../components/Footer';

import CircularProgress from '@material-ui/core/CircularProgress';

const MOST_RECENT_BUTTON = true;
const AZ_BUTTON = false;

export function Home() {
  const [selectsState, setselectsState] = useState({
    category: '',
    language: '',
  });

  const [translators, setTranslators] = useState(undefined);

  const [buttonSelected, setButtonSelected] = useState(MOST_RECENT_BUTTON);

  const history = useHistory();

  let historyQuery = '';
  const updateQuery = () => {
    console.log(selectsState);
    if (selectsState.category !== '') {
      historyQuery += `/?category=${selectsState.category}`;
    }

    if (selectsState.language !== '') {
      historyQuery += `/?language=${selectsState.language}`;
    }

    history.push(historyQuery);
  };

  useEffect(() => {
    updateQuery();
    getHomeTranslators(historyQuery).then((response) =>
      setTranslators(response.data)
    );
  }, [selectsState, buttonSelected]);

  if (translators !== undefined) {
    console.log(translators);
    return (
      <section className="container" id="home">
        <Header isAccessWindow={false} />
        <section className="home-body">
          <section className="home-image">
            <p className="first">
              Únase ya a Castiel Traducciones, el portal en el que ampliará su
              red de traductores.
            </p>
            <p className="second">
              Regístrese y publicite sus servicios o póngase en contacto con
              otros traductores.
            </p>
          </section>
          <main className="translators">
            <Selects
              isFilters={true}
              selectsState={selectsState}
              setSelectsState={setselectsState}
            />
            <section className="translators-container">
              <section className="selectors">
                <button
                  id={
                    buttonSelected === MOST_RECENT_BUTTON
                      ? 'is-selected-line'
                      : ''
                  }
                  onClick={() => {
                    setButtonSelected(MOST_RECENT_BUTTON);
                  }}
                >
                  Más recientes
                </button>
                <button
                  id={buttonSelected === AZ_BUTTON ? 'is-selected-line' : ''}
                  onClick={() => {
                    setButtonSelected(AZ_BUTTON);
                  }}
                >
                  Orden alfabético
                </button>
              </section>
              <TranslatorsList
                translators={
                  buttonSelected === MOST_RECENT_BUTTON
                    ? translators
                    : sortByAZ(translators)
                }
              />
            </section>
          </main>
        </section>
        <Footer />
      </section>
    );
  } else {
    return (
      <div className="centered-container" id="spinner">
        <CircularProgress size={'4rem'} />
      </div>
    );
  }
}

function sortByAZ(translators) {
  return translators.sort();
}
