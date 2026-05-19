# 📖 CarGear — Documentación Técnica Completa

---

## 1. Estructura del Proyecto

```
CarGear/
├── public/
│   └── img/               # Imágenes de productos
│       ├── carro.jpg
│       ├── carro1.jpg
│       ├── carro2.jpg
│       └── carro3.jpg
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx     # Navegación global con roles
│   │   ├── Footer.jsx     # Pie de página
│   │   └── ProductCard.jsx# Tarjeta de producto con IA de compatibilidad
│   │
│   ├── context/
│   │   ├── AuthContext.jsx  # Rol y usuario activo
│   │   ├── CartContext.jsx  # Carrito de compras
│   │   └── OrderContext.jsx # Pedidos (persiste en localStorage)
│   │
│   ├── data/
│   │   └── mockData.js    # Productos, vehículos, pedidos y KPIs
│   │
│   ├── layouts/
│   │   └── DashboardLayout.jsx # Sidebar + Outlet para dashboards
│   │
│   ├── pages/
│   │   ├── Home.jsx           # Hero + buscador de vehículo
│   │   ├── Catalog.jsx        # Catálogo con filtros
│   │   ├── ProductDetails.jsx # Detalle + compatibilidad IA
│   │   ├── Cart.jsx           # Carrito de compras
│   │   ├── Checkout.jsx       # Flujo de pago
│   │   ├── OrdersHistory.jsx  # Historial de pedidos
│   │   ├── OrderTracking.jsx  # Seguimiento detallado
│   │   ├── Login.jsx          # Selector de rol (demo)
│   │   ├── AdminDashboard.jsx # Panel admin con gráficas
│   │   ├── SellerStats.jsx    # Estadísticas del vendedor
│   │   └── SellerDashboard.jsx# CRUD de inventario
│   │
│   ├── App.jsx          # Rutas + providers anidados
│   ├── index.css        # Design tokens y estilos globales
│   └── main.jsx         # Punto de entrada React
│
├── package.json
└── vite.config.js
```

---

## 2. Comandos

```bash
npm install      # Instalar dependencias
npm run dev      # Servidor de desarrollo → http://localhost:5173
npm run build    # Build de producción → /dist
npm run preview  # Previsualizar build
npm run lint     # Ejecutar ESLint
```

---

## 3. Sistema de Roles y Autenticación

La autenticación es **simulada (modo demo)**. No hay backend real. Las credenciales están definidas en `AuthContext.jsx`.

### Credenciales por rol

| Rol | Correo | Contraseña | Acceso |
|---|---|---|---|
| `buyer` | comprador@cargear.com | comprador123 | Carrito, Pedidos, Tracking |
| `seller` | taller@cargear.com | taller123 | Portal B2B, Inventario, Stats |
| `admin` | admin@cargear.com | admin123 | Todo + Dashboard Admin |

### Flujo de login

```
/login → Ingresar email + contraseña → login(email, password)
  ├── Credenciales válidas → setRole + setUser → redirección por rol
  │     ├── buyer  → /
  │     ├── seller → /dashboard/seller
  │     └── admin  → /dashboard/admin
  └── Credenciales inválidas → muestra mensaje de error
```

### Rutas protegidas

El componente `ProtectedRoute` en `App.jsx` verifica el rol:
- Si `guest` → redirige a `/login`
- Si no tiene permiso → redirige a `/`

---

## 4. Rutas

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` | Todos | Página de inicio |
| `/login` | Todos | Selector de rol |
| `/catalog` | Todos | Catálogo con filtros |
| `/product/:id` | Todos | Detalle de producto |
| `/cart` | Todos | Carrito de compras |
| `/checkout` | Todos | Proceso de pago |
| `/orders` | buyer, admin | Historial de pedidos |
| `/tracking/:id` | buyer, admin | Seguimiento de pedido |
| `/dashboard/admin` | admin | Dashboard administrativo |
| `/dashboard/seller` | seller, admin | Stats del vendedor |
| `/dashboard/seller/inventory` | seller, admin | Gestión de inventario |

---

## 5. Contextos Globales (State Management)

Los tres contextos se anidan en `App.jsx`:

```jsx
<AuthProvider>
  <CartProvider>
    <OrderProvider>
      ...
    </OrderProvider>
  </CartProvider>
</AuthProvider>
```

---

### 5.1 AuthContext

**Archivo:** `src/context/AuthContext.jsx`

```jsx
import { useAuth } from '../context/AuthContext';
const { role, user, login, logout } = useAuth();
```

| Valor | Tipo | Descripción |
|---|---|---|
| `role` | `string` | `'guest'` \| `'buyer'` \| `'seller'` \| `'admin'` |
| `user` | `object\|null` | `{ name, email }` del usuario activo |
| `login(email, password)` | `fn` | Valida credenciales. Retorna `{ success: true, role }` o `{ success: false }` |
| `logout()` | `fn` | Resetea a `guest` y limpia usuario |

Las credenciales válidas están en el array `CREDENTIALS` dentro del archivo:

```js
const CREDENTIALS = [
  { email: 'comprador@cargear.com', password: 'comprador123', role: 'buyer',  name: 'Comprador Demo' },
  { email: 'taller@cargear.com',    password: 'taller123',    role: 'seller', name: 'Taller Autorizado' },
  { email: 'admin@cargear.com',     password: 'admin123',     role: 'admin',  name: 'Administrador' },
];
```

---

### 5.2 CartContext

**Archivo:** `src/context/CartContext.jsx`  
El carrito **no persiste** al recargar.

```jsx
import { useCart } from '../context/CartContext';
const { cartItems, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
```

| Valor/Función | Descripción |
|---|---|
| `cartItems` | Array de `{ product, quantity }` |
| `cartCount` | Total de unidades |
| `cartTotal` | Suma total en COP |
| `addToCart(product, qty)` | Añade o incrementa cantidad |
| `removeFromCart(productId)` | Elimina un item |
| `updateQuantity(productId, delta)` | Suma delta (+1/-1), mínimo 1 |
| `clearCart()` | Vacía el carrito |

---

### 5.3 OrderContext

**Archivo:** `src/context/OrderContext.jsx`  
Los pedidos **persisten en `localStorage`** con clave `cargear_orders`.

```jsx
import { useOrders } from '../context/OrderContext';
const { orders, addOrder } = useOrders();
```

| Valor/Función | Descripción |
|---|---|
| `orders` | Array de pedidos con tracking |
| `addOrder(cartItems, total)` | Crea pedido, lo añade al tope, retorna el `id` |

#### Estructura de un pedido

```js
{
  id: "ORD-123456C",
  date: "2026-05-18",
  total: 310000,
  status: "Confirmado",
  items: [{ name, quantity, price }],
  tracking: {
    provider: "Pendiente",
    trackingNumber: "N/A",
    steps: [
      { status: "Pedido Confirmado", date: "...", completed: true, current: true },
      { status: "Empacado",  date: "Pendiente", completed: false },
      { status: "En Camino", date: "Pendiente", completed: false },
      { status: "Entregado", date: "Pendiente", completed: false }
    ]
  }
}
```

---

## 6. Componentes

### Navbar
- Barra fija con glassmorphism.
- Links activos por ruta (`useLocation`).
- Muestra/oculta opciones según `role`.
- Badge de carrito con `cartCount`.
- Botón Logout cuando hay sesión activa.

### Footer
- Logo, links a Catálogo y Portal B2B, íconos de contacto.

### ProductCard
Props: `product`, `selectedVehicle`

- Badge **★ Sugerencia IA** si `aiRecommended === true`.
- Overlay **Agotado** si `inStock === 0`.
- Verificación de compatibilidad:
  - Sin vehículo → estado neutral.
  - Con vehículo → ✓ Compatible o ✗ No compatible.
  - Productos `Universal` → siempre compatibles.
- Botón "Añadir al carrito" deshabilitado sin stock.

### DashboardLayout
- Sidebar + `<Outlet />` de React Router.
- Sidebar para **Admin**: Dashboard Admin + Inventario.
- Sidebar para **Seller**: Mi Dashboard + Mi Inventario.

---

## 7. Páginas

### Home `/`
1. **Hero:** Buscador Marca → Modelo → Año (datos de `carDatabase`). Click en "Buscar Piezas" → `/catalog`.
2. **Features:** 3 cards de propuesta de valor.
3. **Recomendaciones IA:** Grid de productos destacados.
4. **CTA B2B:** Banner para talleres/distribuidores.

---

### Catalog `/catalog`
Sidebar de filtros + grid de `<ProductCard />`.

| Filtro | Tipo |
|---|---|
| Búsqueda por nombre | Texto libre |
| Categoría | Select (Iluminación, Multimedia, Frenos, Suspensión) |
| Marca de pieza | Select dinámico |
| Vehículo (IA) | Select de `userVehicles` para verificar compatibilidad |

---

### ProductDetails `/product/:id`
- Breadcrumb Inicio → Catálogo → Producto.
- **Caja de Análisis IA:** Compatibilidad con Toyota Hilux 2021 (hardcodeado).
- Precio, stock, botones Añadir al Carrito y Comprar Ahora.
- Trust badges: Garantía 1 año + Envío Nacional.
- Sección de productos relacionados (otros 4 productos del catálogo).

---

### Cart `/cart`
- Estado vacío con link al catálogo.
- Lista de items con controles de cantidad (+/-) y botón eliminar.
- Resumen: subtotal, envío gratis, total. → Botón **Proceder al Pago**.

---

### Checkout `/checkout`
**Formulario de envío:** Nombre, Teléfono, Dirección, Ciudad, CP.

**Métodos de pago:**
- 💳 **Tarjeta:** Campos número, vencimiento y CVC.
- 📱 **PSE:** Mensaje de redirección.
- 💵 **Efectivo:** Info de puntos Efecty/Baloto.

**Al confirmar:** espera 1.5s → `addOrder()` → `clearCart()` → pantalla de éxito con links a Pedidos y Catálogo.

---

### OrdersHistory `/orders`
Para roles `buyer` y `admin`.
- Lista de pedidos con ID, fecha, total y badge de estado.
- Items del pedido con subtotales.
- Preview de seguimiento (línea de tiempo mini).
- Botón → `/tracking/:id`.

---

### OrderTracking `/tracking/:id`
Para roles `buyer` y `admin`. Si el pedido no existe → redirige a `/orders`.

- **Columna principal:** Línea de tiempo vertical con estados del envío. Si el paso actual es "En Camino", muestra ubicación (hardcodeada).
- **Columna lateral:** Estado actual, dirección de entrega y teléfono transportadora.

---

### Login `/login`
Diseño en **dos columnas**:

**Panel izquierdo (branding):**
- Logo y descripción de CarGear.
- Tarjetas de cuentas demo clicables → al hacer clic se rellenan automáticamente los campos del formulario.

**Panel derecho (formulario):**
- Campo de **correo electrónico** con ícono.
- Campo de **contraseña** con botón mostrar/ocultar (👁️).
- Mensaje de **error** si las credenciales son incorrectas.
- **Spinner** de carga durante la validación (800ms simulado).
- Al autenticar → `login(email, password)` → redirección según rol.

---

### AdminDashboard `/dashboard/admin`
Solo rol `admin`.

**KPIs:** Ventas Totales ($15.4M), Pedidos Activos (42), Nuevos Usuarios (120), Alertas Stock (5).

**Gráficas (Recharts):**
- `LineChart` — Ventas mensuales Ene-Jun 2026.
- `BarChart` — Inventario por categoría.
- `PieChart` (donut) — Distribución de tipos de usuario.

---

### SellerStats `/dashboard/seller`
Roles `seller` y `admin`.

**KPIs:** Ventas del Mes ($4.25M), Artículos Vendidos (38), Alertas Stock (dinámico), Valor Inventario (calculado).

**Gráfica:** `LineChart` — Tendencia de ventas semanal.

---

### SellerDashboard `/dashboard/seller/inventory`
Roles `seller` y `admin`. CRUD de productos.

**Tabla:** Imagen, Nombre, Categoría, Precio, Stock (badge por nivel), Estado, Acciones.

**Acciones:**
- 🔍 Buscador por nombre.
- ➕ Nuevo Producto → Modal.
- ✏️ Editar → Modal pre-cargado.
- 🗑️ Eliminar → `window.confirm`.

> Los cambios son solo en memoria. No persisten al recargar.

---

## 8. Datos Mock — `src/data/mockData.js`

### Productos

| ID | Nombre | Categoría | Precio | Stock |
|---|---|---|---|---|
| 1 | Faro LED X-Treme | Iluminación | $120,000 | 15 |
| 2 | Pantalla Android 10" CarPlay | Multimedia | $450,000 | 5 |
| 3 | Pastillas Cerámicas Pro | Frenos | $85,000 | 30 |
| 4 | Amortiguadores Gas-A-Just | Suspensión | $320,000 | 0 |
| 5 | Exploradoras LED Dual Color | Iluminación | $185,000 | 12 |

Cada producto incluye: `compatibility[]`, `specs{}`, `rating`, `aiRecommended`.

### Vehículos de usuario (6)
Toyota Hilux, Mazda 3, Ford Ranger, VW Jetta, Nissan Frontier, Chevrolet Tracker.

### carDatabase
6 marcas con sus modelos y años disponibles para el buscador del Home.

### Pedidos de ejemplo (2)
- `ORD-98234A` — En Camino (Servientrega).
- `ORD-77612B` — Entregado (Coordinadora).

---

## 9. Design System

Tema oscuro definido en `src/index.css`:

| Token CSS | Valor | Uso |
|---|---|---|
| `--primary` | `#00e5ff` | Acento principal (cyan) |
| `--secondary` | `#ff6b00` | Acento secundario (naranja) |
| `--danger` | `#ff3366` | Errores y alertas críticas |
| `--warning` | `#ffab00` | Alertas de stock |
| `--success` | `#00e676` | Estados positivos |
| `--bg-dark` | `#0a0a0a` | Fondo principal |

### Clases de utilidad

```
.bg-glass       → Glassmorphism (backdrop-filter + fondo translúcido)
.text-gradient  → Gradiente cyan → naranja en texto
.btn-primary    → Botón con fondo cyan
.btn-secondary  → Botón con borde
.card           → Contenedor con borde y padding
.flex-center    → display:flex + align-items:center
.flex-between   → flex + justify-content:space-between
.grid-cols-N    → Grid de N columnas (1 a 4)
.text-muted     → Texto gris secundario
```

---

## 10. Limitaciones del Modo Demo

| Limitación | Detalle |
|---|---|
| Sin backend | Autenticación y datos 100% simulados |
| Inventario volátil | Cambios del Seller se pierden al recargar |
| Pedidos persistentes | Se guardan en `localStorage` |
| Compatibilidad fija | ProductDetails hardcodeado para Toyota Hilux 2021 |
| Pagos simulados | Checkout no procesa cobros reales |
| Buscador del Home | Siempre redirige al catálogo general sin filtrar |

---

## 11. Guía de Uso por Rol

### Comprador (B2C)
1. `/login` → email: `comprador@cargear.com` / contraseña: `comprador123`
2. Home → buscar vehículo → **Buscar Piezas**
3. Catálogo → filtrar → ver compatibilidad IA
4. **Especificaciones** → **Añadir al Carrito**
5. Carrito → **Proceder al Pago** → confirmar
6. **Mis Pedidos** → **Ver Seguimiento**

### Vendedor (B2B)
1. `/login` → email: `taller@cargear.com` / contraseña: `taller123`
2. **Mi Dashboard** → ver ventas y métricas semanales
3. **Mi Inventario** → crear, editar o eliminar productos

### Administrador
1. `/login` → email: `admin@cargear.com` / contraseña: `admin123`
2. **Dashboard Admin** → KPIs globales y gráficas
3. **Inventario** → gestión completa de productos
4. **Mis Pedidos** → historial completo de órdenes

---

*© 2026 CarGear — Documentación técnica del proyecto.*
