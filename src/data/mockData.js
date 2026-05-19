export const products = [
  {
    id: 1,
    name: "Faro LED Alta Potencia X-Treme",
    category: "Iluminación",
    brand: "LumiTech",
    price: 120000,
    rating: 4.8,
    image: "/img/carro.jpg",
    compatibility: ["Toyota Hilux 2018-2023", "Ford Ranger 2019-2023"],
    inStock: 15,
    aiRecommended: true,
    specs: {
      "Potencia": "8000 Lumens",
      "Temperatura": "6500K (Blanco Frío)",
      "Voltaje": "12V-24V",
      "Vida Útil": "50,000 horas"
    }
  },
  {
    id: 2,
    name: "Pantalla Táctil Android 10\" con CarPlay",
    category: "Multimedia",
    brand: "SmartNav",
    price: 450000,
    rating: 4.5,
    image: "/img/carro1.jpg",
    compatibility: ["Universal (Requiere Marco Adaptador)"],
    inStock: 5,
    aiRecommended: false,
    specs: {
      "Pantalla": "10 pulgadas IPS HD",
      "RAM": "4GB",
      "Almacenamiento": "64GB",
      "Conectividad": "WiFi, Bluetooth 5.0, GPS"
    }
  },
  {
    id: 3,
    name: "Pastillas de Freno Cerámicas Pro Performance",
    category: "Frenos",
    brand: "BrakeMaster",
    price: 85000,
    rating: 4.9,
    image: "/img/carro2.jpg",
    compatibility: ["Mazda 3 2014-2018", "Mazda CX-5 2013-2017"],
    inStock: 30,
    aiRecommended: true,
    specs: {
      "Material": "Cerámica Avanzada",
      "Posición": "Delanteras",
      "Reducción de Polvo": "Sí, 90%",
      "Ruido": "Ultra silencioso"
    }
  },
  {
    id: 4,
    name: "Amortiguadores Deportivos Gas-A-Just",
    category: "Suspensión",
    brand: "KYB",
    price: 320000,
    rating: 4.6,
    image: "/img/carro3.jpg",
    compatibility: ["Volkswagen Jetta 2011-2018", "Volkswagen Golf 2015-2021"],
    inStock: 0,
    aiRecommended: false,
    specs: {
      "Tipo": "Gas Monotubo",
      "Posición": "Traseros",
      "Ajustabilidad": "Autoajustable",
      "Uso": "Calle y Track Deportivo"
    }
  },
  {
    id: 5,
    name: "Kit Exploradoras LED Dual Color",
    category: "Iluminación",
    brand: "LumiTech",
    price: 185000,
    rating: 4.7,
    image: "/img/carro.jpg",
    compatibility: ["Toyota Hilux 2016-2023", "Nissan Frontier 2018-2023"],
    inStock: 12,
    aiRecommended: true,
    specs: {
      "Potencia": "6000 Lumens",
      "Colores": "Blanco 6000K / Amarillo 3000K",
      "Resistencia al Agua": "IP68"
    }
  }
];

export const userVehicles = [
  { id: 1, make: "Toyota", model: "Hilux", year: 2021 },
  { id: 2, make: "Mazda", model: "3", year: 2016 },
  { id: 3, make: "Ford", model: "Ranger", year: 2020 },
  { id: 4, make: "Volkswagen", model: "Jetta", year: 2018 },
  { id: 5, make: "Nissan", model: "Frontier", year: 2022 },
  { id: 6, make: "Chevrolet", model: "Tracker", year: 2019 }
];

export const carDatabase = {
  Toyota: {
    Hilux: [2018, 2019, 2020, 2021, 2022, 2023],
    Corolla: [2019, 2020, 2021, 2022, 2023],
    Prado: [2015, 2016, 2017, 2018, 2019, 2020, 2021]
  },
  Mazda: {
    "3": [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    "CX-5": [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
  },
  Ford: {
    Ranger: [2018, 2019, 2020, 2021, 2022, 2023],
    Explorer: [2016, 2017, 2018, 2019, 2020]
  },
  Volkswagen: {
    Jetta: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
    Golf: [2015, 2016, 2017, 2018, 2019, 2020, 2021]
  },
  Nissan: {
    Frontier: [2018, 2019, 2020, 2021, 2022, 2023],
    March: [2015, 2016, 2017, 2018, 2019, 2020]
  },
  Chevrolet: {
    Tracker: [2019, 2020, 2021, 2022, 2023],
    Onix: [2020, 2021, 2022, 2023]
  }
};

export const adminStats = {
  totalSales: 15400000,
  activeOrders: 42,
  lowStockItems: 5,
  newUsers: 120
};

export const mockOrders = [
  {
    id: "ORD-98234A",
    date: "2026-05-15",
    total: 310000,
    status: "En Camino",
    items: [
      { name: "Faro LED Alta Potencia X-Treme", quantity: 1, price: 120000 },
      { name: "Pastillas de Freno Cerámicas", quantity: 2, price: 85000 }
    ],
    tracking: {
      provider: "Servientrega",
      trackingNumber: "SV-100293848",
      steps: [
        { status: "Pedido Confirmado", date: "2026-05-15 10:30", completed: true },
        { status: "Empacado", date: "2026-05-15 14:00", completed: true },
        { status: "En Camino", date: "2026-05-16 08:15", completed: true, current: true },
        { status: "Entregado", date: "Estimado: 2026-05-19", completed: false }
      ]
    }
  },
  {
    id: "ORD-77612B",
    date: "2026-04-20",
    total: 450000,
    status: "Entregado",
    items: [
      { name: "Pantalla Táctil Android 10\"", quantity: 1, price: 450000 }
    ],
    tracking: {
      provider: "Coordinadora",
      trackingNumber: "CO-99882211",
      steps: [
        { status: "Pedido Confirmado", date: "2026-04-20 09:00", completed: true },
        { status: "Empacado", date: "2026-04-20 12:30", completed: true },
        { status: "En Camino", date: "2026-04-21 07:00", completed: true },
        { status: "Entregado", date: "2026-04-22 15:45", completed: true, current: true }
      ]
    }
  }
];
