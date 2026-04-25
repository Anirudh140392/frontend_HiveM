import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    IconButton,
    Tabs,
    Tab,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    MenuItem,
    Select,
    FormControl,
    Button,
    LinearProgress
} from '@mui/material';
import {
    DollarSign,
    Eye,
    ShoppingCart,
    ShoppingBag,
    TrendingUp,
    BarChart2,
    RefreshCw,
    Info,
    Flame,
    CheckCircle2,
    PauseCircle,
    MousePointerClick,
    Zap,
    Target,
    Plus,
    Trophy,
    ChevronDown,
    X,
    ArrowUpRight,
    Target as TargetIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip
} from 'recharts';

import { FilterContext } from '../../utils/FilterContext';

const OverviewDashboard = () => {
    const { 
        selectedChannel, 
        platform: selectedPlatform, 
        selectedCategory, 
        selectedBrand: globalSelectedBrand,
        timeStart,
        timeEnd
    } = React.useContext(FilterContext);
    const [activeTab, setActiveTab] = useState(0);
    const [lastUpdated, setLastUpdated] = useState('');
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [goals, setGoals] = useState([
        { id: 1, name: "Q1 Revenue Target", metric: "Sales", target: "₹50L", current: "₹42L", progress: 84, status: "On Track", color: "#3b82f6" },
        { id: 2, name: "Ad Efficiency", metric: "ROAS", target: "30x", current: "27.3x", progress: 91, status: "Achieved", color: "#10b981" },
        { id: 3, name: "Inventory Boost", metric: "Orders", target: "10K", current: "8.6K", progress: 86, status: "On Track", color: "#3b82f6" },
        { id: 4, name: "Market Reach", metric: "Impressions", target: "15L", current: "10.4L", progress: 69, status: "At Risk", color: "#f43f5e" }
    ]);
    const [newGoal, setNewGoal] = useState({
        name: '',
        level: 'Account',
        value: '',
        metric: 'Spends',
        targetValue: 0,
        period: 'Monthly',
        priority: 'Medium'
    });
    const [goalFilter, setGoalFilter] = useState('all');

    useEffect(() => {
        const now = new Date();
        setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, []);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    // Dynamic Data Generation based on Filters
    const dashboardData = React.useMemo(() => {
        // Helper to check if filter is effectively 'All'
        const isAll = (val, total) => val === 'All' || (Array.isArray(val) && (val.includes('All') || val.length === 0 || val.length === total));

        const channelMult = isAll(selectedChannel, 1) ? 1.2 : 0.8;
        const platformMult = isAll(selectedPlatform, 3) ? 1.1 : (Array.isArray(selectedPlatform) ? (0.4 + (selectedPlatform.length * 0.2)) : 0.7);
        const brandMult = isAll(globalSelectedBrand, 3) ? 1.0 : (Array.isArray(globalSelectedBrand) ? (0.5 + (globalSelectedBrand.length * 0.15)) : 0.6);
        
        // Date range multiplier
        const days = timeEnd && timeStart ? timeEnd.diff(timeStart, 'days') + 1 : 7;
        const dateMult = days / 7; // Normalize to a week

        const combinedMult = channelMult * platformMult * brandMult * dateMult;

        return {
            topCards: [
                { title: "Total Spend", value: `₹${(3.73 * combinedMult).toFixed(2)}L`, icon: <DollarSign className="w-5 h-5 text-white" />, iconBg: "bg-[#10b981]" },
                { title: "Impressions", value: `${(10.42 * combinedMult).toFixed(2)}L`, icon: <Eye className="w-5 h-5 text-white" />, iconBg: "bg-[#8b5cf6]" },
                { title: "ATC", value: `${Math.round(19.6 * combinedMult)}K`, icon: <ShoppingCart className="w-5 h-5 text-white" />, iconBg: "bg-[#f97316]" },
                { title: "Orders", value: `${Math.round(8.6 * combinedMult)}K`, icon: <ShoppingBag className="w-5 h-5 text-white" />, iconBg: "bg-[#3b82f6]" },
                { title: "Total Sales", value: `₹${(1.02 * combinedMult).toFixed(2)}Cr`, icon: <TrendingUp className="w-5 h-5 text-white" />, iconBg: "bg-[#10b981]" },
                { title: "ROAS", value: `${(27.37 * (1 + (combinedMult * 0.1 / dateMult))).toFixed(2)}x`, icon: <BarChart2 className="w-5 h-5 text-white" />, iconBg: "bg-[#6366f1]" }
            ],
            adTypeData: {
                0: [ // Product Listing
                    { title: "ROAS", value: `${(28.15 * (1 + (combinedMult * 0.05 / dateMult))).toFixed(2)}x`, status: "Strong returns", statusIcon: <Flame className="w-3.5 h-3.5 text-orange-500" />, bgColor: "bg-[#ecfdf5]", borderColor: "border-[#10b981]/20", titleIcon: <TrendingUp className="w-3.5 h-3.5 text-[#10b981] mr-1" /> },
                    { title: "ACoS", value: `${(3.55 * (1 - (combinedMult * 0.02 / dateMult))).toFixed(2)}%`, status: "Efficient", statusIcon: <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />, bgColor: "bg-[#f8fafc]", borderColor: "border-slate-100", titleIcon: <Target className="w-3.5 h-3.5 text-rose-400 mr-1" /> },
                    { title: "CTR", value: `${(1.49 * (1 + (combinedMult * 0.01 / dateMult))).toFixed(2)}%`, status: "Click-through rate", statusIcon: null, bgColor: "bg-[#f8fafc]", borderColor: "border-slate-100", titleIcon: <MousePointerClick className="w-3.5 h-3.5 text-blue-400 mr-1" /> },
                    { title: "CVR", value: `${(47.34 * (1 + (combinedMult * 0.03 / dateMult))).toFixed(2)}%`, status: "Conversion rate", statusIcon: null, bgColor: "bg-[#f8fafc]", borderColor: "border-slate-100", titleIcon: <Zap className="w-3.5 h-3.5 text-indigo-400 mr-1" /> },
                    { title: "CPC", value: `₹${Math.round(25 * (1 + (combinedMult * 0.02 / dateMult)))}`, status: "Cost per click", statusIcon: null, bgColor: "bg-[#f8fafc]", borderColor: "border-slate-100", titleIcon: <BarChart2 className="w-3.5 h-3.5 text-sky-400 mr-1" /> },
                    { title: "Add to Cart", value: `${Math.round(16.8 * combinedMult)}K`, status: "Cart additions", statusIcon: null, bgColor: "bg-[#f8fafc]", borderColor: "border-slate-100", titleIcon: <ShoppingCart className="w-3.5 h-3.5 text-orange-400 mr-1" /> }
                ],
                1: [ // Product Rec
                    { title: "ROAS", value: `${(15.42 * (1 + (combinedMult * 0.04 / dateMult))).toFixed(2)}x`, status: "Steady", statusIcon: <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />, bgColor: "bg-[#f8fafc]", borderColor: "border-slate-100", titleIcon: <TrendingUp className="w-3.5 h-3.5 text-[#10b981] mr-1" /> },
                    { title: "ACoS", value: `${(6.48 * (1 - (combinedMult * 0.01 / dateMult))).toFixed(2)}%`, status: "Normal", statusIcon: null, bgColor: "bg-[#f8fafc]", borderColor: "border-slate-100", titleIcon: <Target className="w-3.5 h-3.5 text-rose-400 mr-1" /> },
                    { title: "CTR", value: `${(0.82 * (1 + (combinedMult * 0.02 / dateMult))).toFixed(2)}%`, status: "Room for growth", statusIcon: null, bgColor: "bg-[#fffbeb]", borderColor: "border-amber-100", titleIcon: <MousePointerClick className="w-3.5 h-3.5 text-blue-400 mr-1" /> },
                    { title: "CVR", value: `${(22.15 * (1 + (combinedMult * 0.02 / dateMult))).toFixed(2)}%`, status: "Lower funnel", statusIcon: null, bgColor: "bg-[#f8fafc]", borderColor: "border-slate-100", titleIcon: <Zap className="w-3.5 h-3.5 text-indigo-400 mr-1" /> },
                    { title: "CPC", value: `₹${Math.round(18 * (1 + (combinedMult * 0.01 / dateMult)))}`, status: "Competitive", statusIcon: null, bgColor: "bg-[#f8fafc]", borderColor: "border-slate-100", titleIcon: <BarChart2 className="w-3.5 h-3.5 text-sky-400 mr-1" /> },
                    { title: "Add to Cart", value: `${Math.round(4.2 * combinedMult)}K`, status: "Consistent", statusIcon: null, bgColor: "bg-[#f8fafc]", borderColor: "border-slate-100", titleIcon: <ShoppingCart className="w-3.5 h-3.5 text-orange-400 mr-1" /> }
                ],
                2: [ // Brand Booster
                    { title: "ROAS", value: `${(12.24 * (1 + (combinedMult * 0.03 / dateMult))).toFixed(2)}x`, status: "Awareness focus", statusIcon: <Info className="w-3.5 h-3.5 text-blue-500" />, bgColor: "bg-[#f8fafc]", borderColor: "border-slate-100", titleIcon: <TrendingUp className="w-3.5 h-3.5 text-[#10b981] mr-1" /> },
                    { title: "ACoS", value: `${(8.15 * (1 - (combinedMult * 0.01 / dateMult))).toFixed(2)}%`, status: "Investment", statusIcon: null, bgColor: "bg-[#eff6ff]", borderColor: "border-blue-100", titleIcon: <Target className="w-3.5 h-3.5 text-rose-400 mr-1" /> },
                    { title: "CTR", value: `${(2.14 * (1 + (combinedMult * 0.04 / dateMult))).toFixed(2)}%`, status: "High engagement", statusIcon: <Flame className="w-3.5 h-3.5 text-orange-500" />, bgColor: "bg-[#ecfdf5]", borderColor: "border-[#10b981]/20", titleIcon: <MousePointerClick className="w-3.5 h-3.5 text-blue-400 mr-1" /> },
                    { title: "CVR", value: `${(15.42 * (1 + (combinedMult * 0.01 / dateMult))).toFixed(2)}%`, status: "Top funnel", statusIcon: null, bgColor: "bg-[#f8fafc]", borderColor: "border-slate-100", titleIcon: <Zap className="w-3.5 h-3.5 text-indigo-400 mr-1" /> },
                    { title: "CPC", value: `₹${Math.round(32 * (1 + (combinedMult * 0.03 / dateMult)))}`, status: "Premium", statusIcon: null, bgColor: "bg-[#fef2f2]", borderColor: "border-rose-100", titleIcon: <BarChart2 className="w-3.5 h-3.5 text-sky-400 mr-1" /> },
                    { title: "Add to Cart", value: `${Math.round(2.8 * combinedMult)}K`, status: "Discovery", statusIcon: null, bgColor: "bg-[#f8fafc]", borderColor: "border-slate-100", titleIcon: <ShoppingCart className="w-3.5 h-3.5 text-orange-400 mr-1" /> }
                ]
            },
            spendSalesData: Array.from({ length: 6 }, (_, i) => ({
                date: timeStart ? timeStart.clone().add(Math.floor(days * i / 5), 'days').format('DD MMM') : `${14 + i} Apr`,
                spend: (2000 + Math.random() * 500) * (combinedMult / 5),
                sales: (50 + Math.random() * 20) * (combinedMult / 5)
            })),
            impressionsData: Array.from({ length: 6 }, (_, i) => ({
                date: timeStart ? timeStart.clone().add(Math.floor(days * i / 5), 'days').format('DD MMM') : `${14 + i} Apr`,
                value: (170 + Math.random() * 30) * (combinedMult / 5)
            }))
        };
    }, [selectedChannel, selectedPlatform, globalSelectedBrand, selectedCategory, timeStart, timeEnd]);

    const { topCards, adTypeData, spendSalesData, impressionsData } = dashboardData;
    const adTypeMetrics = adTypeData[activeTab] || adTypeData[0];

    return (
        <Box sx={{
            p: 3,
            borderRadius: 5,
            bgcolor: '#fbfcfd',
            minHeight: '100vh',
            fontFamily: "'Inter', 'Roboto', sans-serif",
            '& .MuiTypography-root': { fontFamily: "'Inter', 'Roboto', sans-serif" },
            '& .MuiButton-root': { fontFamily: "'Inter', 'Roboto', sans-serif" },
            '& .MuiChip-root': { fontFamily: "'Inter', 'Roboto', sans-serif" },
            '& .MuiTab-root': { fontFamily: "'Inter', 'Roboto', sans-serif" }
        }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5 }}>
                        Executive Overview
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                            Performance metrics for All Brands
                        </Typography>
                        <Chip
                            label="Blinkit"
                            size="small"
                            sx={{
                                bgcolor: '#eff6ff',
                                color: '#3b82f6',
                                fontWeight: 700,
                                fontSize: '10px',
                                height: '20px'
                            }}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                        Updated {lastUpdated}
                    </Typography>
                    <IconButton 
                        size="small" 
                        sx={{ color: '#94a3b8' }}
                        onClick={() => {
                            const now = new Date();
                            setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
                        }}
                    >
                        <RefreshCw size={14} />
                    </IconButton>
                </Box>
            </Box>

            {/* Top Cards Grid */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 2.5, mb: 4 }}>
                {topCards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <Card sx={{
                            borderRadius: '16px',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
                            border: '1px solid rgba(0,0,0,0.04)',
                            height: '100%'
                        }}>
                            <CardContent sx={{ p: '20px !important' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{
                                        p: 1.5,
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }} className={card.iconBg}>
                                        {card.icon}
                                    </Box>
                                    <IconButton size="small" sx={{ color: '#cbd5e1', p: 0.5 }}>
                                        <Info size={14} />
                                    </IconButton>
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5, lineHeight: 1 }}>
                                    {card.value}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                                    {card.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </Box>

            {/* Ad Type Intelligence Section */}
            <Card sx={{
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.05)'
            }}>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Target className="w-5 h-5 text-rose-500" />
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', fontSize: '1rem' }}>
                                Ad Type Intelligence
                            </Typography>
                            <Chip
                                label="Blinkit"
                                size="small"
                                sx={{
                                    bgcolor: '#fef3c7',
                                    color: '#d97706',
                                    fontWeight: 700,
                                    fontSize: '10px',
                                    height: '20px'
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip
                                icon={<CheckCircle2 size={12} />}
                                label="34 Active"
                                size="small"
                                sx={{
                                    bgcolor: 'transparent',
                                    border: '1px solid #10b981',
                                    color: '#10b981',
                                    fontWeight: 600,
                                    '& .MuiChip-icon': { color: '#10b981' }
                                }}
                            />
                            <Chip
                                icon={<PauseCircle size={12} />}
                                label="48 Paused"
                                size="small"
                                sx={{
                                    bgcolor: 'transparent',
                                    border: '1px solid #f59e0b',
                                    color: '#f59e0b',
                                    fontWeight: 600,
                                    '& .MuiChip-icon': { color: '#f59e0b' }
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Tabs */}
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3, bgcolor: '#f8fafc', borderRadius: '12px', p: 0.5 }}>
                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            sx={{
                                minHeight: '36px',
                                '& .MuiTabs-indicator': { display: 'none' },
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    minHeight: '36px',
                                    borderRadius: '8px',
                                    color: '#64748b',
                                    px: 3,
                                    transition: 'all 0.2s ease',
                                    '&.Mui-selected': {
                                        color: '#2563eb',
                                        bgcolor: 'white',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                    }
                                }
                            }}
                        >
                            <Tab label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Product Listing
                                    {activeTab === 0 && <Box component={motion.div} layoutId="activeDot" sx={{ width: 6, height: 6, bgcolor: '#10b981', borderRadius: '50%' }} />}
                                </Box>
                            } />
                            <Tab label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Product Rec
                                    {activeTab === 1 && <Box component={motion.div} layoutId="activeDot" sx={{ width: 6, height: 6, bgcolor: '#10b981', borderRadius: '50%' }} />}
                                </Box>
                            } />
                            <Tab label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Brand Booster
                                    {activeTab === 2 && <Box component={motion.div} layoutId="activeDot" sx={{ width: 6, height: 6, bgcolor: '#10b981', borderRadius: '50%' }} />}
                                </Box>
                            } />
                        </Tabs>
                    </Box>

                    {/* Ad Type Metrics Grid */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 2 }}>
                        {adTypeMetrics.map((metric, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Box className={`${metric.bgColor} ${metric.borderColor} border rounded-xl p-3 h-full`}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                        {metric.titleIcon}
                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            {metric.title}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5, lineHeight: 1.2 }}>
                                        {metric.value}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        {metric.statusIcon}
                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                                            {metric.status}
                                        </Typography>
                                    </Box>
                                </Box>
                            </motion.div>
                        ))}
                    </Box>
                </CardContent>
            </Card>

            {/* Charts Section */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3, mt: 4 }}>
                <Card sx={{
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.05)'
                }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>
                            Spend vs Sales Trend
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                            Daily performance over selected period
                        </Typography>
                        <Box sx={{ height: 250, width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={spendSalesData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `${value}k`} />
                                    <RechartsTooltip cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3' }} />
                                    <Area type="monotone" dataKey="spend" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSpend)" />
                                    <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} fill="none" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>

                <Card sx={{
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.05)'
                }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>
                            Impressions Volume
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                            Top of funnel activity
                        </Typography>
                        <Box sx={{ height: 250, width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={impressionsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `${value}k`} />
                                    <RechartsTooltip cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3' }} />
                                    <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorImp)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* Goals Command Center Section */}
            <Card sx={{
                mt: 4,
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.05)',
                overflow: 'hidden'
            }}>
                <CardContent sx={{ p: 0 }}>
                    {/* Goals Header */}
                    <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ 
                                p: 1, 
                                borderRadius: '10px', 
                                bgcolor: '#f0fdf4', 
                                border: '1px solid #dcfce7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Target size={20} className="text-emerald-500" />
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b', lineHeight: 1.2 }}>
                                    Goals Command Center
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#64748b' }}>
                                    Track performance targets
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ 
                                display: 'flex', 
                                bgcolor: '#f8fafc', 
                                p: 0.5, 
                                borderRadius: '10px',
                                border: '1px solid #e2e8f0'
                            }}>
                                <Box 
                                    onClick={() => setGoalFilter('active')}
                                    sx={{ 
                                        px: 2, 
                                        py: 0.5, 
                                        borderRadius: '8px', 
                                        bgcolor: goalFilter === 'active' ? 'white' : 'transparent', 
                                        boxShadow: goalFilter === 'active' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                        color: goalFilter === 'active' ? '#10b981' : '#64748b',
                                        fontWeight: goalFilter === 'active' ? 700 : 600,
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Active
                                </Box>
                                <Box 
                                    onClick={() => setGoalFilter('all')}
                                    sx={{ 
                                        px: 2, 
                                        py: 0.5, 
                                        borderRadius: '8px', 
                                        bgcolor: goalFilter === 'all' ? 'white' : 'transparent', 
                                        boxShadow: goalFilter === 'all' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                        color: goalFilter === 'all' ? '#10b981' : '#64748b',
                                        fontWeight: goalFilter === 'all' ? 700 : 600,
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    All
                                </Box>
                            </Box>
                            <Box
                                component={motion.button}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsGoalModalOpen(true)}
                                sx={{
                                    bgcolor: '#10b981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    px: 2.5,
                                    py: 1,
                                    fontWeight: 700,
                                    fontSize: '13px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                                }}
                            >
                                <Plus size={16} />
                                Add Goal
                            </Box>
                        </Box>
                    </Box>

                    {/* Goals Content */}
                    <Box sx={{ p: 4, display: 'flex', alignItems: 'flex-start' }}>
                        {/* Left Gauge */}
                        <Box sx={{ width: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 8, mt: 2 }}>
                            <Box sx={{ position: 'relative', width: 120, height: 120 }}>
                                <Box sx={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    border: '12px solid #f1f5f9',
                                    boxSizing: 'border-box'
                                }} />
                                <Box sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>
                                        {goals.filter(g => g.status === 'Achieved').length}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                                        of {goals.length}
                                    </Typography>
                                </Box>
                                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="54"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="12"
                                        strokeDasharray={Math.PI * 108}
                                        strokeDashoffset={Math.PI * 108 * (1 - (goals.filter(g => g.status === 'Achieved').length / (goals.length || 1)))}
                                        strokeLinecap="round"
                                        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                                    />
                                </svg>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981' }} />
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>Achieved</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f43f5e' }} />
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>Not Achieved</Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Right Content Table */}
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', borderBottom: '1px solid #f1f5f9', pb: 1.5, mb: 2 }}>
                                {['GOAL', 'METRIC', 'TARGET', 'CURRENT', 'PROGRESS', 'STATUS'].map((header) => (
                                    <Typography 
                                        key={header} 
                                        variant="caption" 
                                        sx={{ 
                                            flex: header === 'GOAL' ? 1.5 : 1, 
                                            color: '#94a3b8', 
                                            fontWeight: 700, 
                                            fontSize: '11px',
                                            letterSpacing: '0.05em',
                                            textAlign: header === 'STATUS' ? 'right' : 'left'
                                        }}
                                    >
                                        {header}
                                    </Typography>
                                ))}
                            </Box>
                            
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                {goals.filter(g => goalFilter === 'all' || g.status !== 'Achieved').length > 0 ? (
                                    goals
                                        .filter(g => goalFilter === 'all' || g.status !== 'Achieved')
                                        .map((goal, idx) => (
                                        <Box 
                                            key={goal.id} 
                                            component={motion.div}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                py: 2, 
                                                borderBottom: idx !== goals.length - 1 ? '1px solid #f8fafc' : 'none',
                                                '&:hover': { bgcolor: '#fbfcfd' }
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ flex: 1.5, fontWeight: 700, color: '#1e293b' }}>
                                                {goal.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ flex: 1, color: '#64748b', fontWeight: 500 }}>
                                                {goal.metric}
                                            </Typography>
                                            <Typography variant="body2" sx={{ flex: 1, color: '#1e293b', fontWeight: 600 }}>
                                                {goal.target}
                                            </Typography>
                                            <Typography variant="body2" sx={{ flex: 1, color: '#1e293b', fontWeight: 600 }}>
                                                {goal.current}
                                            </Typography>
                                            <Box sx={{ flex: 1, pr: 4 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                    <Typography variant="caption" sx={{ fontWeight: 700, color: goal.color }}>{goal.progress}%</Typography>
                                                </Box>
                                                <LinearProgress 
                                                    variant="determinate" 
                                                    value={goal.progress} 
                                                    sx={{ 
                                                        height: 6, 
                                                        borderRadius: 3, 
                                                        bgcolor: '#f1f5f9',
                                                        '& .MuiLinearProgress-bar': { bgcolor: goal.color, borderRadius: 3 }
                                                    }} 
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                <Chip 
                                                    label={goal.status} 
                                                    size="small" 
                                                    sx={{ 
                                                        height: '24px',
                                                        fontSize: '11px',
                                                        fontWeight: 700,
                                                        bgcolor: goal.status === 'Achieved' ? '#ecfdf5' : (goal.status === 'On Track' ? '#eff6ff' : '#fef2f2'),
                                                        color: goal.status === 'Achieved' ? '#10b981' : (goal.status === 'On Track' ? '#3b82f6' : '#f43f5e'),
                                                        border: 'none'
                                                    }} 
                                                />
                                            </Box>
                                        </Box>
                                    ))
                                ) : (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                                        <Box sx={{ 
                                            width: 64, 
                                            height: 64, 
                                            borderRadius: '50%', 
                                            bgcolor: '#f8fafc', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center',
                                            mb: 2,
                                            border: '1px solid #f1f5f9'
                                        }}>
                                            <Trophy size={32} className="text-slate-300" />
                                        </Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#475569', mb: 0.5 }}>
                                            No goals yet
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                                            Create your first performance goal
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Create Goal Modal */}
            <Dialog 
                open={isGoalModalOpen} 
                onClose={() => setIsGoalModalOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: '20px',
                        width: '100%',
                        maxWidth: '450px',
                        p: 1
                    }
                }}
            >
                <DialogTitle sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ 
                            p: 1, 
                            borderRadius: '10px', 
                            bgcolor: '#f0fdf4',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <TargetIcon size={20} className="text-emerald-500" />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', fontSize: '1.1rem' }}>
                            Create New Goal
                        </Typography>
                    </Box>
                    <IconButton onClick={() => setIsGoalModalOpen(false)} size="small" sx={{ color: '#94a3b8' }}>
                        <X size={20} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 2, pt: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>Goal Name *</Typography>
                            <TextField 
                                fullWidth 
                                placeholder="e.g., Q1 Revenue Target" 
                                variant="outlined" 
                                size="small"
                                value={newGoal.name}
                                onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f8fafc' } }}
                            />
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>Data Level *</Typography>
                                <Select
                                    fullWidth
                                    size="small"
                                    value={newGoal.level}
                                    onChange={(e) => setNewGoal({...newGoal, level: e.target.value})}
                                    sx={{ borderRadius: '12px', bgcolor: '#f8fafc' }}
                                >
                                    <MenuItem value="Account">Account</MenuItem>
                                    <MenuItem value="Campaign">Campaign</MenuItem>
                                    <MenuItem value="Ad Group">Ad Group</MenuItem>
                                </Select>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>Data Value</Typography>
                                <TextField 
                                    fullWidth 
                                    placeholder="Leave empty for all" 
                                    variant="outlined" 
                                    size="small"
                                    value={newGoal.value}
                                    onChange={(e) => setNewGoal({...newGoal, value: e.target.value})}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f8fafc' } }}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>Metric *</Typography>
                                <Select
                                    fullWidth
                                    size="small"
                                    value={newGoal.metric}
                                    onChange={(e) => setNewGoal({...newGoal, metric: e.target.value})}
                                    sx={{ borderRadius: '12px', bgcolor: '#f8fafc' }}
                                >
                                    <MenuItem value="Spends">💰 Spends</MenuItem>
                                    <MenuItem value="Sales">📈 Sales</MenuItem>
                                    <MenuItem value="ROAS">📊 ROAS</MenuItem>
                                    <MenuItem value="Orders">📦 Orders</MenuItem>
                                </Select>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>Target Value *</Typography>
                                <TextField 
                                    fullWidth 
                                    type="number"
                                    variant="outlined" 
                                    size="small"
                                    value={newGoal.targetValue}
                                    onChange={(e) => setNewGoal({...newGoal, targetValue: e.target.value})}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f8fafc' } }}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>Time Period *</Typography>
                                <Select
                                    fullWidth
                                    size="small"
                                    value={newGoal.period}
                                    onChange={(e) => setNewGoal({...newGoal, period: e.target.value})}
                                    sx={{ borderRadius: '12px', bgcolor: '#f8fafc' }}
                                >
                                    <MenuItem value="Daily">Daily</MenuItem>
                                    <MenuItem value="Weekly">Weekly</MenuItem>
                                    <MenuItem value="Monthly">Monthly</MenuItem>
                                    <MenuItem value="Quarterly">Quarterly</MenuItem>
                                </Select>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>Priority *</Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    {['Low', 'Medium', 'High'].map((p) => (
                                        <Box
                                            key={p}
                                            onClick={() => setNewGoal({...newGoal, priority: p})}
                                            sx={{
                                                flex: 1,
                                                py: 0.8,
                                                textAlign: 'center',
                                                borderRadius: '10px',
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                border: '1px solid',
                                                borderColor: newGoal.priority === p ? (p === 'High' ? '#f43f5e' : (p === 'Medium' ? '#f59e0b' : '#3b82f6')) : '#e2e8f0',
                                                bgcolor: newGoal.priority === p ? (p === 'High' ? '#fef2f2' : (p === 'Medium' ? '#fffbeb' : '#eff6ff')) : 'transparent',
                                                color: newGoal.priority === p ? (p === 'High' ? '#f43f5e' : (p === 'Medium' ? '#d97706' : '#3b82f6')) : '#64748b',
                                            }}
                                        >
                                            {p}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                            <Button 
                                onClick={() => setIsGoalModalOpen(false)}
                                sx={{ textTransform: 'none', color: '#64748b', fontWeight: 700 }}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="contained"
                                onClick={() => {
                                    const goalObj = {
                                        id: goals.length + 1,
                                        name: newGoal.name || "New Goal",
                                        metric: newGoal.metric,
                                        target: newGoal.targetValue > 1000 ? `₹${(newGoal.targetValue/1000).toFixed(1)}K` : newGoal.targetValue.toString(),
                                        current: "₹0",
                                        progress: 0,
                                        status: "On Track",
                                        color: "#3b82f6"
                                    };
                                    setGoals([goalObj, ...goals]);
                                    setIsGoalModalOpen(false);
                                    setNewGoal({ name: '', level: 'Account', value: '', metric: 'Spends', targetValue: 0, period: 'Monthly', priority: 'Medium' });
                                }}
                                disabled={!newGoal.name}
                                sx={{ 
                                    textTransform: 'none', 
                                    bgcolor: '#eff6ff', 
                                    color: '#3b82f6', 
                                    fontWeight: 700,
                                    borderRadius: '12px',
                                    px: 3,
                                    boxShadow: 'none',
                                    '&:hover': { bgcolor: '#dbeafe', boxShadow: 'none' },
                                    '&.Mui-disabled': { bgcolor: '#f1f5f9', color: '#94a3b8' }
                                }}
                            >
                                Create Goal
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default OverviewDashboard;
