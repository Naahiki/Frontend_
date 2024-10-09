Tienes razón, es importante mencionar la dependencia del backend. Aquí tienes la actualización:

---

# EasyTravel - Frontend

## Descripción del Proyecto

**EasyTravel** es una plataforma de ecommerce para la compra de paquetes de viaje. Los usuarios pueden registrarse, iniciar sesión y gestionar sus pedidos, mientras que la aplicación se encarga de cargar y mostrar los paquetes de viaje disponibles desde una base de datos. Los paquetes cuentan con stock gestionado en tiempo real. La aplicación incluye protección de rutas, carrito de compras y manejo de imágenes a través de Cloudinary.

## Stack Tecnológico

- **Frontend**: React (Vite)
- **Gestión de Estado**: React Context + LocalStorage
- **Diseño y Estilos**: CSS personalizado
- **Manejo de imágenes**: Cloudinary
- **Autenticación**: React Context API y LocalStorage
- **Despliegue**: Railway

## Estructura del Proyecto

```bash
/frontend
  ├── /node_modules        # Dependencias del proyecto
  ├── /public              # Archivos públicos como el favicon y manifest
  ├── /src                 # Código fuente de la aplicación
      ├── /components      # Componentes reutilizables de React (p.ej., ProductList, Cart)
      ├── /context         # Archivos para la implementación del Context API (autenticación, carrito)
      ├── /pages           # Páginas de la aplicación (p.ej., Home, Login, Checkout)
      ├── /routes          # Rutas de navegación de la aplicación
      ├── App.jsx          # Componente raíz de la aplicación
      ├── main.jsx         # Punto de entrada de la aplicación
  ├── .env.example         # Archivo de variables de entorno
  ├── package.json         # Dependencias del proyecto y scripts de npm
  ├── vite.config.js       # Configuración de Vite


```

## Instalación y Configuración

1. **Clonar el repositorio**:

   ```bash
   git clone <url-del-repositorio>
   cd frontend
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Configurar el archivo `.env`**:

   Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`. Debes proporcionar la URL base de la API en el archivo `.env`:

   ```bash
   VITE_API_URL=http://localhost:3000
   ```

4. **Ejecutar la aplicación localmente**:

   ```bash
   npm run dev
   ```

5. **Despliegue**:

   Para desplegar la aplicación, puedes utilizar Railway o cualquier otro servicio de despliegue compatible con React. Asegúrate de configurar correctamente las variables de entorno en el servicio de hosting.

## Consideraciones

- **Dependencia del Backend**: Esta aplicación depende de un backend Node.js. Necesitarás clonar e instalar el [repositorio del backend](https://github.com/Naahiki/Backend_) para que funcione correctamente y configurar una base de datos MySQL.

