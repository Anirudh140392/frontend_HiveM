import React, { useState, useContext, useEffect, useRef } from "react";
import CommonContainer from "../../components/CommonLayout/CommonContainer";
import VisiblityAnalysisData from "../../components/AllVisiblityAnalysis/VisiblityAnalysisData";
import { FilterContext } from "../../utils/FilterContext";
import dayjs from "dayjs";
import { VISIBILITY_DATA } from "../../utils/hardcodedData";

export default function VisibilityAnalysis() {
  // Get values from FilterContext - the source of truth for dropdown selections
  const {
    platform,
    selectedBrand,
    selectedLocation,
    selectedKeyword,
    selectedKeywordType,
    selectedCategory,
    selectedChannel,
    timeStart,
    timeEnd,
    selectedZone,
    selectedMetroFlag,
    selectedPincode,
  } = useContext(FilterContext);

  const [showTrends, setShowTrends] = useState(false);

  // Track if visibility-specific dates have been initialized
  const [visibilityDatesReady, setVisibilityDatesReady] = useState(false);

  // Initialize filters with hardcoded dates
  const [filters, setFilters] = useState({
    platform: platform || "Blinkit",
    brand: selectedBrand || "All",
    location: "All",
    keyword: selectedKeyword || "All",
    keywordType: selectedKeywordType || "All",
    category: selectedCategory || "All",
    channel: selectedChannel || "All",
    zone: selectedZone || "All",
    metroFlag: selectedMetroFlag || "All",
    pincode: selectedPincode || "All",
    months: 6,
    timeStep: "Weekly",
    startDate: timeStart ? timeStart.format('YYYY-MM-DD') : dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    endDate: timeEnd ? timeEnd.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')
  });

  // ============ Set hardcoded dates on mount ============
  useEffect(() => {
    if (!visibilityDatesReady) {
      setVisibilityDatesReady(true);
    }
  }, [visibilityDatesReady]);

  // Sync filters with FilterContext when context values change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      platform: platform || prev.platform,
      brand: selectedBrand || prev.brand,
      keyword: selectedKeyword || prev.keyword,
      category: selectedCategory || prev.category,
      channel: selectedChannel || prev.channel,
      zone: selectedZone || prev.zone,
      startDate: timeStart ? timeStart.format('YYYY-MM-DD') : prev.startDate,
      endDate: timeEnd ? timeEnd.format('YYYY-MM-DD') : prev.endDate,
    }));
  }, [platform, selectedBrand, selectedKeyword, selectedCategory, selectedChannel, selectedZone, timeStart, timeEnd]);

  // Loading and error states
  const [loading, setLoading] = useState({
    overview: false,
    matrix: false,
    drilldown: false,
    gainersAndDrainers: false
  });

  const [apiErrors, setApiErrors] = useState({});
  const [apiData, setApiData] = useState({
    overview: undefined,
    matrix: undefined,
    drilldown: undefined,
    gainersAndDrainers: undefined
  });

  // ============ Load Hardcoded Data ============
  useEffect(() => {
    if (!visibilityDatesReady) return;

    const loadData = async () => {
      setLoading({
        overview: true,
        matrix: true,
        drilldown: true,
        gainersAndDrainers: true
      });

      // Simulate API delay
      setTimeout(() => {
        setApiData(VISIBILITY_DATA);
        setLoading({
          overview: false,
          matrix: false,
          drilldown: false,
          gainersAndDrainers: false
        });
      }, 800);
    };

    loadData();
  }, [filters, visibilityDatesReady]);

  const handleFiltersChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <CommonContainer
      title="Visibility Analysis"
      showTrends={showTrends}
      onTrendsToggle={() => setShowTrends(!showTrends)}
    >
      <VisiblityAnalysisData
        apiData={apiData}
        apiErrors={apiErrors}
        loading={loading}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onRetry={() => {}}
      />
    </CommonContainer>
  );
}
