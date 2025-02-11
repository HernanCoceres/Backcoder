# 🍷 Remini API

## 📌 Descripción del Proyecto

Remini API es una aplicación backend desarrollada con **Node.js** y **Express** que permite gestionar productos y carritos de compras.  

### ✨ Funcionalidades:
- 📦 **Gestión de Productos**: Crear, obtener, actualizar y eliminar productos.
- 🛒 **Gestión de Carritos**: Crear carritos de compra y agregar productos a ellos.
- 🔍 **Consulta de Productos en un Carrito**: Obtener los productos dentro de un carrito.
- 💾 **Persistencia de Datos**: Almacenamiento en archivos **JSON**.

---

## 🛠️ Tecnologías Utilizadas

- **[Node.js](https://nodejs.org/)** - Entorno de ejecución para JavaScript.
- **[Express](https://expressjs.com/)** - Framework minimalista para Node.js.
- **[uuid](https://www.npmjs.com/package/uuid)** - Generación de identificadores únicos.

---

## 📥 Instalación

1. Clona el repositorio y accede a la carpeta del proyecto:

   git clone https://github.com/tu_usuario/tu_repositorio.git
   cd tu_repositorio

2. Instala las dependencias necesarias:
   npm install

## ▶️ Uso de la API
  Para correr la API en modo local, usa:
  npm start
  El servidor estará disponible en:
🔗 http://localhost:8080

## 🔀 Rutas principales
  📦 Productos (/api/products)
| Método | Ruta | Descripción |
|--------------|--------------|--------------|
| GET | /api/products | Obtener todos los productos.|
| GET | /api/products/:pid| Obtener un producto por su ID.|
| POST | /api/products| Crear un nuevo producto.|
| PUT | /api/products/:pid| Actualizar un producto por su ID.|
| DELETE | /api/products/pid| Eliminar un producto por su ID.|

  🛒 Carritos (/api/carts)
| Método | Ruta | Descripción |
|--------------|--------------|--------------|
| POST | /api/carts| Crear un nuevo carrito.|
| GET | /api/carts/:cid | Obtener un carrito por su ID.|
| POST | /api/carts/:cid/product/:pid| 	Agregar un producto a un carrito.|

## 🤝 Contribuir al Proyecto
Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama:
```bash
 git checkout -b feature/nueva-funcionalidad
```
3. Realiza tus cambios y haz commit:
```bash
   git commit -am "Agrega nueva funcionalidad"
```
4. Sube los cambios a tu repositorio:
```bash
   git push origin feature/nueva-funcionalidad
```
5. Envía un pull request.

## 🔗 Enlaces Útiles
[📌 Documentación de Node.js](https://nodejs.org/docs/latest/api/))
[📌 Documentación de Express](https://expressjs.com/en/guide/routing.html))
[📌 Documentación de UUID](https://www.npmjs.com/package/uuid)

## 🛠️ Pruebas con Postman
Para facilitar la prueba de la API, tenes una colección de Postman.
Podes importarla directamente en Postman y probar las rutas disponibles.
📥 Descarga la colección aquí:[Remini API Postman Collection](Postman_Collection.json)
