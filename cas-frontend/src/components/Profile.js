import React from 'react';
import { convertISOtoDate } from '../functions/convertISOtoDate';

export function Profile({ translator }) {
  return (
    <section>
      <section id="top">
        <section id="visible-info">
          <h1>{translator.name}</h1>
          <p>{translator.description}</p>
        </section>
        <section id="translator-info">
          <ul>
            <li>
              <p>Creado el {convertISOtoDate(translator.created_at)}</p>
            </li>
            <li>
              <p>Categoría: {translator.category}</p>
            </li>
            <li>
              <p>Idioma: {translator.language}</p>
            </li>
          </ul>
        </section>
      </section>
      <section id="middle">
        <h2>Descripción detallada</h2>
        <pre>{translator.details}</pre>
      </section>
    </section>
  );
}
