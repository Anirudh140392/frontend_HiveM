import { VISIBILITY_DATA } from '../utils/hardcodedData';

/**
 * Mock visibility service that returns data directly from hardcodedData.js
 * to ensure 100% reliability in the UI.
 */

export const fetchSearchTermsPerformance = async (params) => {
    // Simulate slight network delay for realism
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
        items: VISIBILITY_DATA.terms || [],
        total: (VISIBILITY_DATA.terms || []).length,
        summary: VISIBILITY_DATA.summary || null
    };
};

export const fetchSearchTermsLocations = async (params) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const keyword = params?.keyword;
    const term = VISIBILITY_DATA.terms?.find(t => t.name === keyword);
    
    return {
        locations: term?.locations || []
    };
};

export const fetchSearchTermsBrandBreakdown = async (params) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const keyword = params?.keyword;
    const term = VISIBILITY_DATA.terms?.find(t => t.name === keyword);
    
    return {
        brands: term?.brandBreakdown || []
    };
};

export const fetchVisibilitySignals = async (params) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
        gain: VISIBILITY_DATA.gainersAndDrainers?.gain || [],
        drain: VISIBILITY_DATA.gainersAndDrainers?.drain || []
    };
};

export const fetchVisibilityBrandDrilldown = async (params) => ({ success: true, data: {} });
export const fetchVisibilitySkuDrilldown = async (params) => ({ success: true, data: {} });
export const fetchVisibilityCityDrilldown = async (params) => ({ success: true, data: {} });
