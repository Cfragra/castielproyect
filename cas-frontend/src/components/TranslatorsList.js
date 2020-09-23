import React from 'react';
import { Link } from 'react-router-dom';
import { convertISOtoDate } from '../functions/convertISOtoDate';

export function TranslatorsList({ translators }) {
  return (
    <section className="TranslatorsList">
      <ul>
        {translators.map((translator, index) => (
          <li key={index}>
            <section className="translator-miniature">
              <div>
                <a href={`/user/${translator.user_id}`}>
                  <button id="profile" title="Ir al perfil del traductor">
                    <div className="profile-photo" id="medium-icon">
                      <img
                        src={
                          translator.user_avatar_url ||
                          require('../images/default-avatar.jpg')
                        }
                        alt=""
                        name="profile photo"
                      />
                    </div>
                    <p id="trans">{translator.user_name}</p>
                  </button>
                </a>
                <p className="creation-date">
                  {convertISOtoDate(translator.created_at)}
                </p>
              </div>

              <Link to={`/translator/${translator.translator_id}`}>
                <div id="main-content">
                  <div id="main-content-header">
                    <div id="language-category">
                      <p className="language">{translator.language}</p>
                      <p className="category">{translator.category}</p>
                    </div>
                  </div>

                  <div>
                    <div id="translator-data">
                      <h2 className="translator-name">{translator.name}</h2>
                      <p id="translator-description">
                        {translator.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
}
