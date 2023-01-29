/**
 * @file Total.jsx
 * @author [Claret Devigne]
 * @date [28/01/2023]
 * @description Archivo encargado de renderizar el componente "Total".
 */

/**
 * Importa los componente Text, TouchableOpacity, View, StyleSheet de la librería
 * "react-native" para procesar las vistas, botones, textos y estilos
 */
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

/**
 * Importa los hooks useDispatch y useSelector de "react-redux" para acceder y modificar
 * el estado global de la aplicación.
 */
import { useDispatch, useSelector } from "react-redux";

// Importa la accion "SET_WINDOW" para poder acceder a la ventana de "Payment".
import { SET_WINDOW } from "../reducer/actions";

const Total = () => {

  /**
   * @function useSelector
   * @description Accede al subtotal y fees en el estado global para renderizarlos en el componente.
   */
  const subtotal = useSelector(state => state.paymentSlice.subtotal)
  const fees = useSelector(state => state.paymentSlice.shipping_fees)

  // Método que permite poder realizar cambios en el estado global.
  const dispatch = useDispatch()

  /**
   * @function handleGoToPayment
   * @description Permite ir al componente de pagos "Payment".
   */
  const handleGoToPayment = () => {
    dispatch(SET_WINDOW('payment'))
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.container_element }>
        <Text>Subtotal</Text>
        <Text>{ `$ ${subtotal}` }</Text>
      </View>
      <View style={ styles.container_element }>
        <Text>Shipping fees</Text>
        <Text>{ `$ ${ fees.toFixed(2) }` }</Text>
      </View>
      <View style={ styles.container_element }>
        <Text>Taxes</Text>
        <Text>{`$ ${ (subtotal * 0.16).toFixed(2) }`}</Text>
      </View>
      <View style={ styles.container_element }>
        <Text style={ styles.container_element_bold }>Total (including tax)</Text>
        <Text style={ styles.container_element_bold }>{`$ ${ ((subtotal * 1.16) + fees ).toFixed(2)}`}</Text>
      </View>
      <TouchableOpacity onPress={ () => handleGoToPayment() } style={ styles.container_element_touchable }>
        <Text style={ styles.container_element_touchable_button }>Go to payment</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: '#DFE6EE',
    borderTopWidth: 1 
  },
  container_element: { 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20 
  },
  container_element_bold: { 
    fontWeight: '600'
  },
  container_element_touchable: {
    display: 'flex', 
    alignItems: 'center', 
    marginTop: 20
  },
  container_element_touchable_button: { 
    backgroundColor: '#1581ED', 
    width: 200, 
    height: 50, 
    textAlign: "center", 
    textAlignVertical: 'center', 
    color: 'white', 
    borderRadius: 30 
  },


})

export default Total;