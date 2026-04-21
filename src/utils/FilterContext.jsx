import React, { createContext, useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { useAuth } from "./AuthContext";

export const FilterContext = createContext();

// Context ready states so children know when async data has loaded
export const initialContextLoaded = (ctx) => ctx.datesFetched && ctx.platformsFetched;


// Static fallback data (used if API is unreachable)
const FALLBACK_PLATFORMS = ["Blinkit", "Zepto", "Instamart"];
const FALLBACK_CATEGORIES = ["Chocolates (Gifting)", "Chocolates (Non Gifting)", "GMFC"];
const FALLBACK_LOCATIONS = [];
const FALLBACK_BRANDS = [];
const FALLBACK_CHANNELS = ["Ecom", "ModernTrade"];

export const FilterProvider = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const isAuthenticated = true;

    // Channel state
    const [channels, setChannels] = useState(["Ecom", "ModernTrade"]);
    const [selectedChannel, setSelectedChannel] = useState("All");

    // Platform state
    const [platforms, setPlatforms] = useState(["Blinkit", "Zepto", "Instamart", "Swiggy", "Amazon", "Flipkart"]);
    const [platform, setPlatform] = useState("All");

    // Brand state
    const [brands, setBrands] = useState(["Brand A", "Brand B", "Brand C"]);
    const [selectedBrand, setSelectedBrand] = useState("All");

    // Location state
    const [locations, setLocations] = useState(["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune"]);
    const [selectedLocation, setSelectedLocation] = useState("All");

    // Additional Location Filters
    const [zones, setZones] = useState(["North", "South", "East", "West"]);
    const [selectedZone, setSelectedZone] = useState("All");
    const [metroFlags, setMetroFlags] = useState(["Metro", "Non-Metro"]);
    const [selectedMetroFlag, setSelectedMetroFlag] = useState("All");
    const [pincodes, setPincodes] = useState(["400001", "110001", "560001"]);
    const [selectedPincode, setSelectedPincode] = useState("All");

    // Keyword state
    const [keywords, setKeywords] = useState(["Keyword 1", "Keyword 2", "Keyword 3"]);
    const [selectedKeyword, setSelectedKeyword] = useState(["All"]);

    // Keyword Type state
    const [keywordTypes, setKeywordTypes] = useState(["Organic", "Sponsored"]);
    const [selectedKeywordType, setSelectedKeywordType] = useState(["All"]);

    // Category state
    const [categories, setCategories] = useState(["Chocolates (Gifting)", "Chocolates (Non Gifting)", "GMFC", "Snacks", "Beverages"]);
    const [visibilityCategories, setVisibilityCategories] = useState(["Chocolates (Gifting)", "Chocolates (Non Gifting)", "GMFC"]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Product Category state
    const [productCategories, setProductCategories] = useState(["Category 1", "Category 2"]);
    const [selectedProductCategory, setSelectedProductCategory] = useState("All");
    const [productCategoriesFetched, setProductCategoriesFetched] = useState(true);

    // Date Ranges (Fixed Hardcoded)
    const [timeStart, setTimeStart] = useState(dayjs("2025-01-01"));
    const [timeEnd, setTimeEnd] = useState(dayjs("2025-01-31"));
    const [compareStart, setCompareStart] = useState(dayjs("2024-12-01"));
    const [compareEnd, setCompareEnd] = useState(dayjs("2024-12-31"));
    const [comparisonLabel, setComparisonLabel] = useState("VS PREV. PERIOD");
    const [maxDate, setMaxDate] = useState(dayjs("2025-12-31"));

    // Tracks if async data is loaded
    const [datesFetched, setDatesFetched] = useState(true);
    const [platformsFetched, setPlatformsFetched] = useState(true);

    const [contentFilterMode, setContentFilterMode] = useState(false);
    const [visibilityOwnBrandsOnly, setVisibilityOwnBrandsOnly] = useState(true);
    const [visibilityMode, setVisibilityMode] = useState('sos');
    const [currentHash, setCurrentHash] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            setCurrentHash(window.location.hash);
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const datesInitialized = true;

    // Dummy functions to satisfy components
    const refreshDates = useCallback(async () => {
        setDatesFetched(true);
    }, []);

    const fetchPlatformsFromDb = useCallback(async () => {
        setPlatformsFetched(true);
    }, []);

    const refreshFilters = useCallback(() => {
        setPlatformsFetched(true);
    }, []);

    return (
        <FilterContext.Provider value={{
            channels,
            setChannels,
            selectedChannel,
            setSelectedChannel,
            brands,
            setBrands,
            selectedBrand,
            setSelectedBrand,
            keywords,
            setKeywords,
            selectedKeyword,
            setSelectedKeyword,
            keywordTypes,
            setKeywordTypes,
            selectedKeywordType,
            setSelectedKeywordType,
            locations,
            setLocations,
            selectedLocation,
            setSelectedLocation,
            platforms,
            setPlatforms,
            platform,
            setPlatform,
            timeStart,
            setTimeStart,
            timeEnd,
            setTimeEnd,
            compareStart,
            setCompareStart,
            compareEnd,
            setCompareEnd,
            comparisonLabel,
            setComparisonLabel,
            categories,
            visibilityCategories,
            setCategories,
            selectedCategory,
            setSelectedCategory,
            productCategories,
            setProductCategories,
            selectedProductCategory,
            setSelectedProductCategory,
            maxDate,
            datesInitialized,
            datesFetched,
            platformsFetched,
            refreshFilters,
            refreshDates,
            contentFilterMode,
            setContentFilterMode,
            visibilityOwnBrandsOnly,
            setVisibilityOwnBrandsOnly,
            zones,
            setZones,
            selectedZone,
            setSelectedZone,
            metroFlags,
            setMetroFlags,
            selectedMetroFlag,
            setSelectedMetroFlag,
            pincodes,
            setPincodes,
            selectedPincode,
            setSelectedPincode,
            visibilityMode,
            setVisibilityMode
        }}>
            {children}
        </FilterContext.Provider>
    );
};
