import React from 'react';

export function Filters({
  categories,
  languages,
  selectedCategory,
  setSelectedCategory,
  selectedLanguage,
  setSelectedLanguage,
  updateQuery,
}) {
  return (
    <section className="filters">
      <nav>
        <section id="category">
          <p>Filtrar por categoría</p>
          <ul>
            {categories.map((cat, index) => (
              <li key={index}>
                <button
                  id={selectedCategory === index ? 'is-selected-bg' : ''}
                  onClick={() => {
                    setSelectedCategory(index);
                  }}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section id="language">
          <p>Filtrar por idioma</p>
          <ul>
            {languages.map((comp, index) => (
              <li key={index}>
                <button
                  id={selectedLanguage === index ? 'is-selected-bg' : ''}
                  onClick={() => {
                    setSelectedLanguage(index);
                  }}
                >
                  {comp}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </nav>
    </section>
  );
}
