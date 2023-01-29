/**
 * @file Main.jsx
 * @author [Claret Devigne]
 * @date [28/01/2023]
 * @description Archivo encargado de renderizar el componente "Main" y las ventanas de la shopping cart
 * o del payment.
 */

/**
 * Importa los componentes View, StatusBar, StyleSheet de la librería "react-native" para poder gestionar
 * las vistas, la barra de estado y el estilado del componente.
 */
import { View, StatusBar, StyleSheet } from 'react-native';
/**
 * Importa los componentes Options, Items, Total y Payment para ser renderizados.
 */
import Options from './components/Options';
import Items from './components/Items';
import Total from './components/Total';
import Payment from './components/Payment';
/**
 * Importa el useSelector de la librería "react-redux" para poder acceder al estado "window" y poder
 * gestionar la ventana a renderizar.
 */
import { useSelector } from 'react-redux';

export default function Main() {

  // Accede al estado window para gestionar la ventana a renderizar.
  const window = useSelector(state => state.paymentSlice.window)

  return (
    <View>
      {
        (window === 'cart') ?
          <View style={ styles.cart_container }>
            <StatusBar
            backgroundColor={'#F4F6F8'}/>
            <Options/>
            <Items/>
            <Total/>
          </View>
        :
        <View style={ styles.payment_container }>
          <StatusBar
            backgroundColor={'#1581ED'}/>
            <Payment/>
        </View>
      }
      </View>
  )
}

const styles = StyleSheet.create({
  cart_container: {
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: '100%'
  },
  payment_container: {
    backgroundColor: '#1581ED',
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: '100%'
  },
});
