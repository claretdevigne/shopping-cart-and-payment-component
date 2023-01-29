/**
 * @file Items.jsx
 * @author [Claret Devigne]
 * @date [28/01/2023]
 * @description Archivo encargado de renderizar el componente "Items" que muestra el listado de items
 * cargados a la shopping cart.
 */

// Importa el hook "useEffect" para gestionar el ciclo de vida del componente y cargar los archivos
// necesarios.
import { useEffect } from "react";

/**
 * Importa los componentes FlatList, Text, View, StyleSheet, TouchableOpacity e Image de la librería
 * "react-native" para gestionar las vistas, el listado de items, textos, estilos, touchable elements e
 * imagenes.
 */
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

/**
 * Importa los hooks "useDispatch" y "useSelector" de la librería "react-redux" para poder acceder y modificar
 * los valores en el estado global de la aplicación.
 */
import { useDispatch, useSelector } from "react-redux";

/**
 * Importa el JSON contenido en el archivo DATA.JSON para simular la obtención de datos desde un servidor y
 * gestionarlos.
 */
import data from '../database/data.json';

/**
 * Importa las imagenes "TRASH" y "BIGCART" para ser utilizadas en la aplicación.
 */
import TRASH from '../assets/trash.png';
import BIGCART from '../assets/BigCart.png';

/**
 * Importa las acciones "ADD_TO_CART", "INCREASE_ITEM", "DECREASE_ITEM", "REMOVE_FROM_CART", "SET_SUBTOTAL",
 * "SET_SHIPPING_FEES", "SET_REMOVE_ALL" para cambiar los estados globales de la aplicación.
 */
import { ADD_TO_CART, INCREASE_ITEM, DECREASE_ITEM, REMOVE_FROM_CART, SET_SUBTOTAL, SET_SHIPPING_FEES, SET_REMOVE_ALL } from "../reducer/actions";

const Items = () => {

  /**
   * @function dispatch
   * @description Instancia el hook dispatch para poder disparar cambios en los estados globales.
   */
  const dispatch = useDispatch()

  /**
   * @function reduxState
   * @returns {Object} - Con el estado global de la aplicación.
   * @description - Permite acceder a los valores del estado global de la aplicación.
   */
  const reduxState = useSelector(state => state.paymentSlice)

  /**
   * @function handleIncrease
   * @param {String} id - ID del item desde el cuál se ejecuta la función.
   * @description ejecuta un dispatch para incrementar la cantidad de productos a comprar de un item espécifico.
   */
  const handleIncrease = (id) => {
    dispatch(INCREASE_ITEM(id))
  }


  /**
   * @function handleDecrease
   * @param {String} id - ID del item desde el cuál se ejecuta la función.
   * @description ejecuta un dispatch para reducir la cantidad de productos a comprar de un item espécifico.
   */
  const handleDecrease = (id) => {
    /**
     * @var {number} index - Variable en la que se asigna el indice del objeto que representa al producto en el array "items" del
     * estado global. 
     * */ 
    let index = reduxState.items.findIndex(i => i.id === id)

    /**
     * Verificar si la propiedad "quantity" del objeto escantidad es igual a 1
     */
    if (reduxState.items[index].quantity === 1) {
      // Elimina el item al llegar a "quantity": 0
      dispatch(REMOVE_FROM_CART(id))
    } else {
      // Disminuye la propiedad "quantity" en 1
      dispatch(DECREASE_ITEM(id))
    }
  }

  /**
   * @function handleDeleteItem
   * @param {String} id 
   * @description Ejecuta un dispatch que elimina el item seleccionado del shopping cart. 
   */
  const handleDeleteItem = (id) => {
    dispatch(REMOVE_FROM_CART(id))
  }

  /**
   * @function handleSubtotalAndFees
   * @description Suma el subtotal y el valor de los shipping fees de todos los articulos en la lista.
   */
  const handleSubtotalAndFees = () => {
    /**
     * @var {number} subtotal - Contador para sumar el subtotal
     */
    let subtotal = 0

    /**
     * @var {number} fees - Contador para sumar los fees 
     */
    let fees = 0

    /**
     * Itera todos los elementos de la "reduxState.items" y va aumentando los contadores.
     */
    reduxState.items.map(i => {
      // Suma el resultado de multiplicar el precio sin impuestos por la cantidad de items seleccionados al contador "subtotal"
      subtotal += (i.price_without_tax * i.quantity)
      // Evita que el shipping fee se sume solo si el item se encuentra agregado a la lista.
      if (i.quantity > 0) {
        fees += i.shipping_fee
      }
    })
    /**
     * Establece la suma en el contador subtotal como el nuevo estado "subtotal" y lo límita a 2 decimales.
     */
    dispatch(SET_SUBTOTAL(subtotal.toFixed(2)))
    /**
     * Establece la suma en el contador fees como el nuevo estado "shipping_fees".
     */
    dispatch(SET_SHIPPING_FEES(fees))
  }

  /**
   * @function handleShowAll
   * @description Funcion de DESARROLLO. Recarga la lista de objetos guardada en el archivo JSON al utilizar el botón
   * "Start to buy". Debido a que no existe un componente que permita agregar items por motivo de prueba.
   */
  const handleShowAll = () => {
    dispatch(SET_REMOVE_ALL())
  }

  /**
   * @hook
   * @description Gestiona el ciclo de vida de la aplicación y como se cargan los archivos en ella.
   */
  // 
  useEffect(() => {
    // Verificar si la propiedad items del estado redux está vacía y además el estado de desarrollo es falso
    if (reduxState.items.length === 0 && reduxState.removeAll === false) {
      // Simula la latencia creada por un servidor.
      setTimeout(() => {
        dispatch(ADD_TO_CART(data.items))
      }, 1000)
      // Si la propiedad items del estado reduxState tiene algún elemento procede a ejecutar la función que 
      // Realiza la suma del subtotal y los fees
    } else if (reduxState.items.length > 0) {
      handleSubtotalAndFees()
    }
  }, [reduxState])

  return (
    // Vista que se renderiza si la lista del shopping cart está vacía
    (reduxState.items.length === 0) ? 
    <View style={ styles.item_container_no_items }>
      <Image source={BIGCART} style={ styles.item_container_no_items_cart_icon } />
      <Text style={ styles.item_container_no_items_title }>You have no items in your shopping cart</Text>
      <Text>Fill it with your favorites items</Text>
      <Text>It's time to buy!</Text>
      <TouchableOpacity onPress={ () => handleShowAll() }>
        <Text style={ styles.item_container_no_items_button }>Start to buy</Text>
      </TouchableOpacity>
    </View>
    :
    // Lista de items que se renderiza si hay elementos en el shopping cart
    <FlatList
      style={{ marginTop: 30 }}
      data={reduxState.items}
      renderItem={({item}) => (
        <View style={styles.item_container}>
          <View style={styles.item_container_left}>
            <Image source={{ uri: `${item.url}` }} style={styles.item_container_left_image} />
            <View>
              <Text style={styles.item_container_left_item_name}>{ item.item_name }</Text>
              <Text style={styles.item_container_left_short_description}>{ item.short_description }</Text>
            </View>
          </View>

          <View style={ styles.item_container_right }>
            <View style={ styles.item_container_right_top }>
                <Text style={ styles.item_container_right_top_price }>{`$${ (item.price_without_tax * item.quantity).toFixed(2) }`}</Text>
                <TouchableOpacity onPress={ () => handleDeleteItem(item.id) } >
                  <Image source={TRASH} style={ styles.item_container_right_top_trash_icon }/>
                </TouchableOpacity>
            </View>
            <View style={ styles.item_container_right_bottom }>
              <TouchableOpacity>
                <Text onPress={() => handleDecrease(item.id) } style={ styles.item_container_right_bottom_icon }>-</Text>  
              </TouchableOpacity>
              <Text>{ item.quantity }</Text>
              <TouchableOpacity>
                <Text onPress={() => handleIncrease(item.id) } style={styles.item_container_right_bottom_icon}>+</Text>  
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  item_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    alignItems: 'center'
  },
  item_container_left: { 
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '30%' 
  },
  item_container_left_image: { 
    width: 60,
    height: 60, 
    borderRadius: 20, 
    marginRight: 10 
  },
  item_container_left_item_name: {
    fontWeight: '600'
  },
  item_container_left_short_description: { 
    color: '#BCBCBC', 
    fontSize: 14
  }, 
  item_container_right: { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'flex-end', 
    marginLeft: "25%"
  },
  item_container_right_top: { 
    display: 'flex', 
    flexDirection: "row", 
    marginBottom: 10, 
    alignItems: 'center' 
  }, 
  item_container_right_top_price: { 
    marginHorizontal: 8, 
    fontSize: 20 
  },
  item_container_right_top_trash_icon: { 
    width: 20, 
    height: 20 
  },  
  item_container_right_bottom: { 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end'
  },
  item_container_right_bottom_icon: { 
    backgroundColor: '#DFE8F2', 
    width: 25, 
    height: 25, 
    borderRadius: 20, 
    textAlign: 'center', 
    textAlignVertical: 'center', 
    marginRight: 8,
    marginLeft: 8 
  },
  item_container_no_items: { 
    height: "100%", 
    display: 'flex', 
    alignItems: 'center', 
    marginTop: '40%' 
  },
  item_container_no_items_cart_icon: { 
    width: 200,
    height: 200 
  },
  item_container_no_items_title: { 
    fontSize: 22, 
    textAlign: 'center' 
  },
  item_container_no_items_button: { 
    backgroundColor: '#1881ED', 
    color: 'white', 
    width: 150, 
    height: 40, 
    textAlign: 'center', 
    textAlignVertical: 'center', 
    borderRadius: 20, 
    marginTop: 15 
  },
})

export default Items;