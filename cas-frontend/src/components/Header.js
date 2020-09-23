import React, { useState } from 'react';
import { Search } from './Search';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useMatchMedia } from '../hooks/useMatchMedia';

export function Header({ isAccessWindow }) {
  const isMobile = useMatchMedia('(max-width:630px)');

  const [searchResults, setSearchResults] = useState(undefined);

  const { jwt, isAuth } = useAuth();

  return (
    <header>
      <section className={isAccessWindow ? 'access-header' : 'main-header'}>
        <section className="header">
          <div>
            <a href="/">
              <button
                id={isAccessWindow ? 'logo-access' : 'logo-home'}
                aria-label="Castiel Traducciones. Click para ir a inicio."
              ></button>
            </a>

            {!isAccessWindow && !isMobile && (
              <Search
                onSearch={(results) => setSearchResults(results)}
                onEmpty={(value) => {
                  if (value === '') {
                    setSearchResults(undefined);
                  }
                }}
              />
            )}
          </div>

          {!isAccessWindow && isAuth && (
            <nav role="navigation">
              <ul className="nav-row">
                <li>
                  <Link to="/my-profile">
                    <button id="my-profile" title="Ir a mi perfil">
                      Mi perfil
                    </button>
                  </Link>
                </li>
                <li>
                  <p className="separator">|</p>
                </li>

                <li>
                  <button
                    id="logout"
                    title="Click para cerrar sesión"
                    onClick={() => {
                      localStorage.removeItem('currentUser');
                      window.location.href = '/';
                    }}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </nav>
          )}
          {!isAccessWindow && !isAuth && (
            <div>
              <Link to="/access">
                <button className="gray" id="access-button" renderAs="button">
                  Accede o regístrate
                </button>
              </Link>
            </div>
          )}
        </section>
        {!isAccessWindow && isMobile && (
          <section className="search-bar-mobile">
            <Search
              onSearch={(results) => setSearchResults(results)}
              onEmpty={(value) => {
                if (value === '') {
                  setSearchResults(undefined);
                }
              }}
            />
          </section>
        )}
      </section>
      {searchResults !== undefined && (
        <section className="search-results">
          {Object.keys(searchResults).length !== 0 && (
            <section>
              <section id="users-results">
                <p>Traductores</p>
                <ul>
                  {searchResults['users'].map((user, index) => (
                    <li key={index}>
                      <a href={`/user/${user.user_id}`} key={index}>
                        <button id="search-result">
                          <div id="small-icon" className="profile-photo">
                            <img
                              src={
                                user.avatar_url ||
                                require('../images/default-avatar.jpg')
                              }
                              alt=""
                            />
                          </div>
                          <p>
                            {user.name} {user.role === 'dev' && user.surname}
                          </p>
                        </button>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </section>
          )}
          {Object.keys(searchResults).length === 0 && (
            <p className="centered-container">
              No se encontró ningún resultado
            </p>
          )}
        </section>
      )}
    </header>
  );
}
