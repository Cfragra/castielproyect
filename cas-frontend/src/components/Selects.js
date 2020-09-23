import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '11rem',
    marginTop: theme.spacing(3),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const categories = [
  'Arquitectura',
  'Farmacia',
  'Finanzas',
  'General',
  'Legal',
  'Mecánica',
  'Medicina',
  'Viajes',
];

const languages = [
  'Alemán',
  'Chino',
  'Coreano',
  'Español',
  'Francés',
  'Inglés',
  'Italiano',
  'Japonés',
  'Portugués',
  'Sueco',
];

export function Selects({ isFilters, selectsState, setSelectsState }) {
  const classes = useStyles();

  const handleChange = (name) => (event) => {
    setSelectsState({
      ...selectsState,
      [name]: event.target.value,
    });
  };

  return (
    <section className={isFilters ? 'filters' : 'selects'}>
      {isFilters && <h2>Filtrar traductores por</h2>}
      <section>
        <FormControl className={classes.formControl}>
          <InputLabel id="category" htmlFor="category-native-helper">
            Categoría
          </InputLabel>
          <Select
            labelId="category"
            value={selectsState.category}
            onChange={handleChange('category')}
          >
            {isFilters && <MenuItem value={''}>Todas</MenuItem>}
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
          {isFilters && (
            <FormHelperText>Selecciona una categoría</FormHelperText>
          )}
          {selectsState.category === null && (
            <FormHelperText error>La categoría es obligatoria</FormHelperText>
          )}
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="language" htmlFor="language-native-helper">
            Idioma
          </InputLabel>
          <Select
            labelId="language"
            value={selectsState.language}
            onChange={handleChange('language')}
          >
            {isFilters && <MenuItem value={''}>Todos</MenuItem>}
            {languages.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
          {isFilters && <FormHelperText>Selecciona un idioma</FormHelperText>}
          {selectsState.language === null && (
            <FormHelperText error>El idioma es obligatorio</FormHelperText>
          )}
        </FormControl>
      </section>
    </section>
  );
}
