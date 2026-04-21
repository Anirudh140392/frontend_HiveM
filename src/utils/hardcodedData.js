// Hardcoded data for HiveM project
// This file replaces all backend API calls

export const AVAILABILITY_DATA = {
  overview: {
    stockAvailability: 82.4,
    prevStockAvailability: 78.1,
    fillRate: 94.2,
    prevFillRate: 92.5,
    deliveryTime: "24 mins",
    skuCount: 1240,
    psl: 450000,
    prevPsl: 420000
  },
  doi: {
    doi: 15.4,
    prevDoi: 16.2
  },
  metroCity: {
    isMetroCity: true,
    stockAvailability: 85.6,
    prevStockAvailability: 82.1
  },
  platformKpi: {
    rows: [
      { kpi: "OSA %", Blinkit: 76.8, Instamart: 84.2, Zepto: 81.5 },
      { kpi: "Out of Stock %", Blinkit: 23.2, Instamart: 15.8, Zepto: 18.5 }
    ],
    columns: ["kpi", "Blinkit", "Instamart", "Zepto"]
  },
  formatKpi: {
    rows: [
      { kpi: "OSA %", Tubs: 88.5, Cones: 72.1, Sticks: 79.4 },
      { kpi: "Out of Stock %", Tubs: 11.5, Cones: 27.9, Sticks: 20.6 }
    ],
    columns: ["kpi", "Tubs", "Cones", "Sticks"]
  },
  cityKpi: {
    rows: [
      { kpi: "OSA %", Mumbai: 85.4, Delhi: 78.2, Bangalore: 82.1 },
      { kpi: "Out of Stock %", Mumbai: 14.6, Delhi: 21.8, Bangalore: 17.9 }
    ],
    columns: ["kpi", "Mumbai", "Delhi", "Bangalore"]
  },
  osaDetail: [
    { name: "Ice Cream Tub 500ml", platform: "Blinkit", sku: "SKU001", brand: "Hiveminds", format: "Tubs", avgSelected: 85, status: "Healthy", values: Array(31).fill(85) },
    { name: "Chocolate Cone", platform: "Instamart", sku: "SKU002", brand: "Hiveminds", format: "Cones", avgSelected: 72, status: "Watch", values: Array(31).fill(72) }
  ],
  kpiTrends: {
    timeSeries: Array.from({ length: 30 }, (_, i) => ({
      date: `2026-04-${i + 1}`,
      Osa: 80 + Math.random() * 5,
      Fillrate: 90 + Math.random() * 5
    }))
  }
};

export const MARKET_SHARE_DATA = {
  categorySize: {
    size: 220220000,
    prevSize: 126720000,
    delta: 73.8,
    trend: [10, 20, 30, 40, 50, 60, 73.8]
  },
  marketLeader: {
    brand: "Amul",
    sales: 77460000,
    prevSales: 40530000,
    delta: 91.1,
    trend: [5, 15, 25, 45, 65, 75, 91.1]
  },
  hivemindsWrigley: {
    sales: 6900000,
    prevSales: 4880000,
    delta: 38.1,
    trend: [2, 5, 10, 20, 30, 35, 38.1]
  }
};

export const PRICING_DATA = {
  kpis: {
    discount: { value: 12.2, change: -0.2, sparklineData: [ 13, 12.5, 12.8, 12.0, 12.2 ] },
    weightedDiscount: { value: 11.3, change: 0.5, sparklineData: [ 10.5, 10.8, 11.0, 11.5, 11.3 ] },
    asp: { value: 96.15, change: -2.2, sparklineData: [ 99, 98.5, 97, 96.5, 96.15 ] }
  },
  ecpComparison: [
    { brand: "Our Brand", platform: "Blinkit", ecp: 350, mrp: 400 },
    { brand: "Our Brand", platform: "Instamart", ecp: 360, mrp: 400 },
    { brand: "Competitor A", platform: "Blinkit", ecp: 370, mrp: 420 }
  ],
  ecpByBrand: [
    { brand: "Our Brand", ecp: 380, mrp: 450, ecpPerUnit: 0.8, rpi: 1.0 },
    { brand: "Competitor A", ecp: 410, mrp: 480, ecpPerUnit: 0.9, rpi: 1.1 }
  ],
  brandPriceOverview: [
    { brand: "Our Brand", platforms: { Blinkit: 350, Instamart: 360, Zepto: 355 } }
  ],
  oneViewPriceGrid: [
    { product: "Vanilla Tub 500ml", Blinkit: 350, Instamart: 360, Zepto: 355 }
  ],
  brandDiscountTrend: {
    months: ["Jan", "Feb", "Mar", "Apr", "May"],
    series: [
      { name: "Our Brand", data: [15, 16, 14, 15, 17] },
      { name: "Competitor A", data: [12, 13, 12, 14, 13] }
    ]
  },
  ecpByCity: [
    { city: "Mumbai", ecp: 385 },
    { city: "Delhi", ecp: 375 },
    { city: "Bangalore", ecp: 380 }
  ],
  discountByCategory: [
    { category: "Tubs", Blinkit: 15, Instamart: 14, Zepto: 16 },
    { category: "Cones", Blinkit: 10, Instamart: 12, Zepto: 11 }
  ],
  ecpWeekdayWeekend: [
    { brand: "Our Brand", weekday: 350, weekend: 340 },
    { brand: "Competitor A", weekday: 370, weekend: 380 }
  ],
  ecpWeekdayWeekendSummary: { brand: "All Brands", weekday: 360, weekend: 365 }
};

export const PRICING_INSIGHTS_DATA = {
  pd_my: [
    { id: 1, brand: "Our Brand", badge: "High Impact", platform: "Blinkit", cat: "Tubs", title: "Vanilla Tub 500ml", size: "500ml", delta: -15.5, cities: [{ name: "Mumbai", discount: 25, change: -5 }, { name: "Delhi", discount: 22, change: -3 }] },
    { id: 2, brand: "Our Brand", badge: "Medium Impact", platform: "Zepto", cat: "Cones", title: "Chocolate Cone 120ml", size: "120ml", delta: -10.2, cities: [{ name: "Bangalore", discount: 15, change: -4 }] }
  ],
  pi_my: [
    { id: 3, brand: "Our Brand", badge: "Low Impact", platform: "Instamart", cat: "Sticks", title: "Mango Stick 80ml", size: "80ml", delta: 5.4, cities: [{ name: "Pune", discount: 5, change: 2 }] }
  ],
  pd_comp: [
    { id: 4, brand: "Competitor A", badge: "Competitive Alert", platform: "Blinkit", cat: "Tubs", title: "Comp Vanilla 500ml", size: "500ml", delta: -18.2, cities: [{ name: "Mumbai", discount: 30, change: -8 }] }
  ],
  pi_comp: [
    { id: 5, brand: "Competitor B", badge: "Strategic Op", platform: "Zepto", cat: "Cones", title: "Comp Choco 120ml", size: "120ml", delta: 8.1, cities: [{ name: "Delhi", discount: 8, change: 3 }] }
  ]
};

export const PRICING_DIMENSION_DATA = [
  {
    key: "blinkit",
    name: "Blinkit",
    data: {
      discount: { value: 15.5, change: 1.2, dir: "up" },
      pricePerUnit: { value: 0.85, change: -0.02, dir: "down" },
      asp: { value: 380, change: -5, dir: "down" },
      price_index: { value: 105, change: 2, dir: "up" },
      revenue_per_index: { value: 1.2, change: 0.1, dir: "up" }
    }
  },
  {
    key: "zepto",
    name: "Zepto",
    data: {
      discount: { value: 12.8, change: -0.5, dir: "down" },
      pricePerUnit: { value: 0.92, change: 0.01, dir: "up" },
      asp: { value: 410, change: 10, dir: "up" },
      price_index: { value: 98, change: -1, dir: "down" },
      revenue_per_index: { value: 0.95, change: -0.05, dir: "down" }
    }
  },
  {
    key: "instamart",
    name: "Instamart",
    data: {
      discount: { value: 14.2, change: 0.8, dir: "up" },
      pricePerUnit: { value: 0.88, change: 0, dir: "neutral" },
      asp: { value: 395, change: 2, dir: "up" },
      price_index: { value: 102, change: 0.5, dir: "up" },
      revenue_per_index: { value: 1.1, change: 0.02, dir: "up" }
    }
  }
];

export const VISIBILITY_DATA = {
  overview: {
    cards: [
      {
        title: "Overall Weighted SOS",
        value: "19.6%",
        sub: "Share of shelf across all active SKUs",
        change: "▲4.3% (from 15.3%)",
        sparklineData: [12, 14, 13, 15, 17, 19.6]
      },
      {
        title: "Sponsored Weighted SOS",
        value: "17.6%",
        sub: "Share of shelf for sponsored placements",
        change: "▼8.6% (from 26.2%)",
        sparklineData: [26, 24, 22, 20, 18, 17.6]
      }
    ]
  },
  matrix: {
    platformData: {
      columns: ["kpi", "Blinkit", "Instamart", "Zepto"],
      rows: [
        { kpi: "Visibility Share", Blinkit: 18.5, Instamart: 21.2, Zepto: 19.1 }
      ]
    },
    formatData: {
      columns: ["kpi", "Tubs", "Cones", "Sticks"],
      rows: [
        { kpi: "Visibility Share", Tubs: 22.4, Cones: 15.6, Sticks: 18.9 }
      ]
    }
  },
  keywords: [
    { keyword: "ice cream", rank: 2, visibility: 25.4 },
    { keyword: "chocolate tub", rank: 5, visibility: 18.2 }
  ],
  gainersAndDrainers: {
    gainers: [
      { product: "Vanilla Tub", change: 5.2 },
      { product: "Mango Bar", change: 3.1 }
    ],
    drainers: [
      { product: "Coffee Cone", change: -4.5 },
      { product: "Strawberry Stick", change: -2.8 }
    ]
  }
};
