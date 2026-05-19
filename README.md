# 🚗 CarGear — Marketplace de Repuestos Automotrices

Plataforma **B2B/B2C** de repuestos automotrices con motor de recomendación por IA.  
Desarrollada con **React 18 + Vite 5**.

---

## ⚡ Inicio Rápido

```bash
npm install
npm run dev
```

Disponible en: **http://localhost:5173/**

---

## 🛠️ Stack

| Tecnología | Uso |
|---|---|
| React 18 + Vite 5 | Framework + Bundler |
| React Router DOM 7 | Enrutamiento SPA |
| Recharts | Gráficas y dashboards |
| Lucide React | Íconos |
| CSS Vanilla | Estilos por componente |
| localStorage | Persistencia de pedidos |

---

## 👤 Roles (Modo Demo)

Accede a `/login` y elige tu perfil:

| Rol | Redirige a | Acceso |
|---|---|---|
| Comprador | `/` | Catálogo, Carrito, Pedidos |
| Vendedor | `/dashboard/seller` | Portal B2B, Inventario |
| Administrador | `/dashboard/admin` | Todo + Panel Global |

---

## 🗺️ Rutas Principales

```
/               → Inicio
/catalog        → Catálogo de productos
/product/:id    → Detalle de producto
/cart           → Carrito
/checkout       → Pago
/orders         → Mis pedidos [buyer, admin]
/tracking/:id   → Seguimiento de pedido [buyer, admin]
/dashboard/admin            → Dashboard Admin [admin]
/dashboard/seller           → Stats Vendedor [seller, admin]
/dashboard/seller/inventory → Inventario [seller, admin]
```

---

## 📚 Documentación Completa

Ver [`DOCUMENTACION.md`](./DOCUMENTACION.md) para:
- Estructura detallada del proyecto
- API de contextos (Auth, Cart, Orders)
- Descripción de cada página y componente
- Datos mock y design system

---

*© 2026 CarGear — Todos los derechos reservados.*
