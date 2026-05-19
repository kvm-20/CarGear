# 🚗 CarGear — Marketplace de Repuestos Automotrices

> Plataforma B2B/B2C de repuestos automotrices con motor de recomendación por IA, desarrollada con **React + Vite**.

---

## 📋 Tabla de Contenidos

1. [Descripción General](#1-descripción-general)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Estructura del Proyecto](#3-estructura-del-proyecto)
4. [Instalación y Ejecución](#4-instalación-y-ejecución)
5. [Sistema de Roles y Autenticación](#5-sistema-de-roles-y-autenticación)
6. [Rutas de la Aplicación](#6-rutas-de-la-aplicación)
7. [Contextos Globales (State Management)](#7-contextos-globales-state-management)
8. [Páginas y Componentes](#8-páginas-y-componentes)
9. [Datos Mock](#9-datos-mock)
10. [Guía de Uso por Rol](#10-guía-de-uso-por-rol)

---

## 1. Descripción General

**CarGear** es una Single Page Application (SPA) que simula un marketplace de repuestos automotrices. Combina:

- **B2C (Business to Consumer):** Compradores individuales que buscan repuestos para su vehículo.
- **B2B (Business to Business):** Talleres y distribuidores que gestionan inventario y venden en la plataforma.
- **Panel Administrativo:** Supervisión global de ventas, usuarios e inventario.

### Características principales

| Feature | Descripción |
|---|---|
| 🤖 Motor IA | Recomendaciones de repuestos basadas en el vehículo del usuario |
| 🔍 Catálogo inteligente | Filtros por categoría, marca y compatibilidad vehicular |
| 🛒 Carrito de compras | Gestión de items con control de cantidades |
| 💳 Checkout | Flujo de pago con 3 métodos (Tarjeta, PSE, Efectivo) |
| 📦 Seguimiento | Tracking en tiempo real de pedidos con línea de tiempo |
| 📊 Dashboard Admin | Gráficas de ventas, inventario y comportamiento de usuarios |
| 🏪 Portal Vendedor | CRUD de productos e inventario para talleres/distribuidores |

---

## 2. Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| **React** | 18.3.1 | Framework UI principal |
| **Vite** | 5.4.10 | Bundler y servidor de desarrollo |
| **React Router DOM** | 7.15.1 | Enrutamiento SPA |
| **Recharts** | 3.8.1 | Gráficas y visualización de datos |
| **Lucide React** | 1.16.0 | Librería de íconos |
| **CSS Vanilla** | — | Estilos personalizados por componente |
| **localStorage** | — | Persistencia de pedidos en sesión |

### Dependencias de desarrollo

- `@vitejs/plugin-react` — Soporte de JSX y Fast Refresh
- `eslint` + plugins de React — Linter de código

---

## 3. Estructura del Proyecto

```
CarGear/
├── public/
│   ├── img/
│   │   ├── carro.jpg          # Imagen producto - Iluminación
│   │   ├── carro1.jpg         # Imagen producto - Multimedia
│   │   ├── carro2.jpg         # Imagen producto - Frenos
│   │   ├── carro3.jpg         # Imagen producto - Suspensión
│   │   ├── favicon.ico
│   │   └── favicon.svg
│   └── vite.svg
│
├── src/
│   ├── assets/
│   │   └── react.svg
│   │
│   ├── components/            # Componentes reutilizables
│   │   ├── Navbar.jsx         # Barra de navegación global
│   │   ├── Navbar.css
│   │   ├── Footer.jsx         # Pie de página
│   │   ├── Footer.css
│   │   ├── ProductCard.jsx    # Tarjeta de producto del catálogo
│   │   └── ProductCard.css
│   │
│   ├── context/               # Estado global (React Context API)
│   │   ├── AuthContext.jsx    # Autenticación y rol de usuario
│   │   ├── CartContext.jsx    # Carrito de compras
│   │   └── OrderContext.jsx   # Historial y gestión de pedidos
│   │
│   ├── data/
│   │   └── mockData.js        # Datos simulados (productos, pedidos, etc.)
│   │
│   ├── layouts/
│   │   ├── DashboardLayout.jsx  # Layout con sidebar para dashboards
│   │   └── DashboardLayout.css
│   │
│   ├── pages/                 # Vistas/páginas principales
│   │   ├── Home.jsx           # Página de inicio con hero y buscador
│   │   ├── Home.css
│   │   ├── Catalog.jsx        # Catálogo con filtros
│   │   ├── Catalog.css
│   │   ├── ProductDetails.jsx # Detalle individual de producto
│   │   ├── ProductDetails.css
│   │   ├── Cart.jsx           # Carrito de compras
│   │   ├── Cart.css
│   │   ├── Checkout.jsx       # Proceso de pago
│   │   ├── Checkout.css
│   │   ├── OrdersHistory.jsx  # Historial de pedidos del comprador
│   │   ├── OrdersHistory.css
│   │   ├── OrderTracking.jsx  # Seguimiento detallado de un pedido
│   │   ├── OrderTracking.css
│   │   ├── Login.jsx          # Selector de rol (modo demo)
│   │   ├── Login.css
│   │   ├── AdminDashboard.jsx # Panel administrativo con gráficas
│   │   ├── SellerDashboard.jsx# Gestión de inventario del vendedor
│   │   ├── SellerDashboard.css
│   │   └── SellerStats.jsx    # Estadísticas del vendedor
│   │
│   ├── App.jsx                # Componente raíz + configuración de rutas
│   ├── App.css
│   ├── index.css              # Estilos globales y design tokens
│   └── main.jsx               # Punto de entrada de React
│
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## 4. Instalación y Ejecución

### Prerrequisitos

- **Node.js** v18 o superior
- **npm** v9 o superior

### Pasos

```bash
# 1. Clonar o descargar el proyecto
cd CarGear

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173/**

### Otros comandos

```bash
npm run build    # Generar build de producción (dist/)
npm run preview  # Previsualizar el build de producción
npm run lint     # Ejecutar ESLint
```

---

## 5. Sistema de Roles y Autenticación

La autenticación es simulada (modo demo). Al acceder a `/login`, el usuario selecciona su perfil de rol.

### Roles disponibles

| Rol | Nombre demo | Email demo | Acceso |
|---|---|---|---|
| `guest` | — | — | Home, Catálogo, Login |
| `buyer` | Comprador Demo | comprador@cargear.com | + Carrito, Pedidos, Tracking |
| `seller` | Taller Autorizado | taller@cargear.com | + Portal B2B, Inventario, Stats |
| `admin` | Administrador | admin@cargear.com | Todo lo anterior + Dashboard Admin |

### Flujo de login

```
/login → Seleccionar rol → login(role) en AuthContext
  ├── buyer  → Redirige a /
  ├── seller → Redirige a /dashboard/seller
  └── admin  → Redirige a /dashboard/admin
```

### Rutas protegidas

Se usa el componente `ProtectedRoute` en `App.jsx`:
- Si el rol es `guest` → redirige a `/login`
- Si el rol no tiene permiso → redirige a `/`

---

## 6. Rutas de la Aplicación

```
/                          → Home (pública)
/login                     → Selector de rol (pública)
/catalog                   → Catálogo de productos (pública)
/product/:id               → Detalle de producto (pública)
/cart                      → Carrito de compras (pública)
/checkout                  → Finalizar compra (pública)
/orders                    → Historial de pedidos [buyer, admin]
/tracking/:id              → Seguimiento de pedido [buyer, admin]
/dashboard/                → Layout con sidebar (protegido)
  ├── admin                → Dashboard administrativo [admin]
  ├── seller               → Stats del vendedor [seller, admin]
  └── seller/inventory     → Gestión de inventario [seller, admin]
```

---

## 7. Contextos Globales (State Management)

La aplicación usa **React Context API** para compartir estado entre componentes. Los tres contextos se anidan en `App.jsx`:

```
<AuthProvider>
  <CartProvider>
    <OrderProvider>
      ...
    </OrderProvider>
  </CartProvider>
</AuthProvider>
```

---

### 7.1 AuthContext

**Archivo:** `src/context/AuthContext.jsx`

Gestiona la identidad y el rol del usuario activo.

#### Estado

| Variable | Tipo | Descripción |
|---|---|---|
| `role` | `string` | Rol activo: `'guest'`, `'buyer'`, `'seller'`, `'admin'` |
| `user` | `object \| null` | Objeto con `name` y `email` del usuario |

#### Funciones expuestas

| Función | Parámetros | Descripción |
|---|---|---|
| `login(selectedRole)` | `string` | Establece el rol y asigna datos del usuario demo |
| `logout()` | — | Resetea el estado a `guest` y limpia el usuario |

#### Uso

```jsx
import { useAuth } from '../context/AuthContext';

const { role, user, login, logout } = useAuth();
```

---

### 7.2 CartContext

**Archivo:** `src/context/CartContext.jsx`

Gestiona los items del carrito de compras. El estado **no persiste** al recargar la página.

#### Estado

| Variable | Tipo | Descripción |
|---|---|---|
| `cartItems` | `Array` | Lista de `{ product, quantity }` |
| `cartCount` | `number` | Total de unidades en el carrito |
| `cartTotal` | `number` | Suma total en COP |

#### Funciones expuestas

| Función | Parámetros | Descripción |
|---|---|---|
| `addToCart(product, quantity)` | `object, number` | Añade producto o incrementa cantidad si ya existe |
| `removeFromCart(productId)` | `number` | Elimina el producto del carrito |
| `updateQuantity(productId, delta)` | `number, number` | Suma `delta` (+1/-1) a la cantidad (mínimo 1) |
| `clearCart()` | — | Vacía el carrito completamente |

#### Uso

```jsx
import { useCart } from '../context/CartContext';

const { cartItems, cartTotal, addToCart, removeFromCart } = useCart();
```

---

### 7.3 OrderContext

**Archivo:** `src/context/OrderContext.jsx`

Gestiona el historial de pedidos del usuario. Los pedidos **persisten en `localStorage`** con la clave `cargear_orders`.

#### Estado

| Variable | Tipo | Descripción |
|---|---|---|
| `orders` | `Array` | Lista de pedidos con tracking incluido |

#### Estructura de un pedido

```js
{
  id: "ORD-123456C",
  date: "2026-05-18",
  total: 310000,
  status: "Confirmado",
  items: [
    { name: "Nombre producto", quantity: 1, price: 120000 }
  ],
  tracking: {
    provider: "Pendiente de asignación",
    trackingNumber: "N/A",
    steps: [
      { status: "Pedido Confirmado", date: "...", completed: true, current: true },
      { status: "Empacado",          date: "Pendiente", completed: false },
      { status: "En Camino",         date: "Pendiente", completed: false },
      { status: "Entregado",         date: "Pendiente", completed: false }
    ]
  }
}
```

#### Funciones expuestas

| Función | Parámetros | Descripción |
|---|---|---|
| `addOrder(cartItems, total)` | `Array, number` | Crea un nuevo pedido y lo añade al tope de la lista. Retorna el `id` del pedido. |

#### Uso

```jsx
import { useOrders } from '../context/OrderContext';

const { orders, addOrder } = useOrders();
```

---

## 8. Páginas y Componentes

### 8.1 Componentes Reutilizables

#### `Navbar.jsx`
Barra de navegación fija con efecto glassmorphism.

- Muestra el logo **CARGEAR** con ícono `Zap`.
- Links de navegación que se activan (clase `active`) según la ruta actual (`useLocation`).
- Muestra/oculta links según el rol del usuario.
- Botón de carrito con badge de cantidad (`cartCount`).
- Si es `guest`: muestra botón **Ingresar** → `/login`.
- Si está autenticado: muestra nombre del usuario y botón de **Logout**.

#### `ProductCard.jsx`
Tarjeta de producto para el catálogo. Recibe `product` y `selectedVehicle` como props.

- Muestra badge **★ Sugerencia IA** si `product.aiRecommended === true`.
- Overlay **Agotado** si `product.inStock === 0`.
- **Verificación de compatibilidad** dinámica:
  - Sin vehículo seleccionado: estado neutral.
  - Con vehículo seleccionado: muestra ✓ Compatible o ✗ No compatible.
  - Productos con compatibilidad `'Universal'` siempre son compatibles.
- Botón **Añadir al carrito** deshabilitado si no hay stock.
- Link a la página de **Especificaciones** (`/product/:id`).

#### `Footer.jsx`
Pie de página con el branding de CarGear, links rápidos a Catálogo y Portal B2B, y íconos de contacto.

---

### 8.2 Layout de Dashboard

#### `DashboardLayout.jsx`
Layout de dos columnas: **sidebar** + **contenido principal**.

- Sidebar adaptable según el rol:
  - **Admin:** links a Dashboard Admin e Inventario.
  - **Seller:** links a Mi Dashboard y Mi Inventario.
- Usa `<Outlet />` de React Router para renderizar las sub-rutas.
- Link a Configuración (placeholder, no funcional aún).

---

### 8.3 Páginas

#### `Home.jsx` — `/`
Página principal con:
1. **Hero Section:** Buscador de vehículo (Marca → Modelo → Año) que redirige al catálogo. Usa datos de `carDatabase`.
2. **Features Section:** 3 cards con las propuestas de valor (Compatibilidad IA, Motor de Recomendación, B2B/B2C).
3. **Recomendaciones IA:** Grid de productos destacados hardcodeados.
4. **CTA B2B:** Banner que invita a talleres/distribuidores al portal B2B.

---

#### `Catalog.jsx` — `/catalog`
Catálogo con filtros en sidebar:

| Filtro | Opciones |
|---|---|
| Búsqueda por nombre | Texto libre |
| Categoría | Iluminación, Multimedia, Frenos, Suspensión |
| Marca de pieza | Dinámico desde `products` |
| Vehículo (IA) | Selección de vehículo del usuario para verificar compatibilidad |

Los productos filtrados se renderizan como `<ProductCard />`. Incluye un selector de ordenamiento (aún no funcional).

---

#### `ProductDetails.jsx` — `/product/:id`
Página de detalle individual del producto. Funcionalidades:

- **Breadcrumb:** Inicio → Catálogo → Nombre del producto.
- **Análisis IA de Compatibilidad:** Caja destacada que muestra si el producto es compatible con el Toyota Hilux 2021 (vehículo hardcodeado).
- **Precio** en COP formateado.
- Botones **Añadir al carrito** (con feedback visual de 2s) y **Comprar Ahora**.
- **Trust badges:** Garantía de 1 año y Envío Nacional.
- **Sección de productos relacionados:** Los otros 4 productos del catálogo sugeridos como "comprados juntos por IA".

---

#### `Cart.jsx` — `/cart`
Carrito de compras:

- Estado vacío: ilustración con botón para ir al catálogo.
- Lista de items con imagen, nombre, categoría, precio unitario y controles de cantidad (+/-).
- Botón de eliminar item.
- Panel resumen: subtotal, envío (gratis) y total. Botón **Proceder al Pago**.

---

#### `Checkout.jsx` — `/checkout`
Flujo de pago en dos columnas:

**Columna izquierda:**
- Formulario de información de envío (Nombre, Teléfono, Dirección, Ciudad, Código Postal).
- Selector de método de pago:
  - 💳 **Tarjeta:** Campos de número, vencimiento y CVC.
  - 📱 **PSE:** Mensaje de redirección con logo de PSE.
  - 💵 **Efectivo:** Info de puntos Efecty y Baloto.

**Columna derecha:**
- Resumen del pedido con total.
- Botón **Confirmar y Pagar** → después de 1.5s crea el pedido (`addOrder`), limpia el carrito y muestra pantalla de éxito.

**Pantalla de éxito:**
- Ícono de check verde animado.
- Botones para ir a **Mis Pedidos** o volver al **Catálogo**.

---

#### `OrdersHistory.jsx` — `/orders`
Historial de pedidos del comprador (roles: `buyer`, `admin`):

- Si no hay pedidos: estado vacío con link al catálogo.
- Por cada pedido muestra:
  - ID, fecha, total y badge de estado (Entregado / En Camino).
  - Lista de artículos con cantidad y subtotal.
  - Preview de seguimiento con línea de tiempo mini horizontal.
  - Botón **Ver Detalles de Seguimiento** → `/tracking/:id`.

---

#### `OrderTracking.jsx` — `/tracking/:id`
Seguimiento detallado de un pedido (roles: `buyer`, `admin`):

- Si el pedido no existe → redirige a `/orders`.
- Layout en 3 columnas (2 + 1):
  - **Izquierda (2/3):** Línea de tiempo vertical con pasos del envío. Si el paso actual es "En Camino", muestra la ubicación actual (hardcodeada).
  - **Derecha (1/3):** Card con estado actual, dirección de entrega y teléfono de la transportadora.

---

#### `Login.jsx` — `/login`
Pantalla de selección de rol (modo demo). Muestra 3 tarjetas:

| Rol | Ícono | Color |
|---|---|---|
| Comprador (B2C) | `User` | Cyan (primary) |
| Vendedor (B2B) | `Briefcase` | Naranja (warning) |
| Administrador | `Shield` | Rojo (danger) |

Al hacer clic en una tarjeta se llama `login(role)` y se redirige según el rol.

---

#### `AdminDashboard.jsx` — `/dashboard/admin`
Panel administrativo (solo rol `admin`). Contiene:

**4 KPI Cards:**
| Métrica | Valor demo |
|---|---|
| Ventas Totales | $15.400.000 COP |
| Pedidos Activos | 42 |
| Nuevos Usuarios | 120 |
| Alertas de Stock | 5 |

**3 Gráficas (Recharts):**
1. **LineChart** — Rendimiento de ventas mensual (Ene-Jun 2026).
2. **BarChart** — Estado de inventario por categoría (Iluminación, Frenos, Interior, Motor).
3. **PieChart (Donut)** — Comportamiento de usuarios (B2C, B2B Talleres, Distribuidores).

---

#### `SellerStats.jsx` — `/dashboard/seller`
Dashboard de estadísticas del vendedor (roles: `seller`, `admin`). Contiene:

**4 KPI Cards:**
| Métrica | Valor |
|---|---|
| Ventas del Mes | $4.250.000 COP |
| Artículos Vendidos | 38 |
| Alertas Stock | Dinámico desde `products` |
| Valor Inventario | Calculado (precio × stock) |

**1 Gráfica:**
- **LineChart** — Tendencia de ventas semanal del mes actual.

---

#### `SellerDashboard.jsx` — `/dashboard/seller/inventory`
Gestión de inventario CRUD (roles: `seller`, `admin`).

**Tabla de productos:**
| Columna | Descripción |
|---|---|
| Producto | Imagen en miniatura + nombre |
| Categoría | — |
| Precio (COP) | Formateado |
| Stock Disp. | Badge con color según nivel |
| Estado | Óptimo / Reabastecer / Agotado |
| Acciones | Botones Editar y Eliminar |

**Funcionalidades:**
- 🔍 Buscador de productos por nombre.
- ➕ **Nuevo Producto:** Abre modal con formulario.
- ✏️ **Editar:** Abre modal pre-cargado con los datos del producto.
- 🗑️ **Eliminar:** Confirmación con `window.confirm` antes de borrar.

**Modal de Crear/Editar:**
Campos: Nombre, Categoría (select), Precio (COP), Cantidad en Stock.

> **Nota:** Los cambios en el inventario son locales al estado del componente y **no persisten** al recargar la página.

---

## 9. Datos Mock

**Archivo:** `src/data/mockData.js`

### `products` — 5 productos

| ID | Nombre | Categoría | Marca | Precio COP | Stock |
|---|---|---|---|---|---|
| 1 | Faro LED Alta Potencia X-Treme | Iluminación | LumiTech | 120,000 | 15 |
| 2 | Pantalla Táctil Android 10" con CarPlay | Multimedia | SmartNav | 450,000 | 5 |
| 3 | Pastillas de Freno Cerámicas Pro Performance | Frenos | BrakeMaster | 85,000 | 30 |
| 4 | Amortiguadores Deportivos Gas-A-Just | Suspensión | KYB | 320,000 | 0 |
| 5 | Kit Exploradoras LED Dual Color | Iluminación | LumiTech | 185,000 | 12 |

Cada producto incluye: `id`, `name`, `category`, `brand`, `price`, `rating`, `image`, `compatibility[]`, `inStock`, `aiRecommended`, `specs{}`.

### `userVehicles` — 6 vehículos demo del usuario

Toyota Hilux, Mazda 3, Ford Ranger, VW Jetta, Nissan Frontier, Chevrolet Tracker.

### `carDatabase` — Base de datos de marcas/modelos/años

Cubre 6 marcas (Toyota, Mazda, Ford, Volkswagen, Nissan, Chevrolet) con sus modelos y años disponibles.

### `adminStats` — KPIs del administrador

```js
{ totalSales: 15400000, activeOrders: 42, lowStockItems: 5, newUsers: 120 }
```

### `mockOrders` — 2 pedidos de ejemplo

- `ORD-98234A`: En Camino (Servientrega).
- `ORD-77612B`: Entregado (Coordinadora).

Son el estado inicial del `OrderContext`. Si hay datos en `localStorage`, se usan esos en su lugar.

---

## 10. Guía de Uso por Rol

### Como Comprador (B2C)

1. Ir a `/login` → seleccionar **Comprador**.
2. En **Home**, usar el buscador por vehículo (Marca/Modelo/Año) → click en **Buscar Piezas**.
3. En **Catálogo**, filtrar por categoría, marca o seleccionar tu vehículo para ver compatibilidad IA.
4. Click en **Especificaciones** para ver el detalle del producto.
5. Click en **Añadir al Carrito** → ir a `/cart`.
6. Click en **Proceder al Pago** → completar formulario → seleccionar método de pago → **Confirmar y Pagar**.
7. Ver pedidos en **Mis Pedidos** (`/orders`) y hacer seguimiento en `/tracking/:id`.

### Como Vendedor (B2B)

1. Ir a `/login` → seleccionar **Vendedor**.
2. En **Mi Dashboard** (`/dashboard/seller`) ver métricas y tendencias de ventas semanales.
3. En **Mi Inventario** (`/dashboard/seller/inventory`) gestionar productos:
   - Buscar, crear, editar o eliminar productos.
   - Identificar alertas de stock (badge naranja/rojo).

### Como Administrador

1. Ir a `/login` → seleccionar **Administrador**.
2. Acceder a **Dashboard Admin** para ver KPIs globales y gráficas de ventas, inventario y usuarios.
3. Acceder a **Inventario** para gestionar todos los productos de la plataforma.
4. Navegar a **Mis Pedidos** para ver el historial completo de órdenes.

---

## 🎨 Design System

La aplicación usa un tema oscuro (dark mode) con los siguientes tokens CSS definidos en `src/index.css`:

| Token | Valor | Uso |
|---|---|---|
| `--primary` | `#00e5ff` | Cyan — acento principal |
| `--secondary` | `#ff6b00` | Naranja — acento secundario |
| `--danger` | `#ff3366` | Rojo — errores, alertas críticas |
| `--warning` | `#ffab00` | Amarillo — advertencias de stock |
| `--success` | `#00e676` | Verde — estados positivos |
| `--bg-dark` | `#0a0a0a` | Fondo principal oscuro |
| `--bg-glass` | glassmorphism | Cards con fondo translúcido |
| `--border-color` | `rgba(255,255,255,0.08)` | Bordes sutiles |

### Clases de utilidad principales

```css
.bg-glass       /* Fondo glassmorphism */
.text-gradient  /* Texto con gradiente cyan-naranja */
.btn-primary    /* Botón principal con fondo cyan */
.btn-secondary  /* Botón secundario con borde */
.card           /* Card con bordes y padding */
.flex-center    /* display:flex; align-items:center */
.flex-between   /* display:flex; justify-content:space-between */
.grid           /* Grid layout */
.grid-cols-N    /* Grid de N columnas */
.text-muted     /* Texto gris secundario */
.text-gradient  /* Gradiente en texto */
```

---

## ⚠️ Limitaciones del Modo Demo

- La autenticación es **simulada**. No hay backend real.
- Los cambios en inventario del Seller **no persisten** al recargar (solo en memoria).
- Los pedidos **sí persisten** en `localStorage` (`cargear_orders`).
- La compatibilidad vehicular en **ProductDetails** está hardcodeada para Toyota Hilux 2021.
- Los métodos de pago (Tarjeta, PSE, Efectivo) son **visuales**, no procesan cobros reales.
- El buscador del **Home** siempre redirige al catálogo general sin filtrar por vehículo.

---

*© 2026 CarGear — Plataforma de repuestos automotrices con IA.*
