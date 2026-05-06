import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  Divider,
  Collapse,
} from "@mui/material";
import {
  Close as CloseIcon,
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  Public as PublicIcon,
  ShoppingCart as ShoppingCartIcon,
  Visibility as VisibilityIcon,
  AutoGraph as AutoGraphIcon,
  PriceChange as PriceChangeIcon,
  AdsClick as AdsClickIcon,
  Article as ArticleIcon,
  Inventory as InventoryIcon,
  Schedule as ScheduleIcon,
  HelpOutline as HelpIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  TouchApp as UsageIcon,
  ErrorOutline as PitfallsIcon,
  Psychology as InterpretationIcon,
  EmojiObjects as ExampleIcon,
  Calculate as LogicIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";

import { useHelp } from "../../utils/HelpContext";

const HelpDrawer = ({ userDbName }) => {
  const { helpDrawerOpen, activeHelpMenu, closeHelp } = useHelp();
  const [activeTab, setActiveTab] = useState(0);
  const [activeMenu, setActiveMenu] = useState("Overview");
  const [expandedKpi, setExpandedKpi] = useState(null);
  const [activeFaqMenu, setActiveFaqMenu] = useState("TAT & Timelines");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync with context's activeHelpMenu when opening
  React.useEffect(() => {
    if (helpDrawerOpen && activeHelpMenu) {
      let mappedMenu = activeHelpMenu;
      if (activeHelpMenu === "Business Overview") mappedMenu = "Overview";
      else if (activeHelpMenu === "Automation Rules") mappedMenu = "Rules";
      else if (activeHelpMenu === "Action History") mappedMenu = "History";
      setActiveMenu(mappedMenu);
    }
  }, [helpDrawerOpen, activeHelpMenu]);

  const businessOverviewGlossary = [
    {
      kpi: "Total Spend",
      definition: "The total monetary amount invested in advertising campaigns over the selected period.",
      usage: "Track and control advertising budget consumption.",
      interpretation: "Higher spend indicates aggressive marketing; must be evaluated against ROAS and Total Sales.",
      pitfalls: "Spending without proportionate sales growth indicates inefficiency.",
      example: "₹21.80L spent on ads across Blinkit.",
      logic: "Sum(Ad Spend)",
    },
    {
      kpi: "Impressions",
      definition: "The total number of times your product or advertisement is displayed to users on the platform.",
      usage: "Measure top-of-funnel brand visibility and ad reach.",
      interpretation: "High impressions show good visibility, but need to be paired with strong CTR to drive traffic.",
      pitfalls: "High impressions with low CTR means ads are visible but not relevant or engaging.",
      example: "60.91L total ad views.",
      logic: "Count of Ad Views",
    },
    {
      kpi: "ATC (Add to Cart)",
      definition: "The total number of times users added the product to their cart after engaging with an ad or listing.",
      usage: "Evaluate product appeal and purchase intent.",
      interpretation: "High ATC indicates strong purchase intent. If Orders are significantly lower, there may be checkout drop-offs or price issues.",
      pitfalls: "High ATC without matching CVR indicates cart abandonment.",
      example: "115K products added to cart.",
      logic: "Count of Cart Additions",
    },
    {
      kpi: "Orders",
      definition: "The total number of completed purchase transactions within the given period.",
      usage: "Track actual demand volume and conversion success.",
      interpretation: "Direct indicator of campaign and product success.",
      pitfalls: "Does not account for cancellations or returns unless explicitly filtered.",
      example: "50K successful orders.",
      logic: "Count of Completed Orders",
    },
    {
      kpi: "Total Sales",
      definition: "The overall revenue generated from all product sales during the specified timeframe.",
      usage: "Measure the primary business outcome and overall revenue growth.",
      interpretation: "Higher sales indicate strong market demand and effective execution.",
      pitfalls: "High sales driven by heavy discounts may hurt overall profitability.",
      example: "₹5.96Cr in gross sales.",
      logic: "Sum(Sales Value)",
    },
    {
      kpi: "ROAS (Return on Ad Spend)",
      definition: "The amount of revenue generated for every unit of currency spent on advertising.",
      usage: "Measure the direct profitability and efficiency of ad campaigns.",
      interpretation: "Higher ROAS means highly efficient ad spend (e.g., 30.98x means ₹30.98 earned for every ₹1 spent).",
      pitfalls: "Over-optimizing for ROAS might restrict volume and market share growth.",
      example: "30.98x return on total spend.",
      logic: "(Total Sales from Ads ÷ Total Ad Spend)",
    },
    {
      kpi: "ACOS (Advertising Cost of Sales)",
      definition: "The percentage of direct sales spent on advertising (Ad Spend divided by Ad Sales).",
      usage: "Evaluate the cost-efficiency of advertising relative to revenue.",
      interpretation: "Lower ACOS (e.g., 3.13%) indicates highly efficient campaigns. Higher ACOS eats into profit margins.",
      pitfalls: "A very low ACOS target may prevent the campaign from scaling.",
      example: "Spent ₹3.13 to generate ₹100 in sales.",
      logic: "(Total Ad Spend ÷ Total Ad Sales) × 100",
    },
    {
      kpi: "CTR (Click-Through Rate)",
      definition: "The percentage of users who clicked on an ad after seeing it.",
      usage: "Measure ad relevance, thumbnail quality, and title effectiveness.",
      interpretation: "Higher CTR (e.g., 1.58%) means the ad is highly relevant and appealing to the audience.",
      pitfalls: "High CTR with low CVR wastes spend (users click but don't buy).",
      example: "158 clicks per 10,000 impressions.",
      logic: "(Total Clicks ÷ Total Impressions) × 100",
    },
    {
      kpi: "CVR (Conversion Rate)",
      definition: "The percentage of users who completed a purchase after clicking an ad or visiting the product page.",
      usage: "Evaluate product page effectiveness (price, reviews, images).",
      interpretation: "High CVR (e.g., 55.64%) means the product page successfully convinces visitors to buy.",
      pitfalls: "Only measures post-click behavior; ignores top-of-funnel reach.",
      example: "55 purchases from 100 ad clicks.",
      logic: "(Total Orders ÷ Total Clicks) × 100",
    },
    {
      kpi: "CPC (Cost per Click)",
      definition: "The average cost paid for each user click on an advertisement.",
      usage: "Monitor traffic acquisition costs and bidding efficiency.",
      interpretation: "Lower CPC means cheaper traffic. High CPC requires high CVR to remain profitable.",
      pitfalls: "Focusing only on cheap clicks might bring low-intent traffic.",
      example: "₹28 paid per click.",
      logic: "(Total Ad Spend ÷ Total Clicks)",
    }
  ];

  const indiaOverviewGlossary = [
    {
      kpi: "Wt. OSA (Weighted On-Shelf Availability)",
      definition: "Measures product availability weighted by its importance (e.g., sales contribution or store weight).",
      usage: "Identify availability gaps for high-impact SKUs.",
      interpretation: "Higher Wt. OSA → key products are consistently available; low → revenue loss risk.",
      pitfalls: "Treating all SKUs equally; ignoring SKU importance; wrong weighting logic.",
      example: "If top-selling SKUs (70% sales contribution) have 90% availability, Wt. OSA reflects higher availability impact vs low-selling SKUs.",
      logic: "Σ(Availability × Weight) ÷ Σ(Weight) (Weight = sales/store importance)",
    },
    {
      kpi: "Listing %",
      definition: "% of total possible SKUs that are listed on the platform/store.",
      usage: "Track distribution and assortment presence.",
      interpretation: "Higher listing → better product coverage.",
      pitfalls: "Counting inactive SKUs; mismatch in total SKU universe.",
      example: "80 listed SKUs out of 100 total → 80%.",
      logic: "(Listed SKUs ÷ Total Possible SKUs) × 100",
    },
    {
      kpi: "Market Share",
      definition: "The percentage of total category sales contributed by a brand.",
      usage: "Track competitive position.",
      interpretation: "Higher share → stronger market presence.",
      pitfalls: "Crawl time variations.",
      example: "₹1 Cr / ₹5 Cr → 20%.",
      logic: "(Brand Sales ÷ Category Size) × 100",
    },
    {
      kpi: "Sales",
      definition: "The total sales value generated by a product or brand over a specified period.",
      usage: "Track demand and revenue generation.",
      interpretation: "Higher offtake → strong sales performance.",
      pitfalls: "Price vs volume confusion; double counting across SKUs.",
      example: "Brand sales = ₹5 Cr in last 30 days.",
      logic: "Sum(Sales Value)",
    },
    {
      kpi: "Orders",
      definition: "The total number of completed purchase transactions within a given period.",
      usage: "Track demand volume.",
      interpretation: "Higher orders → higher demand.",
      pitfalls: "Duplicate orders; cancellations not excluded.",
      example: "2,000 orders in a week.",
      logic: "Count of Orders",
    },
  ];

  const availabilityAnalysisGlossary = [
    {
      kpi: "Stock Availability",
      definition: "The proportion of stores or locations where a product is available for purchase at a given time.",
      usage: "Identify distribution gaps.",
      interpretation: "Higher availability → better reach.",
      pitfalls: "Ignoring OOS vs not listed; denominator issues.",
      example: "Available in 80 out of 100 stores → 80%.",
      logic: "(Available Stores ÷ Total Stores) × 100",
    },
    {
      kpi: "Days of Inventory (DOI)",
      definition: "The number of days current inventory is expected to last based on the recent sales trend (last 30 days).",
      usage: "Monitor inventory health and plan replenishment.",
      interpretation: "Lower DOI indicates risk of stockout; higher DOI indicates excess inventory.",
      pitfalls: "Using incorrect time window; not updating sales data; division errors when sales = 0.",
      example: "Current Inventory = 3,000 units; Last 30 days sales = 1,500 units → DOI = 60 days.",
      logic: "DOI = (Current Inventory ÷ Last 30 Days Qty Sold) × 30",
    },
    {
      kpi: "Metro City Stock Availability",
      definition: "The proportion of stores or locations where a product is available for purchase at a given time for metro cities.",
      usage: "Identify distribution gaps in metro cities.",
      interpretation: "Higher availability → better reach.",
      pitfalls: "Ignoring OOS vs not listed; denominator issues.",
      example: "Available in 80 out of 100 stores → 80%.",
      logic: "(Available Stores ÷ Total Stores) × 100",
    },
    {
      kpi: "PSL (Potential Sales Loss)",
      definition: "The estimated sales loss due to unavailability, derived by comparing actual sales with expected sales adjusted for availability (OSA).",
      usage: "Identify sales loss caused by stockouts and availability gaps.",
      interpretation: "Higher PSL gap indicates greater loss due to poor availability; lower gap indicates efficient stock availability.",
      pitfalls: "Incorrect OSA calculation; division errors when OSA is very low; misinterpreting PSL as fulfilled demand.",
      example: "Sales = 1,000 units; Avg OSA = 80% → Expected Sales = 1,250 → PSL Loss = 250 units.",
      logic: "(Sales ÷ Avg OSA) − Sales",
    },
    {
      kpi: "SOH (Stock on Hand)",
      definition: "Total inventory available at a given point in time.",
      usage: "Monitor current inventory levels.",
      interpretation: "Higher SOH → more stock; too high → holding cost risk.",
      pitfalls: "Not excluding reserved/damaged stock; duplication across locations.",
      example: "8,000 units available in warehouse.",
      logic: "Sum of Current Inventory Units",
    },
    {
      kpi: "Wt. OSA% (Weighted On-Shelf Availability)",
      definition: "Measures product availability weighted by its importance (e.g., sales contribution or store weight).",
      usage: "Identify availability gaps for high-impact SKUs.",
      interpretation: "Higher Wt. OSA → key products are consistently available; low → revenue loss risk.",
      pitfalls: "Treating all SKUs equally; ignoring SKU importance; wrong weighting logic.",
      example: "If top-selling SKUs (70% sales contribution) have 90% availability, Wt. OSA reflects higher availability impact vs low-selling SKUs.",
      logic: "Σ(Availability × Weight) ÷ Σ(Weight) (Weight = sales/store importance)",
    },
    {
      kpi: "Offtake Share",
      definition: "Product/Category's contribution to total sales.",
      usage: "Track SKU performance within category/brand.",
      interpretation: "Higher share → strong consumer demand.",
      pitfalls: "",
      example: "Category sales ₹2 Cr out of ₹10 Cr brand → 20%.",
      logic: "(Brand Offtake ÷ Total Category Offtake) × 100",
    },
  ];

  const marketShareGlossary = [
    {
      kpi: "Category Size",
      definition: "The total sales value of all products within a specific category over a defined period.",
      usage: "Assess market opportunity.",
      interpretation: "Larger size → higher potential.",
      pitfalls: "Crawl time variations.",
      example: "₹10 Cr estimated category sales.",
      logic: "Total Category Sales",
    },
    {
      kpi: "Market Leader Sales",
      definition: "Total sales of the top-performing brand in the category from estimated sales.",
      usage: "Identify benchmark competitor and performance gap.",
      interpretation: "Higher leader sales → strong dominance.",
      pitfalls: "Incorrect leader identification due to time window/data gaps.",
      example: "Brand A has highest sales of ₹3 Cr in category.",
      logic: "Max(Brand Sales across category)",
    },
    {
      kpi: "Brand Estimated Sales",
      definition: "The total sales value generated by a product or brand from estimated sales.",
      usage: "Track demand and revenue generation.",
      interpretation: "Higher offtake → strong sales performance.",
      pitfalls: "Price vs volume confusion; double counting across SKUs.",
      example: "Brand sales = ₹5 Cr in last 30 days.",
      logic: "Sum(Sales Value)",
    },
    {
      kpi: "Market Share %",
      definition: "The percentage of total category sales contributed by a brand.",
      usage: "Track competitive position.",
      interpretation: "Higher share → stronger market presence.",
      pitfalls: "Crawl time variations.",
      example: "₹1 Cr / ₹5 Cr → 20%.",
      logic: "(Brand Sales ÷ Category Sales) × 100",
    },
    {
      kpi: "Overall Share of Visibility",
      definition: "The proportion of a brand’s product visibility within the top search results, including both organic and sponsored placements.",
      usage: "Measure overall digital shelf visibility across search results.",
      interpretation: "Higher SOS → strong overall presence; lower → poor discoverability.",
      pitfalls: "",
      example: "If 10 slots in top results and brand appears in 5 (3 organic + 2 sponsored) → SOS = 50%.",
      logic: "(Total Brand Appearances in Top N ÷ N) × 100",
    },
    {
      kpi: "Paid Share of Visibility",
      definition: "The proportion of a brand’s product visibility within sponsored or paid placements in search results.",
      usage: "Track effectiveness of paid visibility strategy.",
      interpretation: "Higher Sponsored SOS → strong paid dominance.",
      pitfalls: "",
      example: "Out of 4 slots, 2 are sponsored listings of brand → 50%.",
      logic: "(Sponsored Brand Appearances ÷ N) × 100",
    },
  ];

  const visibilityAnalysisGlossary = [
    {
      kpi: "Overall SOS (Share of Search)",
      definition: "The proportion of a brand’s product visibility within the top search results, including both organic and sponsored placements.",
      usage: "Measure overall digital shelf visibility across search results.",
      interpretation: "Higher SOS → strong overall presence; lower → poor discoverability.",
      pitfalls: "",
      example: "If 10 slots in top results and brand appears in 5 (3 organic + 2 sponsored) → SOS = 50%.",
      logic: "Overall SOS = (Total Brand Appearances in Top N ÷ N) × 100",
    },
    {
      kpi: "Sponsored SOS",
      definition: "The proportion of a brand’s product visibility within sponsored or paid placements in search results.",
      usage: "Track effectiveness of paid visibility strategy.",
      interpretation: "Higher Sponsored SOS → strong paid dominance.",
      pitfalls: "",
      example: "Out of 4 slots, 2 are sponsored listings of brand → 50%.",
      logic: "Sponsored SOS = (Sponsored Brand Appearances ÷ N) × 100",
    },
    {
      kpi: "Organic SOS",
      definition: "The proportion of a brand’s product visibility within organic (non-paid) search results.",
      usage: "Measure natural ranking and SEO performance.",
      interpretation: "Higher Organic SOS → strong organic discoverability.",
      pitfalls: "",
      example: "Out of 6 slots, 2 organic brand listings → 33%.",
      logic: "Organic SOS = (Organic Brand Appearances ÷ N) × 100",
    },
  ];

  const performanceMarketingGlossary = [
    {
      kpi: "Impressions",
      definition: "The total number of times a product or advertisement is displayed to users.",
      usage: "Measure reach.",
      interpretation: "Higher impressions → higher visibility.",
      pitfalls: "",
      example: "1,00,000 impressions.",
      logic: "Count of Impressions",
    },
    {
      kpi: "Conversion",
      definition: "The rate at which user interactions (such as clicks or views) result in a purchase.",
      usage: "Evaluate funnel efficiency.",
      interpretation: "Higher conversion → strong product appeal.",
      pitfalls: "",
      example: "500 orders from 10,000 clicks → 5%.",
      logic: "(Orders ÷ Clicks) × 100",
    },
    {
      kpi: "Spend",
      definition: "The total investment made in advertising and promotional activities.",
      usage: "Budget tracking.",
      interpretation: "Higher spend → higher investment.",
      pitfalls: "",
      example: "₹50,000 ad spend.",
      logic: "Sum(Ad Spend)",
    },
    {
      kpi: "ROAS",
      definition: "The revenue generated for every unit of advertising spend.",
      usage: "Measure ad efficiency.",
      interpretation: "Higher ROAS → profitable campaigns.",
      pitfalls: "",
      example: "₹5 revenue on ₹1 spend → ROAS = 5.",
      logic: "Revenue ÷ Ad Spend",
    },
    {
      kpi: "CPM",
      definition: "The cost incurred to generate one thousand impressions.",
      usage: "Measure cost efficiency.",
      interpretation: "Lower CPM → cheaper reach.",
      pitfalls: "Not comparing across campaigns.",
      example: "₹200 for 10,000 impressions → CPM = ₹20.",
      logic: "(Spend ÷ Impressions) × 1000",
    },
    {
      kpi: "Sales",
      definition: "The total sales value generated by a product or brand over a specified period.",
      usage: "Track demand and revenue generation.",
      interpretation: "Higher offtake → strong sales performance.",
      pitfalls: "Price vs volume confusion; double counting across SKUs.",
      example: "Brand sales = ₹5 Cr in last 30 days.",
      logic: "Sum(Sales Value)",
    },
    {
      kpi: "Inorganic Sales",
      definition: "Sales generated through paid channels, including advertisements and sponsored placements.",
      usage: "Measure paid contribution.",
      interpretation: "High inorganic → dependency on ads.",
      pitfalls: "Depends upon keyword targeting",
      example: "₹1.5 Cr via ads.",
      logic: "Sum(Ad Sales Value)",
    },
  ];

  const rulesGlossary = [
    {
      kpi: "Total Rules",
      definition: "The overall count of all automation rules created within the system.",
      usage: "Monitor the scale of automated intelligence running across campaigns.",
      interpretation: "Higher number implies heavy reliance on automation for optimizations.",
      pitfalls: "Having too many conflicting rules can cause unpredictable campaign behavior.",
      example: "15 automation rules currently exist.",
      logic: "Count of all automation rules",
    },
    {
      kpi: "Active",
      definition: "The number of rules currently enabled and actively scanning data to perform optimizations.",
      usage: "Identify how many automations are live right now.",
      interpretation: "Shows the active footprint of your automation strategy.",
      pitfalls: "Forgetting to pause active rules during major unpredicted sale events.",
      example: "12 active rules monitoring ACOS and budgets.",
      logic: "Count of rules where status = 'Active'",
    },
    {
      kpi: "Paused",
      definition: "The number of rules that have been temporarily disabled by the user.",
      usage: "Identify rules that are not currently running.",
      interpretation: "Useful for tracking seasonal or temporarily suspended campaign strategies.",
      pitfalls: "Leaving rules paused for too long may lead to missed optimization opportunities.",
      example: "3 rules paused due to low budget.",
      logic: "Count of rules where status = 'Paused'",
    },
    {
      kpi: "Total Triggers",
      definition: "The cumulative number of times your rules have successfully fired and executed an action.",
      usage: "Measure the frequency and impact of your automations.",
      interpretation: "High triggers mean rules are actively optimizing; zero triggers could mean the rules' conditions are too strict.",
      pitfalls: "Extremely high triggers might indicate a condition that is too loose, leading to thrashing.",
      example: "Rules fired 297 times over the selected period.",
      logic: "Sum(Execution occurrences across all rules)",
    },
  ];

  const historyGlossary = [
    {
      kpi: "Total",
      definition: "The overall number of actions attempted by the automation rules in the timeline.",
      usage: "Review the total volume of automation activity.",
      interpretation: "Shows the overall workload handled by the automation engine.",
      pitfalls: "Not digging into the breakdown (Success/Failed) of the total actions.",
      example: "20 total actions were triggered.",
      logic: "Count of all action logs",
    },
    {
      kpi: "Success",
      definition: "The number of automation actions that were executed flawlessly without errors.",
      usage: "Measure the reliability and effectiveness of your rules.",
      interpretation: "High success rate indicates healthy integrations and correct rule logic.",
      pitfalls: "Assuming a success means the strategy worked, it only means the technical execution succeeded.",
      example: "5 successful campaign budget updates.",
      logic: "Count of actions where status = 'Success'",
    },
    {
      kpi: "Pending",
      definition: "Actions that have been triggered but are currently waiting to be processed or approved.",
      usage: "Monitor queue health or actions requiring manual intervention.",
      interpretation: "A high number of pending actions could indicate a processing delay or manual approval bottleneck.",
      pitfalls: "Ignoring old pending actions which might be stuck.",
      example: "5 actions waiting to be executed.",
      logic: "Count of actions where status = 'Pending'",
    },
    {
      kpi: "Failed",
      definition: "Actions that were triggered but could not be completed due to an error.",
      usage: "Identify broken rules, API issues, or permission errors.",
      interpretation: "Needs immediate attention to ensure campaigns are optimized properly.",
      pitfalls: "Ignoring failed actions can lead to unoptimized or overspending campaigns.",
      example: "5 failed bid updates due to API rate limits.",
      logic: "Count of actions where status = 'Failed'",
    },
    {
      kpi: "Skipped",
      definition: "Actions that were evaluated but bypassed because they didn't meet all secondary criteria or were manually dismissed.",
      usage: "Understand why certain rules fired but took no action.",
      interpretation: "Normal behavior if safeguards (like maximum bid limits) prevented the action.",
      pitfalls: "Consistently skipped actions might mean your rule safeguards are too restrictive.",
      example: "5 actions skipped because budget limit was already reached.",
      logic: "Count of actions where status = 'Skipped'",
    },
  ];

  const GlossarySection = ({ title, text, icon, bgColor, borderColor, textColor }) => {
    if (!text) return null;
    return (
      <Box
        sx={{
          p: 1.5,
          mb: 1.5,
          bgcolor: bgColor,
          borderRadius: "12px",
          border: `1px solid ${borderColor}`,
          display: "flex",
          gap: 1.5,
        }}
      >
        <Box sx={{ color: textColor, mt: 0.2 }}>{icon}</Box>
        <Box>
          <Typography variant="caption" fontWeight="700" sx={{ color: textColor, textTransform: "uppercase", display: "block", mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#475569", fontSize: "0.775rem", lineHeight: 1.5 }}>
            {text}
          </Typography>
        </Box>
      </Box>
    );
  };

  const menuItems = [
    { label: "Overview", icon: <DashboardIcon sx={{ fontSize: "1.1rem" }} /> },
    { label: "Rules", icon: <ScheduleIcon sx={{ fontSize: "1rem" }} /> },
    { label: "History", icon: <DescriptionIcon sx={{ fontSize: "1rem" }} /> },
  ];

  const faqCategories = [
    { label: "TAT & Timelines", icon: <ScheduleIcon sx={{ fontSize: "1rem" }} /> },
    { label: "Rules", icon: <DashboardIcon sx={{ fontSize: "1rem" }} /> },
    { label: "Capabilities", icon: <AutoGraphIcon sx={{ fontSize: "1rem" }} /> },
    { label: "Thresholds", icon: <PriceChangeIcon sx={{ fontSize: "1rem" }} /> },
    { label: "Access & Credentials", icon: <PublicIcon sx={{ fontSize: "1rem" }} /> }
  ];

  const faqData = {
    "TAT & Timelines": [
      {
        q: "How long does it take for new dashboard metrics to reflect?",
        a: "Most performance metrics are updated daily at 09:00 AM. However, real-time metrics (like active rules) update within 15 minutes of execution."
      },
      {
        q: "What is the TAT for historical data backfill?",
        a: "Standard historical data backfill takes approximately 3-5 working days depending on the data volume."
      }
    ],
    "Rules": [
      {
        q: "What is the turnaround time for backend-applied rules?",
        a: "Please note: Any automation rules applied at the backend carry a 2 working day TAT for full implementation and testing before they go live."
      },
      {
        q: "Can I pause an active rule immediately?",
        a: "Yes! Any rule paused from the frontend is stopped immediately and will not execute its next scheduled run."
      }
    ],
    "Capabilities": [
      {
        q: "Which platforms are supported by the automation engine?",
        a: "We currently support integrations with Amazon, Blinkit, Zepto, and Instamart. More platforms are actively being developed."
      },
      {
        q: "Can I apply a single rule to multiple brands?",
        a: "Yes, you can configure multi-brand rules by selecting 'All Brands' or manually picking specific brands during rule creation."
      }
    ],
    "Thresholds": [
      {
        q: "What are the limits on budget adjustments?",
        a: "To prevent accidental overspend, the system restricts single-action budget increases to a maximum of 50% of the current daily budget."
      },
      {
        q: "How do ACOS thresholds work?",
        a: "ACOS thresholds act as safety nets. If a campaign's ACOS exceeds your defined limit over the specified window (e.g., 7 days), the rule will trigger the designated action (like Pause or Alert)."
      }
    ],
    "Access & Credentials": [
      {
        q: "Who can create and edit automation rules?",
        a: "Only users with 'Admin' or 'Campaign Manager' roles can create, edit, or delete rules. 'Viewer' roles can only see the History and Status."
      },
      {
        q: "Do I need to re-authenticate my platform accounts?",
        a: "Platform credentials usually remain active for 90 days. You will receive an email and a dashboard alert 7 days before any token expires."
      }
    ]
  };

  const filteredMenuItems = menuItems;

  const getGlossarySource = () => {
    switch (activeMenu) {
      case "Overview":
        return businessOverviewGlossary;
      case "Availability Analysis":
        return availabilityAnalysisGlossary;
      case "Market Share":
        return marketShareGlossary;
      case "Visibility Analysis":
        return visibilityAnalysisGlossary;
      case "Rules":
        return rulesGlossary;
      case "History":
        return historyGlossary;
      default:
        return businessOverviewGlossary;
    }
  };

  const filteredGlossary = getGlossarySource().filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.kpi.toLowerCase().includes(q) ||
      item.definition.toLowerCase().includes(q) ||
      (item.usage && item.usage.toLowerCase().includes(q)) ||
      (item.interpretation && item.interpretation.toLowerCase().includes(q))
    );
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Drawer
      anchor="right"
      open={helpDrawerOpen}
      onClose={closeHelp}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: "70vw", md: "60vw", lg: "50vw" },
          bgcolor: "#f8fafc",
          borderLeft: "1px solid #e2e8f0",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.05)",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "10px",
              bgcolor: "rgba(37, 99, 235, 0.1)",
              color: "#2563eb",
            }}
          >
            <HelpIcon />
          </Box>
          <Typography variant="h6" fontWeight="700" sx={{ color: "#1e293b", fontSize: "1.0rem" }}>
            Let's Get Started
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: { xs: 150, sm: 250 },
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                bgcolor: "#f1f5f9",
                "& fieldset": { border: "none" },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#64748b", fontSize: "1.2rem" }} />
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={closeHelp} size="small" sx={{ color: "#64748b", "&:hover": { bgcolor: "#f1f5f9" } }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Help Sidebar */}
        <Box
          sx={{
            width: 210,
            borderRight: "1px solid #e2e8f0",
            bgcolor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <Box sx={{ p: 2, pb: 1 }}>
            <Typography
              variant="overline"
              sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em" }}
            >
              MODULES
            </Typography>
        </Box>
        <List sx={{ px: 1 }}>
          {(activeTab === 0 ? filteredMenuItems : faqCategories).map((item) => {
            const isSelected = activeTab === 0 ? activeMenu === item.label : activeFaqMenu === item.label;
            return (
              <ListItemButton
                key={item.label}
                selected={isSelected}
                onClick={() => activeTab === 0 ? setActiveMenu(item.label) : setActiveFaqMenu(item.label)}
                sx={{
                  borderRadius: "8px",
                  mb: 0.5,
                  py: 1,
                  "&.Mui-selected": {
                    bgcolor: "rgba(37, 99, 235, 0.08)",
                    color: "#2563eb",
                    "& .MuiListItemIcon-root": { color: "#2563eb" },
                    "&:hover": { bgcolor: "rgba(37, 99, 235, 0.12)" },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: "#64748b" }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "0.825rem",
                    fontWeight: isSelected ? 600 : 500,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

        {/* Content Tabs & View */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", bgcolor: "#f8fafc" }}>
          <Box sx={{ px: 3, bgcolor: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                "& .MuiTabs-indicator": { height: 3, borderRadius: "3px 3px 0 0", bgcolor: "#2563eb" },
              }}
            >
              <Tab
                label="Glossary"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  minWidth: 100,
                  color: "#64748b",
                  "&.Mui-selected": { color: "#2563eb" },
                }}
              />
              <Tab
                label="FAQ"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  minWidth: 100,
                  color: "#64748b",
                  "&.Mui-selected": { color: "#2563eb" },
                }}
              />
            </Tabs>
          </Box>

          <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
            <Box>
              <Box sx={{ display: 'grid', gap: 2 }}>
                {activeTab === 0 && (
                  ["Overview", "Availability Analysis", "Market Share", "Visibility Analysis", "Pricing Analysis", "Rules", "History"].includes(activeMenu) ? (
                    filteredGlossary.map((item) => {
                      const isExpanded = expandedKpi === item.kpi;
                      return (
                        <Box
                          key={item.kpi}
                          sx={{
                            bgcolor: "#ffffff",
                            borderRadius: "12px",
                            border: `1px solid ${isExpanded ? "#2563eb" : "#e2e8f0"}`,
                            boxShadow: isExpanded ? "0 4px 12px rgba(37, 99, 235, 0.06)" : "0 1px 3px rgba(0,0,0,0.02)",
                            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                            overflow: "hidden",
                            "&:hover": {
                              borderColor: "#cbd5e1",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                            }
                          }}
                        >
                          <ListItemButton
                            onClick={() => setExpandedKpi(isExpanded ? null : item.kpi)}
                            sx={{
                              p: 2,
                              alignItems: "flex-start",
                              gap: 2,
                              "&:hover .kpi-title": {
                                color: "#2563eb",
                                transform: "translateX(4px)"
                              }
                            }}
                          >
                            <Box sx={{ flex: 1 }}>
                              <Typography
                                className="kpi-title"
                                fontWeight="700"
                                sx={{
                                  color: isExpanded ? "#2563eb" : "#1e293b",
                                  fontSize: "0.95rem",
                                  mb: 0.5,
                                  transition: "all 0.2s ease"
                                }}
                              >
                                {item.kpi}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.825rem", lineHeight: 1.5 }}>
                                {item.definition}
                              </Typography>
                            </Box>
                            <Box sx={{ color: "#2563eb", mt: 0.5 }}>
                              {isExpanded ? <RemoveIcon /> : <AddIcon />}
                            </Box>
                          </ListItemButton>

                          <Collapse in={isExpanded}>
                            <Box sx={{ p: 2, pt: 0 }}>
                              <GlossarySection
                                title="Usage"
                                text={item.usage}
                                icon={<UsageIcon fontSize="small" />}
                                bgColor="#f0f9ff"
                                borderColor="#bae6fd"
                                textColor="#0369a1"
                              />
                              <GlossarySection
                                title="Common Pitfalls"
                                text={item.pitfalls}
                                icon={<PitfallsIcon fontSize="small" />}
                                bgColor="#fef2f2"
                                borderColor="#fecaca"
                                textColor="#b91c1c"
                              />
                              <GlossarySection
                                title="Interpretation"
                                text={item.interpretation}
                                icon={<InterpretationIcon fontSize="small" />}
                                bgColor="#faf5ff"
                                borderColor="#e9d5ff"
                                textColor="#7e22ce"
                              />
                              <GlossarySection
                                title="Example"
                                text={item.example}
                                icon={<ExampleIcon fontSize="small" />}
                                bgColor="#fffbeb"
                                borderColor="#fef3c7"
                                textColor="#b45309"
                              />
                              <GlossarySection
                                title="Logic / Calculation"
                                text={item.logic}
                                icon={<LogicIcon fontSize="small" />}
                                bgColor="#f0fdf4"
                                borderColor="#bbf7d0"
                                textColor="#15803d"
                              />
                            </Box>
                          </Collapse>
                        </Box>
                      );
                    })
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <HelpIcon sx={{ fontSize: 48, color: '#e2e8f0', mb: 2 }} />
                      <Typography sx={{ color: '#64748b' }}>
                        No glossary entries found for this module.
                      </Typography>
                    </Box>
                  )
                )}

                {activeTab === 1 && (
                  (faqData[activeFaqMenu] || []).filter(item => !searchQuery || item.q.toLowerCase().includes(searchQuery.toLowerCase()) || item.a.toLowerCase().includes(searchQuery.toLowerCase())).map((item, idx) => {
                    const isExpanded = expandedFaq === idx;
                    return (
                      <Box
                        key={idx}
                        sx={{
                          bgcolor: "#ffffff",
                          borderRadius: "12px",
                          border: `1px solid ${isExpanded ? "#2563eb" : "#e2e8f0"}`,
                          boxShadow: isExpanded ? "0 4px 12px rgba(37, 99, 235, 0.06)" : "0 1px 3px rgba(0,0,0,0.02)",
                          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                          overflow: "hidden",
                          "&:hover": {
                            borderColor: "#cbd5e1",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                          }
                        }}
                      >
                        <ListItemButton
                          onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                          sx={{
                            p: 2,
                            alignItems: "flex-start",
                            gap: 2,
                            "&:hover .faq-title": {
                              color: "#2563eb",
                              transform: "translateX(4px)"
                            }
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              className="faq-title"
                              fontWeight="700"
                              sx={{
                                color: isExpanded ? "#2563eb" : "#1e293b",
                                fontSize: "0.95rem",
                                transition: "all 0.2s ease"
                              }}
                            >
                              {item.q}
                            </Typography>
                          </Box>
                          <Box sx={{ color: "#2563eb", mt: 0.5 }}>
                            {isExpanded ? <RemoveIcon /> : <AddIcon />}
                          </Box>
                        </ListItemButton>

                        <Collapse in={isExpanded}>
                          <Box sx={{ p: 2, pt: 0 }}>
                            <Box sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                              <Typography variant="body2" sx={{ color: "#475569", fontSize: "0.875rem", lineHeight: 1.6 }}>
                                {item.a}
                              </Typography>
                            </Box>
                          </Box>
                        </Collapse>
                      </Box>
                    );
                  })
                )}

                {activeTab === 1 && (faqData[activeFaqMenu] || []).length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <HelpIcon sx={{ fontSize: 48, color: '#e2e8f0', mb: 2 }} />
                    <Typography sx={{ color: '#64748b' }}>
                      No FAQs found for this category.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default HelpDrawer;
