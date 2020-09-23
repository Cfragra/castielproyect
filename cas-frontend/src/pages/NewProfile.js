import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Header } from '../components/Header';
import { createProfile } from '../http/translatorsService';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Footer } from '../components/Footer';
import { Selects } from '../components/Selects';

export function NewProfile() {
  const { jwt } = useAuth();

  const {
    register,
    formState,
    handleSubmit,
    setError,
    setValue,
    errors,
  } = useForm({
    mode: 'onBlur',
  });

  const history = useHistory();

  const [selectsState, setSelectsState] = useState({
    category: '',
    language: '',
  });

  const handleNewProyect = (formData) => {
    if (selectsState.category === '') {
      setSelectsState({ ...selectsState, ['category']: null });
      return;
    }

    if (selectsState.language === '') {
      setSelectsState({ ...selectsState, ['language']: null });
      return;
    }

    const fullForm = { ...formData, ...selectsState };
    return createProfile(fullForm)
      .then((response) => {
        history.push(`/my-profile/${jwt.userId}`);
      })
      .catch((error) => {
        setValue('password', '');
        setError('password', 'credentials', 'The credentials are invalid');
      });
  };

  return (
    <section className="container" id="newProfile">
      <Header isAccessWindow={false} />
      <main className="home-body">
        <section className="centered-container">
          <form onSubmit={handleSubmit((data) => handleNewProfile(data))}>
            <h1>Nuevo Perfil</h1>
            <fieldset>
              <ul>
                <li>
                  <label for="name">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    maxLength="45"
                    ref={register({
                      required: 'El nombre es obligatorio',
                    })}
                  ></input>
                  {errors.name && (
                    <span className="errorMessage">{errors.name.message}</span>
                  )}
                </li>
                <li>
                  <label for="details">Detalles</label>
                  <textarea
                    id="details"
                    name="details"
                    ref={register({
                      required: 'La descripción es obligatoria',
                    })}
                  ></textarea>
                  {errors.details && (
                    <span className="errorMessage">
                      {errors.details.message}
                    </span>
                  )}
                </li>
              </ul>
            </fieldset>
            <fieldset>
              <Selects
                isFilters={false}
                selectsState={selectsState}
                setSelectsState={setSelectsState}
              />
            </fieldset>
            <div id="submit-button-div">
              <button
                className="form"
                type="submit"
                disabled={formState.isSubmitting}
              >
                Crear perfil
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </section>
  );
}
