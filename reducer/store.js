/**
 * @file store.js
 * @author [Claret Devigne]
 * @date [28/01/2023]
 * @description Archivo encargado de configurar y exportar el store de la aplicación.
 * Utiliza la librería "reduxjs/toolkit" para facilitar la configuración del store.
 */

/**
 * Importa la función "configureStore" de la librería "reduxjs/toolkit" para facilitar la configuración
 * del store
 */
import { configureStore } from "@reduxjs/toolkit";
/**
 * Importa el slice de acciones "paymentSlice" para poder utilizarlo en la configuración del store.
 */
import paymentSlice from "./actions";

/**
 * Configura y exporta el store de la aplicación. Utiliza el slice de acciones "paymentSlice" para definir el reducer del store.
 * @type {Object}
 */
const store = configureStore({
  reducer: {
    paymentSlice: paymentSlice,
  }
})

export default store;