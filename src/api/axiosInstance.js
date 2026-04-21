import axios from "axios";
import { 
  AVAILABILITY_DATA, 
  VISIBILITY_DATA, 
  PRICING_DATA, 
  MARKET_SHARE_DATA,
  PRICING_INSIGHTS_DATA,
  PRICING_DIMENSION_DATA
} from "../utils/hardcodedData";

const axiosInstance = axios.create({
  baseURL: "/api",
});

// Intercept requests to return mock data immediately
axiosInstance.interceptors.request.use(async (config) => {
  const url = config.url || "";
  console.log(`[Mock API] Intercepting: ${url}`);

  let data = { success: true, data: {} };

  // Map URLs to hardcoded data
  if (url.includes("/availability-analysis/overview")) {
    data.data = AVAILABILITY_DATA.overview;
  } else if (url.includes("/availability-analysis/platform-kpi")) {
    data.data = AVAILABILITY_DATA.platformKpi;
  } else if (url.includes("/availability-analysis/format-kpi")) {
    data.data = AVAILABILITY_DATA.formatKpi;
  } else if (url.includes("/availability-analysis/city-kpi")) {
    data.data = AVAILABILITY_DATA.cityKpi;
  } else if (url.includes("/availability-analysis/osa-detail")) {
    data.data = AVAILABILITY_DATA.osaDetail;
  } else if (url.includes("/visibility-analysis")) {
    data.data = VISIBILITY_DATA;
  } else if (url.includes("/pricing-analysis/ecp-weekday-weekend")) {
    data.data = PRICING_DATA.ecpWeekdayWeekend;
    data.summary = PRICING_DATA.ecpWeekdayWeekendSummary;
  } else if (url.includes("/pricing-analysis/insights")) {
    data.data = PRICING_INSIGHTS_DATA;
  } else if (url.includes("/pricing-analysis/dimension-overview")) {
    data.data = PRICING_DIMENSION_DATA;
  } else if (url.includes("/pricing-analysis")) {
    data.data = PRICING_DATA;
  } else if (url.includes("/market-share")) {
    data.data = MARKET_SHARE_DATA;
  } else if (url.includes("/watchtower/products")) {
    // Used in some pricing components
    data.data = ["Vanilla Tub 500ml", "Chocolate Cone 120ml", "Mango Stick 80ml"]; 
  } else {
    // Generic fallback
    data.data = [];
  }

  // Return a resolved promise with the mock response structure
  // This prevents the actual network request from firing
  return Promise.reject({
    config,
    response: {
      status: 200,
      data: { success: true, ...data },
      headers: {},
      config
    },
    isMock: true
  });
}, (error) => Promise.reject(error));

// The interceptor above rejects to skip the network call, 
// so we need to handle that in the response interceptor to make it look like a success.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.isMock) {
      return Promise.resolve(error.response);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
