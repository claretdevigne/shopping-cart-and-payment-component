# Shopping Cart & Payment Component
## Prueba Técnica
Este proyecto fue desarrollado para la prueba técnica. El objetivo del proyecto es crear una aplicación de carritos de compra o una de procesamiento de pagos.
En este caso se procedió a realizar las dos en un solo archivo.

## Características
- Se utilizó React Native para el desarrollo de la aplicación.
- Se utilizó Redux para gestionar el estado global de la aplicación.
- Se utilizó useState para gestionar estados locales en los componentes.
- Se utilizó useEffect para gestionar el ciclo de vida de los componentes.
- No se utilizó una API para los datos, se utilizó un archivo JSON cargado en la carpeta del proyecto, como se especificaba en las reglas de la prueba técnica.
- La UI/UX se basó en el diseño proporcionado, aunque se hicieron pequeñas modificaciones para mejorar la experiencia de usuario.
- Se agregaron algunos botones adicionales en la ventana de "Carrito de compras" y en la de "Payment.

### Características "Shopping Cart"
- Aparece la ventana de Shopping Cart
- Los articulos tardan 1 segundo en cargarse para simular un servidor.
- Aparece un listado con 8 artículos ya preestablecidos que se obtienen de un JSON.
- Todos los artículo aparecen con 1 ítem seleccionado.
- Se puede aumentar la cantidad de artículos.
- Se puede disminuir la cantidad de artículo.
- Si un articulo llega a 0, es eliminado del carrito.
- Al tocar el icono del basurero se elimina el artículo.
- El botón "Remove all" remueve todos los artículos. 
- En la parte inferior aparecen todos los datos de subtotal, fees, tales y total. Se suman automáticamente.
- El botón "Go to Payment" fue añadido para continuar con la aplicación. 
- La disposición de los elementos fue cambiado un poco para mejorar la experiencia del usuario.

### Características "Payment Component"
- Contiene un diseño que simula una tarjeta en la parte superior.
- Contiene 4 inputs para ingresar los datos.

#### Input de Nombre del tarjetahabiente
- Al ingresar los datos del nombre, automáticamente se modifica el nombre en el diseño superior.

#### Input del número de tarjeta
- Al ingresar el número de tarjeta aparece el emisor de la tarjeta (Visa, Mastercard, etc)
- Solo se utilizarón los siguientes datos para la verificación emisor de tarjeta:
-- Números que inician del 4000 al 4999 pertenecen a Visa.
-- Números del 5000 a 5999 son Mastercard
-- Números en el rango de 3700 a 3799 son American Express.
-- Los demás números se dejaron como CARD, podrían utilizarse como tarjeta no válida. Pero se dejó de esta manera para poder probar la app con cualquier número. 
- Si se agregan letras al input muestra un mensaje de error.
- Si los 16 dígitos no están completos no permitirá el pago.

#### Input Fecha de Vencimiento
- Impide que se agreguen letras al input.
- verifica que la tarjeta no esté vencida.
- Se creó para verificar usando el mes de enero 2023, si esto es visto en febrero tal vez no marque vencida una tarjeta de enero.

#### Input CVV
- Verifica que solo sean ingresados datos válidos. 
- Oculta automáticamente el CVV

#### Botón Cancel
- Limpia todos los campos del formulario.

#### Botón Make Payment:
- Verifica que todos los datos estén correctos.
- Genera un error si los datos no son correctos.
- Muestra un aviso de gracias por su compra, si los datos está perfectos.

## Instrucciones de ejecución
Para ejecutar este proyecto usando Expo, siga estos pasos:

- Asegúrese de tener Expo instalado en su computadora. Si no lo tiene, puede instalarlo con el comando npm install expo-cli.
- Acceda a la carpeta del proyecto en la terminal.
- Ejecute el comando npm start.
- Abra la aplicación Expo Client en su dispositivo móvil y escanee el código QR que aparece en la pantalla.
- Si no desea usar Expo Client y tiene un dispositivo android puede instalar el archivos apk, descargandolo en el siguiente [link](https://expo.dev/artifacts/eas/9SWQmJSvekCVzeHZDxhfRV.apk).

### Instrucciones de instalación del APK en Android
- Descargue el apk desde el [link](https://expo.dev/artifacts/eas/9SWQmJSvekCVzeHZDxhfRV.apk).
- Active la opción de origenes desconocidos.
- Tal vez aparezca la ventana de Play Protect, seleccione instalar de todos modos.
- Le preguntará si desea instalar la app, seleccione la opción de instalar.
- Una vez finalizado seleccione abrir.
- Tal vez le pida enviar a Google para analizar, seleccione "No enviar".
- Ya puede utillizar la prueba de la aplicación.

## Documentación
- La documentación de las funciones se pueden encontrar en los archivos de código.
- Hay 5 Componentes (App.js, Main.jsx, Options.jsx, Items.jsx, Total.jsx y Payment.jsx)
- Los componentes y Main se encuentran en el directorio principal.
- El resto de componentes se encuentra en la carpeta Components.
- Los iconos de trash y el carrito de compras están en la carpeta Assets.
- Los archivos de Redux (Store.js y Actions.js) se encuentran en la carpeta Reducer.

## Construído con
- [React-Native](https://reactnative.dev/) - Framework usado
- [Redux](https://redux.js.org/) - Gestión del estado global
- [Expo](https://expo.io/) - Platforma para la construcción de React Native apps.

## Autor:
Claret Devigne
