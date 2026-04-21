import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    IconButton,
    Tabs,
    Tab
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
    Target
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

const OverviewDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const topCards = [
        { title: "Total Spend", value: "₹3.73L", icon: <DollarSign className="w-5 h-5 text-white" />, iconBg: "bg-[#10b981]" },
        { title: "Impressions", value: "10.42L", icon: <Eye className="w-5 h-5 text-white" />, iconBg: "bg-[#8b5cf6]" },
        { title: "ATC", value: "19.6K", icon: <ShoppingCart className="w-5 h-5 text-white" />, iconBg: "bg-[#f97316]" },
        { title: "Orders", value: "8.6K", icon: <ShoppingBag className="w-5 h-5 text-white" />, iconBg: "bg-[#3b82f6]" },
        { title: "Total Sales", value: "₹1.02Cr", icon: <TrendingUp className="w-5 h-5 text-white" />, iconBg: "bg-[#10b981]" },
        { title: "ROAS", value: "27.37x", icon: <BarChart2 className="w-5 h-5 text-white" />, iconBg: "bg-[#6366f1]" }
    ];

    const adTypeMetrics = [
        {
            title: "ROAS",
            value: "28.15x",
            status: "Strong returns",
            statusIcon: <Flame className="w-3.5 h-3.5 text-orange-500" />,
            bgColor: "bg-[#ecfdf5]",
            borderColor: "border-[#10b981]/20",
            titleIcon: <TrendingUp className="w-3.5 h-3.5 text-[#10b981] mr-1" />
        },
        {
            title: "ACoS",
            value: "3.55%",
            status: "Efficient",
            statusIcon: <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />,
            bgColor: "bg-[#f8fafc]",
            borderColor: "border-slate-100",
            titleIcon: <Target className="w-3.5 h-3.5 text-rose-400 mr-1" />
        },
        {
            title: "CTR",
            value: "1.49%",
            status: "Click-through rate",
            statusIcon: null,
            bgColor: "bg-[#f8fafc]",
            borderColor: "border-slate-100",
            titleIcon: <MousePointerClick className="w-3.5 h-3.5 text-blue-400 mr-1" />
        },
        {
            title: "CVR",
            value: "47.34%",
            status: "Conversion rate",
            statusIcon: null,
            bgColor: "bg-[#f8fafc]",
            borderColor: "border-slate-100",
            titleIcon: <Zap className="w-3.5 h-3.5 text-indigo-400 mr-1" />
        },
        {
            title: "CPC",
            value: "₹25",
            status: "Cost per click",
            statusIcon: null,
            bgColor: "bg-[#f8fafc]",
            borderColor: "border-slate-100",
            titleIcon: <BarChart2 className="w-3.5 h-3.5 text-sky-400 mr-1" />
        },
        {
            title: "Add to Cart",
            value: "16.8K",
            status: "Cart additions",
            statusIcon: null,
            bgColor: "bg-[#f8fafc]",
            borderColor: "border-slate-100",
            titleIcon: <ShoppingCart className="w-3.5 h-3.5 text-orange-400 mr-1" />
        }
    ];

    const spendSalesData = [
        { date: '14 Apr', spend: 2100, sales: 50 },
        { date: '15 Apr', spend: 1700, sales: 50 },
        { date: '16 Apr', spend: 1450, sales: 50 },
        { date: '17 Apr', spend: 1350, sales: 50 },
        { date: '18 Apr', spend: 1600, sales: 50 },
        { date: '19 Apr', spend: 1950, sales: 50 }
    ];

    const impressionsData = [
        { date: '14 Apr', value: 190 },
        { date: '15 Apr', value: 165 },
        { date: '16 Apr', value: 160 },
        { date: '17 Apr', value: 165 },
        { date: '18 Apr', value: 175 },
        { date: '19 Apr', value: 185 }
    ];

    return (
        <Box sx={{ 
            p: 3, 
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
                        Updated 15:47:41
                    </Typography>
                    <IconButton size="small" sx={{ color: '#94a3b8' }}>
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
                                    {activeTab === 0 && <Box sx={{ width: 6, height: 6, bgcolor: '#10b981', borderRadius: '50%' }} />}
                                </Box>
                            } />
                            <Tab label="Product Rec" />
                            <Tab label="Brand Booster" />
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
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
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
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
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
        </Box>
    );
};

export default OverviewDashboard;
