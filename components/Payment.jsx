/**
 * @file Payment.jsx
 * @author [Claret Devigne]
 * @date [28/01/2023]
 * @description Archivo encargado de renderizar el componente "Payments".
 */

/**
 * Importa el hook useState para gestionar el estado interno del componente.
 */
import { useState } from 'react'

/**
 * Importa los componentes Text, View, StyleSheet, TouchableOpacity, Alert, ScrollView e Image 
 * para renderizar las vistas, textos, touchable components, alertas, vistas de scroll 
 * y estilar dichos elementos.
 */
import { View, Text, TouchableOpacity, Alert, TextInput, ScrollView, StyleSheet } from 'react-native'

/**
 * Importa el hook useDispatch para realizar cambios en el estado global.
 */
import { useDispatch } from 'react-redux'

// Action que permite volver a la shopping cart.
import { SET_WINDOW } from '../reducer/actions'

export default function Payment() {

  /**
   * @function dispatch
   * @description Permite generar cambios en el estado global.
   */
  const dispatch = useDispatch()

  /**
   * @function useState
   * @param {String} - Un string vacío
   * @returns {Array} Retorna un array con dos elementos: el estado actual y la función para actualizarlo.
   * Gestionan los datos ingresados por medio de los inputs.
   */
  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [lastDigits, setLastDigits] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  /**
   * @function useState
   * @param {String} - Un string vacío
   * @returns {Array} Retorna un array con dos elementos: el estado actual y la función para actualizarlo.
   * Gestiona el nombre de la compañía que provee la tarjeta de crédito.
   */
  const [cardCompany, setCardCompany] = useState('CARD')

  /**
   * @function handleMakePayment
   * @description Verificar que los campos estén llenos correctamente, y si es así procesar
   * la ventana de pago.
   */
  const handleMakePayment = () => {
    // Verifica que los campos estén correctos y muestra la alerta de error en caso contrario.
    if (name.length === 0 || cardNumber.length !== 19 || expiryDate.length !== 5 || cvv.length !== 3) {
      Alert.alert('Error', 'Please complete all fields correctly!')
      // Muestra la pantalla de pago exitoso.
    } else {
      Alert.alert('Succesful payment', 'Thank you for making your payment.')
      handleCancel()
    }
  }

  /**
   * @function handleCancel
   * @description Borra el valor en todos los inputs.
   */
  const handleCancel = () => {
    setName('')
    setCardNumber('')
    setExpiryDate('')
    setCvv('')
  }

  /**
   * @function handleCardNumber
   * @param {String} text
   * @description Gestiona los datos ingresados en el input del número de la tarjeta.
   */
  const handleCardNumber = text => {
    // Verifica que solo sean ingresados números impidiendo el ingreso de letras.
    const validator = /^[a-zA-Z]$/
    let isValid = true
    let value = text.split(' ')

    value.map(i => {
      i.split('').map(j => {
        if (validator.test(j)) {
          isValid = false
        }
      })
    })

    // Extrae los primeros 4 dígitos y genera un estado con el nombre de la compañía emisora de la tarjeta.
    let subs = +text.substring(0, 4)
    // Caso Visa
    if (subs >= 4000 && subs < 5000) {
      setCardCompany('VISA')
    // Caso MasterCard
    } else if ( subs >= 5000 && subs < 6000) {
      setCardCompany('MASTERCARD')
    // Caso American Express
    } else if ( (subs >= 3400 && subs < 3500) || (subs >= 3700 && subs < 3800)) {
      setCardCompany('AMERICAN EXPRESS')
    // Caso Default
    } else {
      setCardCompany('CARD')
    }

    // Verifica que los datos sean válidos y agrega un espacio vacío por cada 4 dígitos.
    if ( isValid === false ) {
      Alert.alert('Error', 'Ingrese los datos correctamente')
    } else if (text.length > 14 && text[4] === ' ' && text[9] === ' ' && text[14] !== ' ') {
      setCardNumber(`${text.substring(0, 4)} ${text.substring(5, 9)} ${text.substring(10, 14)} ${text.substring(14, text.length)}`)
    } else if (text.length > 9 && text.length < 14 && text[4] === ' ' && text[9] !== ' ') {
      setCardNumber(`${text.substring(0, 4)} ${text.substring(5, 9)} ${text.substring(9, text.length)}`)
    } else if (text.length > 4 && text[4] !== ' ') {
      setCardNumber(`${text.substring(0, 4)} ${text.substring(4, text.length)}`)
    } else {
      setCardNumber(text)
      setLastDigits(text.substring(15, text.length))
    }
  }

  /**
   * @function handleExpiryDate
   * @param {String} text 
   * @description Gestiona el input de fecha de expiración.
   */
  const handleExpiryDate = text => {
    const validator = /^[a-zA-Z]$/
    
    // Valida que la fecha sea introducida en el formato correcto y no esté vencida
    if (validator.test(text[0]) || validator.test(text[1]) || validator.test(text[3]) || validator.test(text[4])) {
      Alert.alert("Error", "Ingrese una fecha válida")
    } else if ( text.length === 5 && +text.substring(3, 5) < 23) {
      Alert.alert("Error", "La tarjeta está vencida")
    } else if (text.length > 3 && text[2] === '/') {
      setExpiryDate(text)
    } else if (text.length === 2) {
      setExpiryDate(text + '/')
    } else {
      setExpiryDate(text)
    }
  }

  /**
   * @function handleCvv
   * @param {String} text 
   * @description Gestiona el input CVV y verifica que el código introducido sea válido.
   */
  
  const handleCvv = text => {
    const validator = /^[a-zA-Z]$/

    if (validator.test(text[0]) || validator.test(text[1]) || validator.test(text[2])) {
      Alert.alert("Error", "Ingrese un código CVV válido")
    } else {
      setCvv(text)
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled' style={ styles.payment_container }>
      <TouchableOpacity onPress={() => dispatch(SET_WINDOW('cart'))}>
        <Text style={ styles.payment_container_back_option }>{'< Go back to cart'}</Text>
      </TouchableOpacity>
      <View>
        <Text style={ styles.payment_container_main_title }>Current credit card</Text>
        <View style={ styles.payment_container_card_container }>
          <Text style={ styles.payment_container_card_container_card_company }>{ cardCompany }</Text>
          <Text style={ styles.payment_container_card_container_card_number }>{(cardNumber.length === 0) ? '****  ****  ****  4321' : `****  ****  **** ${lastDigits}`}</Text>
          <Text style={ styles.payment_container_card_container_card_holder }>{ (name.length === 0) ? 'Your name' : name }</Text>
        </View>
        <Text style={ styles.payment_container_titles }>Name of card holder</Text>
        <TextInput 
          maxLength={50}
          value={name}
          onChangeText={text => setName(text)}
          autoFocus 
          style={ styles.payment_container_card_holder_input }
          />
        <Text style={ styles.payment_container_titles }>Credit card number</Text>
        <View  style={ styles.payment_container_card_number_container }>
        <TextInput 
          maxLength={19}
          value={cardNumber}
          onChangeText={text => handleCardNumber(text)}
          style={ styles.payment_container_card_number_container_input } placeholder='1234  1234  1234  1234'
          />
        <View style={ styles.payment_container_card_number_container_card_company_container }>
          <Text style={ styles.payment_container_card_number_container_card_company_container_name }>{ cardCompany }</Text>
        </View>
        </View>
        <View style={ styles.payment_container_expiration_cvv_container }>
          <View style={ styles.payment_container_expiration_cvv_container_expiration }>
            <Text style={ styles.payment_container_expiration_cvv_container_containers_titles }>Expiration</Text>
            <TextInput
              maxLength={5}
              value={expiryDate}
              onChangeText={text => handleExpiryDate(text)}
              style={ styles.payment_container_expiration_cvv_container_containers_inputs }
              />
          </View>
          <View style={ styles.payment_container_expiration_cvv_container_cvv }>
            <Text style={ styles.payment_container_expiration_cvv_container_containers_titles }>CVV</Text>
            <TextInput
              secureTextEntry={true}
              maxLength={3}
              value={cvv}
              onChangeText={(text => handleCvv(text))}
              style={ styles.payment_container_expiration_cvv_container_containers_inputs }
              />
          </View>
        </View>
      </View>
      <View style={ styles.payment_container_buttons_container }>
        <TouchableOpacity onPress={() => handleMakePayment()} style={ styles.payment_container_buttons_container_payment_button }>
          <Text style={ styles.payment_container_buttons_container_payment_button_text }>Make Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCancel()} style={ styles.payment_container_buttons_container_cancel_button }>
          <Text style={ styles.payment_container_buttons_container_cancel_button_text }>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  payment_container: { 
    height: '100%' 
  },
  payment_container_back_option: { 
    color: 'white', 
    marginBottom: 40 
  },
  payment_container_main_title: { 
    color: 'white', 
    fontWeight: '600', 
    marginVertical: 15 
  },
  payment_container_card_container: { 
    backgroundColor: '#3D93EA', 
    borderColor: '#55A0ED', 
    borderWidth: 2, 
    width: 300, 
    height: 200, 
    borderRadius: 10, 
    padding: 20, 
    display: 'flex', 
    alignItems: 'flex-start' 
  },
  payment_container_card_container_card_company: {
    color: '#3D93EA', 
    backgroundColor: 'white', 
    borderRadius: 10, 
    padding: 10, 
    display: 'flex', 
    fontWeight: '600'
  },
  payment_container_card_container_card_number: { 
    color: '#97C8F9', 
    fontWeight: '600', 
    marginTop: 60, 
    marginBottom: 10 
  },
  payment_container_card_container_card_holder: { 
    color: '#97C8F9', 
    fontWeight: '600', 
    marginVertical: 10 
  },
  payment_container_titles: { 
    color: 'white', 
    fontWeight: '600', 
    marginVertical: 15 
  },
  payment_container_card_holder_input: { 
    backgroundColor: '#126CC7', 
    height: 40, 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    color: 'white', 
    fontWeight: '600'
  },
  payment_container_card_number_container: { 
    backgroundColor: '#3D93EA', 
    borderColor: '#55A0ED', 
    borderWidth: 1, 
    height: 50, 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  payment_container_card_number_container_input: { 
    color: 'white', 
    fontWeight: '600', 
    width: '50%' 
  },
  payment_container_card_number_container_card_company_container: { 
    backgroundColor: '#71B8FF', 
    height: 40, 
    borderRadius: 10, 
    padding: 10 
  },
  payment_container_card_number_container_card_company_container_name: { 
    color: 'white', 
    fontWeight: '600'
  },
  payment_container_expiration_cvv_container: { 
    display: 'flex', 
    flexDirection: 'row' 
  },
  payment_container_expiration_cvv_container_expiration: { 
    flex: 1, 
    marginRight: 20 
  },
  payment_container_expiration_cvv_container_cvv: { 
    flex: 1, 
  },
  payment_container_expiration_cvv_container_containers_titles: { 
    color: 'white', 
    fontWeight: '600', 
    marginVertical: 15
  },
  payment_container_expiration_cvv_container_containers_inputs: { 
    backgroundColor: '#126CC7',
    width: '100%', 
    height: 40, 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    color: 'white', 
    fontWeight: '600'
  },
  payment_container_buttons_container: { 
    display: 'flex', 
    flexDirection: 'row', 
    marginTop: 30 
  },
  payment_container_buttons_container_payment_button: { 
    flex: 1, 
    marginRight: 20 
  },
  payment_container_buttons_container_payment_button_text: { 
    backgroundColor: 'white', 
    color: '#1581ED', 
    height: 40, 
    fontWeight: '800', 
    textAlign: 'center', 
    textAlignVertical: 'center', 
    borderRadius: 10 
  },
  payment_container_buttons_container_cancel_button: {
    flex: 1 
  },
  payment_container_buttons_container_cancel_button_text: { 
    backgroundColor: '#1581ED', 
    color: 'white', 
    borderColor: 'white', 
    borderWidth: 3, 
    height: 40, 
    fontWeight: '600', 
    textAlign: 'center', 
    textAlignVertical: 'center', 
    borderRadius: 10 
  },
})
