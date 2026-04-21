import React, { useState, useContext, useEffect, useRef } from "react";
import CommonContainer from "../../components/CommonLayout/CommonContainer";
import AvailablityAnalysisData from "../../components/AllAvailablityAnalysis/AvailablityAnalysisData";
import { FilterContext } from "../../utils/FilterContext";
import dayjs from "dayjs";
import { AVAILABILITY_DATA } from "../../utils/hardcodedData";

export default function AvailablityAnalysis() {

  // Get values from FilterContext - the source of truth for dropdown selections
  const {
    platform,
    selectedBrand,
    selectedLocation,
    timeStart,
    timeEnd,
    selectedZone,
    pmSelectedPlatform,
    pmSelectedBrand,
    setPlatform,
    setSelectedLocation,
    setTimeStart,
    setTimeEnd,
    selectedCategory,
    setSelectedCategory,
    selectedProductCategory,
    setSelectedProductCategory,
    compareStart,
    compareEnd,
    selectedChannel,
    refreshFilters
  } = useContext(FilterContext);

  const [showTrends, setShowTrends] = useState(false);

  // Initialize filters from context
  const [filters, setFilters] = useState({
    platform: platform || "Blinkit",
    brand: selectedBrand || "All",
    location: selectedLocation || "All",
    category: selectedCategory || "All",
    productCategory: selectedProductCategory || "All",
    zones: selectedZone || "All",
    channel: selectedChannel || "Ecommerce",
    months: 6,
    timeStep: "Monthly",
    startDate: timeStart ? timeStart.format('YYYY-MM-DD') : dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate: timeEnd ? timeEnd.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
    compareStartDate: compareStart ? compareStart.format('YYYY-MM-DD') : null,
    compareEndDate: compareEnd ? compareEnd.format('YYYY-MM-DD') : null,
    // Add extra tracking state for Matrix filters
    kpis: [],
    metroFlags: [],
    cities: [],
    formats: []
  });

  // Wrapper to sync context when filters change locally (e.g. from internal matrix filters)
  const handleFiltersChange = (newFilters) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, ...newFilters };
      return updatedFilters;
    });

    // Sync back to FilterContext to update global header
    if (newFilters.platform && newFilters.platform !== platform) {
      setPlatform(newFilters.platform);
    }
    if (newFilters.location && newFilters.location !== selectedLocation) {
      setSelectedLocation(newFilters.location);
    }
    if (newFilters.category && newFilters.category !== selectedCategory) {
      setSelectedCategory(newFilters.category);
    }
    if (newFilters.productCategory && newFilters.productCategory !== selectedProductCategory) {
      setSelectedProductCategory(newFilters.productCategory);
    }
    if (newFilters.startDate) {
      const newStart = dayjs(newFilters.startDate);
      if (!newStart.isSame(timeStart, 'day')) {
        setTimeStart(newStart);
      }
    }
    if (newFilters.endDate) {
      const newEnd = dayjs(newFilters.endDate);
      if (!newEnd.isSame(timeEnd, 'day')) {
        setTimeEnd(newEnd);
      }
    }
  };

  // Ref to track last fetched filters to prevent duplicate API calls
  const lastFetchedFiltersRef = useRef(null);

  // Sync filters with FilterContext when context values change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      platform: platform || prev.platform,
      brand: selectedBrand || prev.brand,
      location: selectedLocation || prev.location,
      category: selectedCategory || prev.category,
      productCategory: selectedProductCategory || prev.productCategory,
      zones: selectedZone || prev.zones,
      channel: selectedChannel || prev.channel,
      startDate: timeStart ? timeStart.format('YYYY-MM-DD') : prev.startDate,
      endDate: timeEnd ? timeEnd.format('YYYY-MM-DD') : prev.endDate,
      compareStartDate: compareStart ? compareStart.format('YYYY-MM-DD') : null,
      compareEndDate: compareEnd ? compareEnd.format('YYYY-MM-DD') : null
    }));
  }, [platform, selectedBrand, selectedLocation, selectedCategory, selectedProductCategory, timeStart, timeEnd, compareStart, compareEnd, selectedZone, selectedChannel]);

  // Restore comprehensive platform list from rca_sku_dim on mount
  // (Prevents subsetting from other pages like Performance Marketing)
  useEffect(() => {
    if (typeof refreshFilters === 'function') {
      refreshFilters();
    }
  }, [refreshFilters]);

  const [trendParams, setTrendParams] = useState({
    months: 6,
    timeStep: "Monthly",
    platform: platform || "Blinkit",
  });

  const [trendData, setTrendData] = useState({
    timeSeries: [],
    metrics: {},
  });

  const handleViewTrends = (card) => {
    console.log("card clicked", card);

    const series =
      card.chart?.map((v, i) => {
        let date;

        if (trendParams.timeStep === "Monthly") {
          const d = new Date();
          d.setMonth(d.getMonth() - (card.chart.length - 1 - i));
          date = d.toLocaleString("default", {
            month: "short",
            year: "2-digit",
          });
        } else if (trendParams.timeStep === "Weekly") {
          const d = new Date();
          d.setDate(d.getDate() - 7 * (card.chart.length - 1 - i));
          date = d.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          });
        } else {
          const d = new Date();
          d.setDate(d.getDate() - (card.chart.length - 1 - i));
          date = d.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          });
        }

        return { date, offtake: v };
      }) ?? [];

    setTrendData({
      timeSeries: series,
      metrics: {},
    });

    setTrendParams((prev) => ({
      ...prev,
      platform: card.name ?? "Blinkit",
    }));

    setShowTrends(true);
  };

  const [apiData, setApiData] = useState({});
  // Dedicated loading state - true when API calls are in progress
  const [isLoading, setIsLoading] = useState(true);
  // Per-segment error tracking
  const [apiErrors, setApiErrors] = useState({});

  // Use imported AVAILABILITY_DATA

  // Individual segment fetch functions for retry capability - No-ops now
  const retrySegment = async (segmentKey) => {
    return true;
  };

  useEffect(() => {
    // Skip if we already set the data
    if (lastFetchedFiltersRef.current) {
        // Just return if already loaded, unless you want to simulate fresh load on filter change
    }

    // Set loading true
    setIsLoading(true);
    
    // Simulate a brief delay to show skeletons
    const timer = setTimeout(() => {
      setApiData(AVAILABILITY_DATA);
      setIsLoading(false);
      lastFetchedFiltersRef.current = "hardcoded";
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <>
      <CommonContainer
        title="Availability Analysis"
        filters={filters}
        onFiltersChange={handleFiltersChange}
      >
        <AvailablityAnalysisData
          apiData={apiData}
          apiErrors={apiErrors}
          onRetry={retrySegment}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          loading={isLoading}
        />
      </CommonContainer>
    </>
  );
}
