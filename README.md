# initiationOnBootstrap

# Página de Gestión de Usuarios

Esta página utiliza **Bootstrap** para la creación de una interfaz de usuario interactiva. El objetivo de esta página es permitir la creación y visualización de usuarios, utilizando almacenamiento local (`localStorage`) para guardar la información.

## Requisitos

### Funcionalidades

1. **NavBar**: Una barra de navegación que permite moverse entre dos vistas:

   - Crear Usuario
   - Usuarios

2. **Vista: Crear Usuario**:
   - Un formulario que recoge los siguientes datos:
     - Nombre
     - Correo
     - Contraseña
     - Repite Contraseña
   - Validaciones:
     - Todos los campos deben ser obligatorios.
     - El correo debe seguir un formato válido.
     - Las contraseñas deben coincidir.
     - La contraseña debe cumplir con ciertos requisitos de seguridad (por ejemplo, longitud mínima, caracteres especiales, etc.).
   - Los datos se almacenan en `localStorage`.
   - Mensajes de error y éxito se muestran utilizando los alertas de Bootstrap:
     - Errores desaparecen después de 3 segundos.
     - Mensaje de éxito se muestra por 3 segundos antes de redirigir a la vista de usuarios.
3. **Vista: Usuarios**:
   - Muestra los usuarios guardados en `localStorage` en tarjetas (cards) de Bootstrap.
   - Cada tarjeta muestra el nombre y correo del usuario.

## Funcionalidades Detalladas

### 1. **NavBar**:

La barra de navegación se crea utilizando el componente **NavBar** de Bootstrap, permitiendo que el usuario se mueva entre las vistas de "Crear Usuario" y "Usuarios".

### 2. **Vista Crear Usuario**:

- **Formulario**:
  El formulario contiene los siguientes campos:

  - **Nombre** (input text)
  - **Correo** (input email)
  - **Contraseña** (input password)
  - **Repite Contraseña** (input password)

- **Validación**:

  - Si algún campo está vacío, se muestra un mensaje de error.
  - Si el formato del correo no es válido, se muestra un mensaje de error.
  - Si las contraseñas no coinciden, se muestra un mensaje de error.
  - Si la contraseña no cumple con los requisitos mínimos de seguridad (longitud, caracteres especiales, etc.), se muestra un mensaje de error.
  - Los mensajes de error desaparecen después de 3 segundos.

- **Al guardar**:
  - Los datos del usuario se almacenan en `localStorage`.
  - Si el formulario se llena correctamente, se muestra un mensaje de éxito ("Usuario creado correctamente") durante 3 segundos.
  - Después de 3 segundos, se redirige a la vista "Usuarios".

### 3. **Vista Usuarios**:

- Muestra una lista de usuarios almacenados en `localStorage`, presentados en tarjetas (cards) de Bootstrap.
- Cada tarjeta muestra el **nombre** y el **correo** del usuario.
- Se utiliza el diseño responsive de Bootstrap para que las tarjetas se adapten a distintos tamaños de pantalla.

## Implementación de LocalStorage

- Los datos de los usuarios se almacenan utilizando el objeto `localStorage` del navegador. Esto permite que los datos persistan incluso cuando se cierre el navegador o se recargue la página.
- Cada vez que un usuario es creado, se almacena un objeto con el nombre y correo en `localStorage` en formato JSON.

### Ejemplo de almacenamiento:

```javascript
localStorage.setItem("usuarios", JSON.stringify([usuario]));
```
