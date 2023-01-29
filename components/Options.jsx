/**
 * @file Options.jsx
 * @author [Claret Devigne]
 * @date [28/01/2023]
 * @description Archivo encargado de renderizar el componente "Options".
 */

/**
 * Importa los componentes Text, View, StyleSheet, TouchableOpacity, Image para renderizar las vistas,
 * textos, imagenes, touchable components y estilarlos.
 */
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

/**
 * Import los hooks useDispatch y useSelector de la librería "react-redux" para acceder y realizar cambios
 * en los estados globales 
 * */ 
import { useDispatch, useSelector } from "react-redux";

/**
 * Importa las acciones "CLEAR_CART" y "SET_REMOVE_ALL" para poder borrar toda el shopping cart y 
 * activar el estado de desarrollo "removeAll"
 */
import { CLEAR_CART, SET_REMOVE_ALL } from "../reducer/actions";

// Importa la imagen del carrito de compras.
import CAR from "../assets/car.png";

const Options = () => {

  // Hook para disparar cambios en el estado global redux.
  const dispatch = useDispatch()

  /**
   * Hook que guarda en la variable "removeAllActivated" el valor booleano del estado 
   * de desarrollo "removeAll"
   */
  const removeAllActivaded = useSelector(state => state.paymentSlice.removeAll)

  /**
   * @function handleRemoveAll
   * @description Ejecuta la acción "SET_REMOVE_ALL" y envía un payload con el valor "true" para activar 
   * el estado de producción que evita que se recarguen los items al ser eliminados, para efectos de prueba. 
   * Además ejecuta la acción "CLEAR_CART" que borra todos los elementos del shopping cart.
   */
  const handleRemoveAll = () => {
    dispatch(SET_REMOVE_ALL(true))
    dispatch(CLEAR_CART())
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.container_title_1 }>
        <Image source={ CAR } style={ styles.containerTitle1_icon }/>
        <Text style={ styles.container_title_1_title }>Order summary</Text>
      </View>{
        ( removeAllActivaded ) ?
          <View></View>
            :
          <TouchableOpacity onPress={ () => handleRemoveAll() }>
            <Text style={ styles.container_title_1_remove_all_text }>Remove all</Text>
          </TouchableOpacity>
      }
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  container_title_1: {
    display: "flex",
    flexDirection: "row"
  },
  containerTitle1_icon: {
    marginRight: 4,
    height: 20,
    width: 30
  },
  container_title_1_title: { 
    fontWeight: "600" 
  },
  container_title_1_remove_all_text: {
    color: "#8C9BAA", 
    fontWeight: "600"
  },
})

export default Options;