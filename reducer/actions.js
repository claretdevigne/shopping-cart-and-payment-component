/**
 * @file actions.js
 * @author [Claret Devigne]
 * @date [28/01/2023]
 * @description Archivo encargado de crear e inicializar el estado global de la aplicación
 * Utiliza la librería "reduxjs/toolkit" para facilitar la creación del slice.
 */

/**
 * Importa la función "createSlice" para facilitar la creación del slice.
 */
import { createSlice } from "@reduxjs/toolkit";

/**
 * Declara la variable "initialState" con todos los estados por defecto de la aplicación.
 */
const initialState = {
  /**
   *  items
   *  @type {Array} - Un array para almacenar la lista de objetos items proveniente de la base de datos
   *  en este caso el JSON.
   *  @default - Por defecto es una lista vacía.
   *  @description - Se utiliza para almacenar el listado de items cargados en la shopping cart
   */
  items: [],
  /**
   *  subtotal
   *  @type {Number} - La suma de la propiedad "price_without_taxes" de cada elemente en "Items"
   *  @default - Por defecto está en 0.
   *  @description - Almacena la suma de todos los subtotales. Sin impuestos ni fees.
   */
  subtotal: 0,
  /**
   *  shipping_fees
   *  @type {Number} - La suma de la propiedad "shipping_fee" de cada elemente en "Items"
   *  @default - Por defecto está en 0.
   *  @description - Almacena la suma de todos los fees.
   */
  shipping_fees: 0,
  /**
   *  window
   *  @type {String} - Recibe los strings "shopping cart" o "payment"
   *  @default - Por defecto está en "shopping cart".
   *  @description - Estado para gestionar cuál ventana renderizar.
   */
  window: 'cart',
  /**
   *  removeAll
   *  @type {Boolean} - Booleano que define si fueron eliminado todos los elementos del shopping cart.
   *  @default - Por defecto está en false.
   *  @description - Estado de producción. Se utiliza para saber si la lista se encuentra vacía porque
   *  se acaba de iniciar la aplicación o porque fueron eliminados todos los elementos por el usuario.
   *  De esta forma se evitan volver a cargar todos los archivos como sucede al inicio de la app.
   */
  removeAll: false,
}

export const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState,
  reducers: {
    /**
     *  ADD_TO_CART
     *  @param {Array} payload 
     *  @return {Array}
     *  @description - Recibe un array, si el estado es igual a 0, guarda el array completo, sino
     *  guarda los datos existentes y le anexa los nuevos.
     */
    ADD_TO_CART: (state, action) => {
      if (state.items.length === 0) {
        state.items = action.payload
      } else {
        state.items = [...state.items, action.payload]
      }
    },

    /**
     *  REMOVE_FROM_CART
     *  @param {String} payload 
     *  @return {Array}
     *  @description - Recibe un string con un ID, luego filtra el estado items y devuelve la misma lista
     *  sin el elemento filtrado por ID.
     */
    REMOVE_FROM_CART: (state, action) => {
      if (state.items.length === 1) {
        state.items = state.items.filter(i => i.id !== action.payload)
        state.removeAll = true  
      } else {
        state.items = state.items.filter(i => i.id !== action.payload)
      }
    },

    /**
     *  CLEAR_CART
     *  @return {Array}
     *  @description - Guarda en el estado items un array vacío.
     */
    CLEAR_CART: state => {
      state.items = []
    },

    /**
     *  INCREASE_ITEM
     *  @param {String} payload 
     *  @description - Recibe un string ID y luego busca el objeto que contiene ese ID y le aumenta
     *  en 1 la propiedad quantity del objeto. 
     */
    INCREASE_ITEM: (state, action) => {
      let index = state.items.findIndex(i => i.id === action.payload)
      state.items[index].quantity++
    },

    /**
     *  INCREASE_ITEM
     *  @param {String} payload 
     *  @description - Recibe un string ID y luego busca el objeto que contiene ese ID, al encontrarlo
     *  disminuye su propiedad quantity en 1, pero solo si dicha propiedad es mayor a 0
     */
    DECREASE_ITEM: (state, action) => {
      let index = state.items.findIndex(i => i.id === action.payload)
      if (state.items[index].quantity > 0) {
        state.items[index].quantity--
      }
    },

    /**
     *  INCREASE_ITEM
     *  @param {String} payload 
     *  @description - Recibe un string con el subtotal y guarda en el estado subtotal dicho valor.
     */
    SET_SUBTOTAL: (state, action) => {
      state.subtotal = action.payload
    },

    /**
     *  INCREASE_ITEM
     *  @param {String} payload 
     *  @description - Recibe un string con el shipping fee y guarda en el estado shipping_fees dicho valor.
     */
    SET_SHIPPING_FEES: (state, action) => {
      state.shipping_fees = action.payload
    },

    /**
     *  INCREASE_ITEM
     *  @description - Estado de producción. Invierte el valor booleano del estado. Este estado permite
     *  volver a cargar los items luego de haber sido eliminados todos. Ya que la aplicación es una muestra
     *  sin la ventana para buscar y agregar productos.
     */
    SET_REMOVE_ALL: (state) => {
      state.removeAll = !state.removeAll
    },

    /**
     *  INCREASE_ITEM
     *  @param {String} payload 
     *  @description - Recibe un string "Cart" o "Payment" utilizado por la aplicación para gestionar
     *  cuál ventana debe renderizar.
     */
    SET_WINDOW: (state, action) => {
      state.window = action.payload
    }
  }
})

export const { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, INCREASE_ITEM, DECREASE_ITEM, SET_SUBTOTAL, SET_SHIPPING_FEES, SET_REMOVE_ALL, SET_WINDOW } = paymentSlice.actions;
export default paymentSlice.reducer;