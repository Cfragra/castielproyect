import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import { getTranslator } from '../http/translatorService';
import { Header } from '../components/Header';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { convertISOtoDate } from '../functions/convertISOtoDate';
import CircularProgress from '@material-ui/core/CircularProgress';

const TRANS_VIEW = 2;
const OWNER_VIEW = 1;
const ONLY_READ_VIEW = 0;

export function Translator() {
  const { register, formState, handleSubmit } = useForm({
    mode: 'onBlur',
  });
  const { isAuth, jwt } = useAuth();

  const translatorId = window.location.href.split('/')[4];

  const [translator, setTranslator] = useState(undefined);

  useEffect(() => {
    getTranslator(translatorId).then((response) => {
      setTranslator(response.data);
    });
  }, []);

  useEffect(() => {
    if (translator !== undefined) {
      setTypeOfProfile(ONLY_READ_VIEW);
    } else {
      setTypeOfProfile(TRANS_VIEW);
    }
  }, [translator]);

  if (translator !== undefined) {
    return (
      <section className="container" id="translator">
        <Header isAccessWindow={false} />
        <section className="home-body">
          <section>
            <ul>
              <li>
                <Link to={`/user/${translator.user_id}`}>
                  <button>
                    <div id="small-icon" className="profile-photo">
                      <img
                        src={
                          translator.user_avatar_url ||
                          require('../images/default-avatar.jpg')
                        }
                        alt=""
                      ></img>
                    </div>
                    <p>{translator.user_name}</p>
                  </button>
                </Link>
              </li>
            </ul>
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
