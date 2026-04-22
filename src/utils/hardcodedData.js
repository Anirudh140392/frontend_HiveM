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
      { kpi: "OSA", Blinkit: 76.8, Instamart: 84.2, Zepto: 81.5 },
      { kpi: "DOI", Blinkit: 15.2, Instamart: 14.8, Zepto: 16.1 },
      { kpi: "PSL", Blinkit: 45000, Instamart: 38000, Zepto: 42000 },
      { kpi: "BUY BOX %", Blinkit: 92.1, Instamart: 95.4, Zepto: 93.8 },
      { kpi: "DELIVERY TIME", Blinkit: 22, Instamart: 28, Zepto: 24 },
      { kpi: "SKU COUNT", Blinkit: 1240, Instamart: 1180, Zepto: 1210 }
    ],
    columns: ["kpi", "Blinkit", "Instamart", "Zepto"]
  },
  formatKpi: {
    rows: [
      { kpi: "OSA", Tubs: 88.5, Cones: 72.1, Sticks: 79.4 },
      { kpi: "DOI", Tubs: 14.2, Cones: 18.5, Sticks: 16.8 },
      { kpi: "PSL", Tubs: 120000, Cones: 85000, Sticks: 95000 },
      { kpi: "BUY BOX %", Tubs: 96.2, Cones: 88.4, Sticks: 92.1 },
      { kpi: "DELIVERY TIME", Tubs: 24, Cones: 24, Sticks: 24 },
      { kpi: "SKU COUNT", Tubs: 450, Cones: 320, Sticks: 470 }
    ],
    columns: ["kpi", "Tubs", "Cones", "Sticks"]
  },
  cityKpi: {
    rows: [
      { kpi: "OSA", Mumbai: 85.4, Delhi: 78.2, Bangalore: 82.1 },
      { kpi: "DOI", Mumbai: 14.8, Delhi: 17.2, Bangalore: 15.5 },
      { kpi: "PSL", Mumbai: 150000, Delhi: 120000, Bangalore: 140000 },
      { kpi: "BUY BOX %", Mumbai: 94.5, Delhi: 91.2, Bangalore: 93.8 },
      { kpi: "DELIVERY TIME", Mumbai: 24, Delhi: 28, Bangalore: 24 },
      { kpi: "SKU COUNT", Mumbai: 1240, Delhi: 1100, Bangalore: 1180 }
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
  },
  subCategoryKpi: {
    subCategories: ["Candies", "Gums", "Filled Bars", "Gift Packs", "Tubs", "Cones"],
    selectedSubCategory: ["Candies"],
    brands: [
      {
        brand: "Amul",
        metrics: {
          marketShare: { val: 24.5, delta: 3.2, status: "Healthy" },
          overallSov: { val: 18.2, delta: 1.5, status: "Healthy" },
          paidSov: { val: 7.4, delta: -0.8, status: "Watch" }
        }
      },
      {
        brand: "Mother Dairy",
        metrics: {
          marketShare: { val: 18.2, delta: -2.1, status: "Watch" },
          overallSov: { val: 12.4, delta: -1.2, status: "Watch" },
          paidSov: { val: 5.8, delta: -0.5, status: "Action" }
        }
      },
      {
        brand: "Hiveminds",
        metrics: {
          marketShare: { val: 32.1, delta: 5.4, status: "Healthy" },
          overallSov: { val: 24.5, delta: 4.2, status: "Healthy" },
          paidSov: { val: 7.6, delta: 1.2, status: "Healthy" }
        }
      },
      {
        brand: "Kwality Walls",
        metrics: {
          marketShare: { val: 15.8, delta: -4.5, status: "Action" },
          overallSov: { val: 10.2, delta: -3.2, status: "Action" },
          paidSov: { val: 5.6, delta: -1.3, status: "Action" }
        }
      },
      {
        brand: "Havmor",
        metrics: {
          marketShare: { val: 12.4, delta: 0.8, status: "Watch" },
          overallSov: { val: 9.5, delta: 0.2, status: "Watch" },
          paidSov: { val: 4.2, delta: 0.5, status: "Healthy" }
        }
      }
    ]
  },
  drilldownData: [
    {
      id: "brand-hiveminds",
      label: "Hiveminds",
      metrics: { share: 32.1, mrp: 450 },
      children: [
        {
          id: "subbrand-vanilla",
          label: "Vanilla Series",
          metrics: { share: 15.4, mrp: 400 },
          children: [
            { id: "sku-vanilla-500", label: "Vanilla Tub 500ml", metrics: { share: 8.2, mrp: 350 } },
            { id: "sku-vanilla-100", label: "Vanilla Cup 100ml", metrics: { share: 7.2, mrp: 50 } }
          ]
        }
      ]
    },
    {
      id: "brand-amul",
      label: "Amul",
      metrics: { share: 24.5, mrp: 380 },
      children: []
    },
    {
      id: "brand-mother-dairy",
      label: "Mother Dairy",
      metrics: { share: 18.2, mrp: 410 },
      children: []
    }
  ]
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

export const PRICING_DIMENSION_DATA = [
  {
    key: "blinkit",
    name: "Blinkit",
    data: {
      discount: { value: 12.5, change: 1.2, dir: "up" },
      pricePerUnit: { value: 0.85, change: -0.05, dir: "down" },
      asp: { value: 120.5, change: 5.2, dir: "up" },
      offtake: { value: 45000, change: 2500, dir: "up" }
    }
  },
  {
    key: "instamart",
    name: "Instamart",
    data: {
      discount: { value: 11.2, change: -0.8, dir: "down" },
      pricePerUnit: { value: 0.92, change: 0.02, dir: "up" },
      asp: { value: 135.2, change: -2.1, dir: "down" },
      offtake: { value: 38000, change: -1200, dir: "down" }
    }
  }
];

export const PRICING_INSIGHTS_DATA = {
  pd_my: [
    {
      id: 1,
      brand: "Hiveminds",
      title: "Vanilla Tub 500ml",
      badge: "Price Drop",
      platform: "Blinkit",
      cat: "Tubs",
      size: "500ml",
      delta: -12.5,
      cities: [
        { name: "Mumbai", discount: 15, change: -5, osa: 85, offtakes: 1200 },
        { name: "Delhi", discount: 12, change: -3, osa: 78, offtakes: 950 },
        { name: "Bangalore", discount: 14, change: -4, osa: 82, offtakes: 1100 },
        { name: "Pune", discount: 10, change: -2, osa: 80, offtakes: 800 }
      ]
    },
    {
      id: 2,
      brand: "Hiveminds",
      title: "Chocolate Cone 120ml",
      badge: "Price Drop",
      platform: "Instamart",
      cat: "Cones",
      size: "120ml",
      delta: -8.2,
      cities: [
        { name: "Bangalore", discount: 10, change: -4, osa: 90, offtakes: 2100 },
        { name: "Chennai", discount: 8, change: -2, osa: 88, offtakes: 1500 },
        { name: "Hyderabad", discount: 9, change: -3, osa: 85, offtakes: 1800 }
      ]
    },
    {
      id: 6,
      brand: "Hiveminds",
      title: "Mango Bar 80ml",
      badge: "Price Drop",
      platform: "Zepto",
      cat: "Sticks",
      size: "80ml",
      delta: -15.4,
      cities: [
        { name: "Kolkata", discount: 18, change: -6, osa: 84, offtakes: 2500 },
        { name: "Ahmedabad", discount: 15, change: -4, osa: 80, offtakes: 1200 }
      ]
    },
    {
      id: 7,
      brand: "Hiveminds",
      title: "Pistachio Cup 100ml",
      badge: "Price Drop",
      platform: "Blinkit",
      cat: "Cups",
      size: "100ml",
      delta: -10.0,
      cities: [
        { name: "Delhi", discount: 12, change: -5, osa: 75, offtakes: 900 },
        { name: "Mumbai", discount: 14, change: -4, osa: 82, offtakes: 1100 }
      ]
    }
  ],
  pi_my: [
    {
      id: 3,
      brand: "Hiveminds",
      title: "Butterscotch Tub 1L",
      badge: "Price Increase",
      platform: "Zepto",
      cat: "Tubs",
      size: "1L",
      delta: 5.4,
      cities: [
        { name: "Hyderabad", discount: 5, change: 2, osa: 92, offtakes: 3000 },
        { name: "Pune", discount: 4, change: 1, osa: 85, offtakes: 1800 },
        { name: "Mumbai", discount: 6, change: 3, osa: 88, offtakes: 2200 }
      ]
    },
    {
      id: 8,
      brand: "Hiveminds",
      title: "Kesar Pista 500ml",
      badge: "Price Increase",
      platform: "Instamart",
      cat: "Tubs",
      size: "500ml",
      delta: 4.2,
      cities: [
        { name: "Bangalore", discount: 3, change: 1.5, osa: 90, offtakes: 1400 }
      ]
    },
    {
      id: 11,
      brand: "Hiveminds",
      title: "Vanilla Stick 65ml",
      badge: "Price Increase",
      platform: "Blinkit",
      cat: "Sticks",
      size: "65ml",
      delta: 3.5,
      cities: [
        { name: "Delhi", discount: 2, change: 1.2, osa: 85, offtakes: 3500 }
      ]
    }
  ],
  pd_comp: [
    {
      id: 4,
      brand: "Amul",
      title: "Tricone Butterscotch",
      badge: "Price Drop",
      platform: "Blinkit",
      cat: "Cones",
      size: "120ml",
      delta: -15.0,
      cities: [
        { name: "Mumbai", discount: 20, change: -10, osa: 95, offtakes: 5000 },
        { name: "Delhi", discount: 18, change: -8, osa: 90, offtakes: 4200 },
        { name: "Bangalore", discount: 19, change: -9, osa: 92, offtakes: 4800 }
      ]
    },
    {
      id: 9,
      brand: "Kwality Walls",
      title: "Cornetto Choco",
      badge: "Price Drop",
      platform: "Instamart",
      cat: "Cones",
      size: "120ml",
      delta: -12.2,
      cities: [
        { name: "Chennai", discount: 15, change: -6, osa: 88, offtakes: 3500 }
      ]
    },
    {
      id: 12,
      brand: "Mother Dairy",
      title: "Classic Malai Cup",
      badge: "Price Drop",
      platform: "Zepto",
      cat: "Cups",
      size: "100ml",
      delta: -9.5,
      cities: [
        { name: "Pune", discount: 12, change: -4, osa: 84, offtakes: 1800 }
      ]
    }
  ],
  pi_comp: [
    {
      id: 5,
      brand: "Mother Dairy",
      title: "Classic Vanilla 700ml",
      badge: "Price Increase",
      platform: "Instamart",
      cat: "Tubs",
      size: "700ml",
      delta: 10.2,
      cities: [
        { name: "Bangalore", discount: 2, change: 5, osa: 88, offtakes: 1200 },
        { name: "Kolkata", discount: 3, change: 4, osa: 82, offtakes: 900 }
      ]
    },
    {
      id: 10,
      brand: "Havmor",
      title: "Lonavala Special",
      badge: "Price Increase",
      platform: "Zepto",
      cat: "Tubs",
      size: "1L",
      delta: 8.5,
      cities: [
        { name: "Pune", discount: 1, change: 4, osa: 90, offtakes: 1800 }
      ]
    },
    {
      id: 13,
      brand: "Amul",
      title: "Real Milk Ice Cream",
      badge: "Price Increase",
      platform: "Blinkit",
      cat: "Tubs",
      size: "500ml",
      delta: 6.2,
      cities: [
        { name: "Mumbai", discount: 0, change: 2.5, osa: 94, offtakes: 4500 }
      ]
    }
  ]
};

export const WATCHTOWER_DATA = {
  platformOverview: [
    {
      key: "blinkit",
      label: "Blinkit",
      offtakeShare: 35.4,
      columns: [
        { title: "Offtakes", value: "45,000", change: { text: "+12.5%", positive: true } },
        { title: "Spend", value: "₹ 1.2L", change: { text: "+5.2%", positive: true } },
        { title: "Availability", value: "88.2%", change: { text: "-2.1%", positive: false } },
        { title: "Market Share", value: "32.1%", change: { text: "+4.3%", positive: true } },
        { title: "Category Size", value: "₹ 22Cr", change: { text: "+73.8%", positive: true } },
        { title: "Conversion", value: "14.2%", change: { text: "+1.5%", positive: true } },
        { title: "CPC", value: "₹ 12.5", change: { text: "-0.8%", positive: false } }
      ]
    },
    {
      key: "instamart",
      label: "Instamart",
      offtakeShare: 32.1,
      columns: [
        { title: "Offtakes", value: "38,000", change: { text: "+8.4%", positive: true } },
        { title: "Spend", value: "₹ 95K", change: { text: "+2.1%", positive: true } },
        { title: "Availability", value: "92.5%", change: { text: "+1.5%", positive: true } },
        { title: "Market Share", value: "28.4%", change: { text: "-1.2%", positive: false } },
        { title: "Category Size", value: "₹ 20Cr", change: { text: "+65.2%", positive: true } },
        { title: "Conversion", value: "12.8%", change: { text: "-0.5%", positive: false } },
        { title: "CPC", value: "₹ 14.2", change: { text: "+0.5%", positive: true } }
      ]
    }
  ],
  products: ["Vanilla Tub 500ml", "Chocolate Cone 120ml", "Mango Bar 80ml"]
};

export const VISIBILITY_DATA = {
  overview: {
    cards: [
      {
        id: "weighted_sos",
        title: "Overall Weighted SOS",
        value: "19.6%",
        sub: "Share of shelf across all active SKUs",
        change: "▲4.3 pts (from 15.3%)",
        changeColor: "green",
        prevText: "vs Previous Period",
        sparklineData: [12, 14, 13, 15, 17, 19.6],
        extra: "New launches contributing: 7 SKUs",
        extraChange: "▲12.5%",
        extraChangeColor: "green",
      },
      {
        id: "sponsored_sos",
        title: "Sponsored Weighted SOS",
        value: "17.6%",
        sub: "Share of shelf for sponsored placements",
        change: "▼8.6 pts (from 26.2%)",
        changeColor: "red",
        prevText: "vs Previous Period",
        sparklineData: [26, 24, 22, 20, 18, 17.6],
        extra: "High risk keywords: 5",
        extraChange: "",
        extraChangeColor: "red",
      },
      {
        id: "organic_sos",
        title: "Organic Weighted SOS",
        value: "20.7%",
        sub: "Natural shelf share without sponsorship",
        change: "▲19.5 pts (from 17.3%)",
        changeColor: "green",
        prevText: "vs Previous Period",
        sparklineData: [18, 19, 20, 19.5, 20.8, 20.7],
        extra: "Benchmark range: 18–22%",
        extraChange: "Slightly above benchmark",
        extraChangeColor: "orange",
      },
      {
        id: "top_10_share",
        title: "Top 10 Share %",
        value: "14.5%",
        sub: "Presence in first page top 10 results",
        change: "▲1.5 pts (from 13.0%)",
        changeColor: "green",
        prevText: "vs Previous Period",
        sparklineData: [12, 12.5, 13, 13.5, 14, 14.5],
        extra: "Competitor Impact: Low",
        extraChange: "▲0.5%",
        extraChangeColor: "green",
      }
    ]
  },
  matrix: {
    platformData: {
      columns: ["kpi", "Blinkit", "Instamart", "Zepto"],
      rows: [
        { 
          kpi: "VISIBILITY SHARE", 
          Blinkit: 18.5, Instamart: 21.2, Zepto: 19.1,
          trend: { Blinkit: 4.3, Instamart: 2.1, Zepto: -0.5 },
          series: { 
            Blinkit: [14, 15, 17, 18.5], 
            Instamart: [19, 20, 20.5, 21.2], 
            Zepto: [19.5, 19.4, 19.2, 19.1] 
          }
        },
        { 
          kpi: "AD SHARE", 
          Blinkit: 15.2, Instamart: 18.4, Zepto: 16.8,
          trend: { Blinkit: -2.1, Instamart: 1.5, Zepto: 0.8 },
          series: { 
            Blinkit: [17, 16, 15.5, 15.2], 
            Instamart: [16, 17, 18, 18.4], 
            Zepto: [16, 16.2, 16.5, 16.8] 
          }
        },
        { 
          kpi: "ORGANIC SHARE", 
          Blinkit: 22.1, Instamart: 24.5, Zepto: 21.8,
          trend: { Blinkit: 1.2, Instamart: 0.8, Zepto: 1.5 },
          series: { 
            Blinkit: [20, 21, 21.5, 22.1], 
            Instamart: [22, 23, 24, 24.5], 
            Zepto: [20, 20.5, 21, 21.8] 
          }
        }
      ]
    },
    formatData: {
      columns: ["kpi", "Tubs", "Cones", "Sticks"],
      rows: [
        { 
          kpi: "VISIBILITY SHARE", 
          Tubs: 22.4, Cones: 15.6, Sticks: 18.9,
          trend: { Tubs: 3.9, Cones: 1.4, Sticks: -0.6 },
          series: { 
            Tubs: [18, 19, 21, 22.4], 
            Cones: [14, 14.5, 15, 15.6], 
            Sticks: [19.5, 19.3, 19.1, 18.9] 
          }
        },
        { 
          kpi: "AD SHARE", 
          Tubs: 14.2, Cones: 12.8, Sticks: 15.4,
          trend: { Tubs: -1.2, Cones: 0.5, Sticks: 0.8 },
          series: { 
            Tubs: [16, 15, 14.5, 14.2], 
            Cones: [12, 12.2, 12.5, 12.8], 
            Sticks: [14, 14.5, 15, 15.4] 
          }
        },
        { 
          kpi: "ORGANIC SHARE", 
          Tubs: 28.5, Cones: 22.1, Sticks: 25.4,
          trend: { Tubs: 2.1, Cones: 1.8, Sticks: 1.2 },
          series: { 
            Tubs: [25, 26, 27, 28.5], 
            Cones: [20, 21, 21.5, 22.1], 
            Sticks: [24, 24.5, 25, 25.4] 
          }
        }
      ]
    },
    cityData: {
      columns: ["kpi", "Mumbai", "Delhi", "Bangalore"],
      rows: [
        { 
          kpi: "VISIBILITY SHARE", 
          Mumbai: 20.1, Delhi: 17.5, Bangalore: 22.8,
          trend: { Mumbai: 1.2, Delhi: -0.8, Bangalore: 2.5 },
          series: { 
            Mumbai: [18, 19, 20, 20.1], 
            Delhi: [18.5, 18.2, 17.8, 17.5], 
            Bangalore: [20, 21, 22, 22.8] 
          }
        },
        { 
          kpi: "AD SHARE", 
          Mumbai: 12.4, Delhi: 11.2, Bangalore: 14.5,
          trend: { Mumbai: -0.5, Delhi: 0.2, Bangalore: 1.8 },
          series: { 
            Mumbai: [13, 12.8, 12.6, 12.4], 
            Delhi: [11, 11.1, 11.2, 11.2], 
            Bangalore: [12, 13, 14, 14.5] 
          }
        },
        { 
          kpi: "ORGANIC SHARE", 
          Mumbai: 25.8, Delhi: 22.4, Bangalore: 27.5,
          trend: { Mumbai: 2.1, Delhi: 1.5, Bangalore: 3.2 },
          series: { 
            Mumbai: [22, 23, 24.5, 25.8], 
            Delhi: [20, 21, 21.8, 22.4], 
            Bangalore: [24, 25, 26, 27.5] 
          }
        }
      ]
    }
  },
  summary: {
    totalKeywords: 150,
    totalSearchVolume: 450000,
    leadingBrand: "Amul",
    overallSOS: 22.5,
    organicSOS: 15.2,
    paidSOS: 7.3,
    locations: [
      { city: "Mumbai", overallSOS: 24.1, organicSOS: 16.2, paidSOS: 7.9 },
      { city: "Delhi", overallSOS: 21.5, organicSOS: 14.8, paidSOS: 6.7 },
      { city: "Bangalore", overallSOS: 23.8, organicSOS: 15.5, paidSOS: 8.3 }
    ]
  },
  terms: [
    { 
      name: "ice cream", leadingBrand: "Amul", overallSOS: 25.4, organicSOS: 18.2, paidSOS: 7.2, volShare: 12.5,
      imageUrl: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=100&h=100&fit=crop",
      locations: [
        { city: "Mumbai", overallSOS: 26.5, organicSOS: 19.2, paidSOS: 7.3 },
        { city: "Delhi", overallSOS: 24.2, organicSOS: 17.5, paidSOS: 6.7 }
      ],
      brandBreakdown: [
        { brand: "Amul", share: 45, organic: 30, paid: 15 },
        { brand: "Mother Dairy", share: 25, organic: 20, paid: 5 },
        { brand: "Hiveminds", share: 15, organic: 10, paid: 5 },
        { brand: "Others", share: 15, organic: 10, paid: 5 }
      ]
    },
    { 
      name: "chocolate tub", leadingBrand: "Mother Dairy", overallSOS: 18.2, organicSOS: 12.4, paidSOS: 5.8, volShare: 8.4,
      imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=100&h=100&fit=crop",
      locations: [
        { city: "Mumbai", overallSOS: 19.1, organicSOS: 13.2, paidSOS: 5.9 }
      ],
      brandBreakdown: [
        { brand: "Mother Dairy", share: 40, organic: 30, paid: 10 },
        { brand: "Amul", share: 30, organic: 25, paid: 5 },
        { brand: "Hiveminds", share: 20, organic: 15, paid: 5 },
        { brand: "Others", share: 10, organic: 8, paid: 2 }
      ]
    },
    { 
      name: "vanilla cone", leadingBrand: "Hiveminds", overallSOS: 32.1, organicSOS: 24.5, paidSOS: 7.6, volShare: 15.2,
      imageUrl: "https://images.unsplash.com/photo-1505394033343-4edafaff5c3b?w=100&h=100&fit=crop",
      brandBreakdown: [
        { brand: "Hiveminds", share: 50, organic: 40, paid: 10 },
        { brand: "Amul", share: 20, organic: 15, paid: 5 },
        { brand: "Mother Dairy", share: 15, organic: 10, paid: 5 },
        { brand: "Others", share: 15, organic: 10, paid: 5 }
      ]
    },
    { 
      name: "mango bar", leadingBrand: "Kwality Walls", overallSOS: 14.5, organicSOS: 9.8, paidSOS: 4.7, volShare: 6.2,
      imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100&h=100&fit=crop",
      brandBreakdown: [
        { brand: "Kwality Walls", share: 35, organic: 25, paid: 10 },
        { brand: "Amul", share: 30, organic: 20, paid: 10 },
        { brand: "Hiveminds", share: 20, organic: 15, paid: 5 },
        { brand: "Others", share: 15, organic: 10, paid: 5 }
      ]
    },
    { 
      name: "pistachio cup", leadingBrand: "Amul", overallSOS: 28.3, organicSOS: 20.1, paidSOS: 8.2, volShare: 10.5,
      imageUrl: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=100&h=100&fit=crop",
      brandBreakdown: [
        { brand: "Amul", share: 42, organic: 30, paid: 12 },
        { brand: "Mother Dairy", share: 28, organic: 20, paid: 8 },
        { brand: "Hiveminds", share: 18, organic: 12, paid: 6 },
        { brand: "Others", share: 12, organic: 8, paid: 4 }
      ]
    }
  ],
  gainersAndDrainers: {
    gain: [
      { 
        brand: "Mother Dairy", platform: "Blinkit", overall: 22.4, dOverall: 5.2, organic: 18.5, dOrganic: 3.9, paid: 3.9, dPaid: 1.3,
        keywords: [
          { kw: "vanilla tub", overall: 15.2, dO: 3.1, organic: 12.4, dOr: 2.5, paid: 2.8, dP: 0.6, locations: [{ loc: "Mumbai", overall: 18, dO: 4, organic: 15, dOr: 3, paid: 3, dP: 1 }] }
        ]
      },
      { 
        brand: "Hiveminds", platform: "Instamart", overall: 18.5, dOverall: 3.1, organic: 14.2, dOrganic: 2.4, paid: 4.3, dPaid: 0.7,
        keywords: [
          { kw: "ice cream", overall: 20.1, dO: 2.5, organic: 16.2, dOr: 1.8, paid: 3.9, dP: 0.7 }
        ]
      }
    ],
    drain: [
      { 
        brand: "Amul", platform: "Zepto", overall: 15.6, dOverall: -4.5, organic: 12.2, dOrganic: -3.2, paid: 3.4, dPaid: -1.3,
        keywords: [
          { kw: "chocolate cone", overall: 8.4, dO: -2.1, organic: 6.2, dOr: -1.5, paid: 2.2, dP: -0.6, locations: [{ loc: "Delhi", overall: 10, dO: -3, organic: 8, dOr: -2, paid: 2, dP: -1 }] }
        ]
      },
      { 
        brand: "Kwality Walls", platform: "Blinkit", overall: 12.8, dOverall: -2.9, organic: 9.4, dOrganic: -2.1, paid: 3.4, dPaid: -0.8,
        keywords: [
          { kw: "mango stick", overall: 10.2, dO: -1.8, organic: 7.5, dOr: -1.2, paid: 2.7, dP: -0.6 }
        ]
      }
    ]
  }
};
