import { legacy } from '../lib.mjs';

export default {
  id: 'logaritmos', num: 10, cls: 'p10', tab: 'Logaritmos',
  title: '10. Logaritmos',
  lead: 'Definición, propiedades, cambio de base, ecuaciones y aplicaciones.',
  color: ['#9a4f07', '#fdf1e2', '#efd0a8'],
  sections: [
    legacy('log-idea', 'La idea'),
    legacy('log-prop', 'Propiedades'),
    legacy('log-err', 'Lo que NO se puede'),
    legacy('log-def', 'Por definición'),
    legacy('log-x', 'Halla x'),
    legacy('log-prop-ej', 'Reduce'),
    legacy('log-datos', 'Con datos'),
    legacy('log-desarr', 'Desarrollar'),
    legacy('log-ec', 'Ecuaciones'),
    legacy('log-apl', 'Aplicaciones'),
    legacy('log-add', 'Más ejercicios'),
  ],
};
