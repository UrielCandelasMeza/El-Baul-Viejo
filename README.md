# 🏺 El Baúl Viejo — Frontend

Interfaz web de **El Baúl Viejo**, una tienda de antigüedades que permite a los visitantes explorar el catálogo de piezas, ver detalles y contactar al vendedor por WhatsApp o Messenger. Los administradores pueden gestionar piezas y categorías directamente desde la web.

> 🔗 **Repositorio del backend:** [El-Baul-Viejo-Backend](https://github.com/UrielCandelasMeza/El-Baul-Viejo-Backend)

---

## ✨ Funcionalidades

- Catálogo con piezas disponibles y no disponibles
- Buscador en tiempo real por nombre
- Vista de detalle con carrusel de imágenes, precio, categorías y estado
- Botones de contacto (WhatsApp con mensaje pre-llenado y Messenger)
- Panel admin protegido: crear/editar/eliminar piezas y categorías
- Login con JWT (httpOnly cookies, renovación automática del token)
- Header dinámico: muestra opciones admin cuando hay sesión activa

---

## 🛠 Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 | UI |
| React Router 7 | Routing SPA |
| Vite 7 | Build tool + dev server |
| Tailwind CSS 4 | Estilos |
| Axios | HTTP client |
| React Icons | Iconografía |

---

## 🌐 Rutas

| Ruta | Componente | Acceso |
|---|---|---|
| `/` | `LandingPage` | Público |
| `/piece/:id` | `Piece` | Público |
| `/admin/login` | `LoginPage` | Público |
| `/admin/piece/create` | `CreatePiece` | 🔒 Admin |
| `/admin/categories` | `ManageCategories` | 🔒 Admin |

---

## 🔐 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_WHATSAPP_NUMBER=52XXXXXXXXXX
VITE_MESSENGER_ID=XXXXXXXXXXXX
```

> Las variables deben tener el prefijo `VITE_` para que Vite las exponga al código.

---

## 💻 Instalación y desarrollo

```bash
# 1. Instalar dependencias
npm install

# 2. Crear variables de entorno
cp .env.example .env   # editar con tus valores

# 3. Iniciar servidor de desarrollo
npm run dev
```

La app se ejecuta en `http://localhost:5173`.

Vite proxea automáticamente las peticiones `/api/*` al backend en `http://localhost:5000`. El backend debe estar corriendo para que la app funcione.

---

## 🐳 Docker

El `Dockerfile` usa una build multi-stage: **Node 20** para compilar con Vite y **Nginx** para servir los archivos estáticos.

```bash
docker compose up --build
```

Nginx hace proxy de `/api/*` al contenedor del backend y maneja el routing de React Router con fallback a `index.html`.

---

## 🚀 Despliegue en Render

Configurar como **Static Site** en Render:

| Campo | Valor |
|---|---|
| Root Directory | `web` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |

Agregar en **Environment Variables**:
- `VITE_WHATSAPP_NUMBER`
- `VITE_MESSENGER_ID`

En **Redirects/Rewrites**, agregar una regla `/*` → `/index.html` (tipo **Rewrite**) para que React Router funcione.
