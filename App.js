/**
 * @file App.js
 * @author [Claret Devigne]
 * @date [28/01/2023]
 * @description Archivo encargado de renderizar el componente "App" que es el punto de entrada de
 * la aplicación.
 * Importa el componente "Provider" de la librería "react-redux" y el store para poder distruibuir
 * el estado global de la aplicación a todos los componentes hijos.
 * Importa el componente Main y lo renderiza.
 */

import { Provider } from 'react-redux';
import store from './reducer/store';
import Main from './Main';
 
export default function App() {

  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}
