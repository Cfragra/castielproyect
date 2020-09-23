import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Selects } from '../components/Selects';
import { Header } from '../components/Header';
import { getUser } from '../http/userService';
import { MyProjectsOrg } from '../components/MyProjectsOrg';
import { MyProjectsDev } from '../components/MyProjectsDev';
import { Footer } from '../components/Footer';
import CircularProgress from '@material-ui/core/CircularProgress';

export function User() {
  const userId = window.location.href.split('/')[4];
  const [user, setUser] = useState(undefined);

  const [buttonSelected, setButtonSelected] = useState(true);

  //filters
  const [selectsState, setSelectsState] = useState({
    category: '',
    language: '',
  });

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

    history.push(`/user/${userId}` + historyQuery);
  };

  useEffect(() => {
    getUser(userId).then((response) => {
      setUser(response.data);
    });
    updateQuery();
  }, [selectsState, buttonSelected]);

  if (user !== undefined) {
    console.log(userId);
    return (
      <section className="container" id="user">
        <Header isAccessWindow={false} />
        <section className="body">
          <div className="header-user">
            <section className="centered-container" id="user-container">
              <section>
                <div className="centered-container">
                  <div className="profile-photo" id="big-icon">
                    <img
                      src={
                        user.avatarUrl ||
                        require('../images/default-avatar.jpg')
                      }
                      alt=""
                      name="profile photo"
                    ></img>
                  </div>
                  <h1>
                    {user.name} {user.role === 'dev' && user.surname}
                  </h1>
                </div>
                <div className="centered-container" id="contact">
                  <h2>Contacto</h2>
                  <p>{user.contactEmail || user.email}</p>
                  {user.contactWeb !== 'NULL' && (
                    <a href={user.contactWeb}>Sitio web</a>
                  )}
                </div>
              </section>
            </section>
          </div>
          <section className="translators">
            <Selects
              isFilters={true}
              selectsState={selectsState}
              setSelectsState={setSelectsState}
            />
          </section>
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
