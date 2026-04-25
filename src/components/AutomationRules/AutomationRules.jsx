import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    IconButton,
    Chip,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Select,
    FormControl,
    Tooltip,
    Avatar,
    TextField,
    InputAdornment,
    Drawer,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid
} from '@mui/material';
import {
    Plus,
    Download,
    Pause,
    Play,
    Edit2,
    Copy,
    Trash2,
    Bell,
    Clock,
    Calendar,
    Zap,
    CheckCircle2,
    PauseCircle,
    MoreHorizontal,
    Activity,
    Layers,
    ExternalLink,
    Search,
    ChevronDown,
    X,
    ScrollText,
    Check,
    Shield,
    Target,
    AlertTriangle,
    TrendingUp,
    GitBranch,
    Coins,
    TrendingDown,
    PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { FilterContext } from '../../utils/FilterContext';

const AutomationRules = () => {
    const { 
        selectedBrand: globalSelectedBrand,
        selectedCategory: globalSelectedCategory,
        platform: globalSelectedPlatform,
        timeStart,
        timeEnd
    } = React.useContext(FilterContext);
    const [selectedRules, setSelectedRules] = useState([]);
    const [rules, setRules] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
    const [editingRuleId, setEditingRuleId] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');
    const [newRuleData, setNewRuleData] = useState({
        platform: "Amazon - PrestigeAmazon",
        company: "Cadbury",
        name: "Pause High ACOS",
        notes: "Automatically pause campaigns when ACOS exceeds 40%",
        actionType: "Send Alert",
        applyTo: "all",
        metricsFrom: "7",
        runAtScheduledTimes: false
    });

    const generateRulesForBrand = (activeBrands) => {
        const allBrands = ["Audio", "Accessories", "Wearables"];
        const brandsToUse = Array.isArray(activeBrands) ? activeBrands : (activeBrands === "All" ? allBrands : [activeBrands]);
        const ruleTypes = ["Pause Campaign", "Send Alert", "Change Budget", "Enable Campaign"];
        const baseDate = timeEnd ? timeEnd.clone() : null;

        return Array.from({ length: 15 }, (_, i) => {
            const brandToUseForThisRule = brandsToUse[i % brandsToUse.length];
            const platforms = ["Blinkit", "Zepto", "Instamart"];
            const platform = platforms[i % 3];
            
            return {
                id: `${brandToUseForThisRule}-${i + 1}`,
                brand: brandToUseForThisRule,
                name: `boat_${brandToUseForThisRule}_${ruleTypes[i % 4].split(' ')[0]}_${i + 1}`,
                status: i % 5 === 0 ? "paused" : "active",
                type: ruleTypes[i % 4],
                platform: platform,
                entity: `${brandToUseForThisRule.split(' ')[0]}_Campaign_${100 + i}`,
                triggers: Math.floor(Math.random() * 50),
                lastRun: baseDate ? baseDate.clone().subtract(i % 3, 'days').subtract(i, 'hours').format("DD/MM/YYYY, HH:mm:ss") : `${20 + (i % 5)}/04/2026`,
                nextRun: i % 2 === 0 ? (baseDate ? baseDate.clone().add(1, 'days').format("DD/MM/YYYY, HH:mm:ss") : "26/04/2026") : null,
                schedule: i % 3 === 0 ? "daily" : "hourly",
                created: baseDate ? baseDate.clone().subtract(30, 'days').format("DD/MM/YYYY") : "01/04/2026",
                runsAt: i % 2 === 0 ? `Runs at ${0 + i}:00` : "Paused"
            };
        });
    };

    // Map category → brands so category filter also works
    const BRAND_CATEGORY_MAP = {
        "Audio": ["TWS", "Headphone", "Wired Earphone", "Speaker", "Soundbar", "Neckband"],
        "Accessories": ["Accessories"],
        "Wearables": ["Wearables"]
    };

    const resolveBrandsFromFilters = (brand, category) => {
        const allBrands = ["Audio", "Accessories", "Wearables"];
        let brandsFromCategory = null;
        const catVal = category;
        if (catVal && catVal !== "All" && !(Array.isArray(catVal) && (catVal.length === 0 || catVal.includes("All")))) {
            const cats = Array.isArray(catVal) ? catVal : [catVal];
            const allowed = new Set();
            cats.forEach(c => {
                Object.entries(BRAND_CATEGORY_MAP).forEach(([b, catList]) => {
                    if (catList.includes(c)) allowed.add(b);
                });
            });
            brandsFromCategory = allBrands.filter(b => allowed.has(b));
        }

        const isAllBrand = !brand || brand === "All" || (Array.isArray(brand) && (brand.includes("All") || brand.length === 0));
        let resolvedBrands = isAllBrand ? allBrands : (Array.isArray(brand) ? brand : [brand]);

        if (brandsFromCategory) {
            resolvedBrands = resolvedBrands.filter(b => brandsFromCategory.includes(b));
        }
        return resolvedBrands.length > 0 ? resolvedBrands : allBrands;
    };

    useEffect(() => {
        const activeBrands = resolveBrandsFromFilters(globalSelectedBrand, globalSelectedCategory);
        setRules(generateRulesForBrand(activeBrands));
        setSelectedRules([]);
    }, [globalSelectedBrand, globalSelectedCategory, timeStart, timeEnd]);

    const templateList = [
        { title: "Pause High ACOS", desc: "Automatically pause campaigns when ACOS exceeds 40%", icon: <Pause size={18} />, color: "#f43f5e", bg: "#fff1f2", border: "#ffe4e6" },
        { title: "Budget Boost Winners", desc: "Increase budget by 20% daily for high ROAS campaigns", icon: <TrendingUp size={18} />, color: "#10b981", bg: "#ecfdf5", border: "#d1fae5" },
        { title: "Scale Back Poor CTR", desc: "Decrease bid by 10% for low CTR campaigns", icon: <TrendingDown size={18} />, color: "#f59e0b", bg: "#fffbeb", border: "#fef3c7" },
        { title: "Business Hours Only", desc: "Run ads only during business hours (9 AM - 6 PM, weekdays)", icon: <Clock size={18} />, color: "#3b82f6", bg: "#eff6ff", border: "#dbeafe" },
        { title: "Weekend Budget Cut", desc: "Reduce budget by 30% on weekends", icon: <Calendar size={18} />, color: "#8b5cf6", bg: "#f5f3ff", border: "#ede9fe" },
        { title: "Protect Against Overspend", desc: "Pause campaigns that exceed daily spend threshold with poor performance", icon: <AlertTriangle size={18} />, color: "#eab308", bg: "#fefce8", border: "#fef3c7" },
        { title: "Peak Hour Budget Boost", desc: "Increase budget during peak shopping hours (6 PM - 10 PM)", icon: <Zap size={18} />, color: "#f59e0b", bg: "#fffbeb", border: "#fef3c7" },
        { title: "Maintain Target ACOS", desc: "Adjust bids to maintain ACOS between 25-35%", icon: <Target size={18} />, color: "#06b6d4", bg: "#ecfeff", border: "#cffafe" }
    ];

    const stats = [
        { label: "Total Rules", value: rules.length, icon: <Layers className="w-6 h-6 text-orange-500" />, bgColor: "bg-orange-50" },
        { label: "Active", value: rules.filter(r => r.status === 'active').length, icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />, bgColor: "bg-emerald-50" },
        { label: "Paused", value: rules.filter(r => r.status === 'paused').length, icon: <PauseCircle className="w-6 h-6 text-blue-500" />, bgColor: "bg-blue-50" },
        { label: "Total Triggers", value: rules.reduce((acc, curr) => acc + curr.triggers, 0), icon: <Zap className="w-6 h-6 text-amber-500" />, bgColor: "bg-amber-50" }
    ];

    const toggleRuleSelection = (id) => {
        setSelectedRules(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRules(rules.map(r => r.id));
        } else {
            setSelectedRules([]);
        }
    };

    const handleEditRule = (rule) => {
        setEditingRuleId(rule.id);
        setNewRuleData({
            platform: `${rule.platform} - ${rule.entity}`,
            company: globalSelectedBrand,
            name: rule.name,
            notes: "",
            actionType: rule.type,
            applyTo: "all",
            metricsFrom: "7",
            runAtScheduledTimes: rule.schedule !== 'daily'
        });
        setIsCreateDrawerOpen(true);
    };

    const toggleRuleStatus = (ruleId) => {
        setRules(prev => prev.map(rule => {
            if (rule.id === ruleId) {
                return { ...rule, status: rule.status === 'active' ? 'paused' : 'active' };
            }
            return rule;
        }));
    };

    const handleCloneRule = (rule) => {
        const cloned = {
            ...rule,
            id: Date.now(),
            name: `${rule.name} (Copy)`,
            triggers: 0,
            created: new Date().toLocaleDateString()
        };
        setRules([cloned, ...rules]);
    };

    const deleteRule = (id) => {
        setRules(prev => prev.filter(rule => rule.id !== id));
        setSelectedRules(prev => prev.filter(item => item !== id));
    };

    const handleSaveRule = () => {
        if (editingRuleId) {
            setRules(prev => prev.map(r => r.id === editingRuleId ? {
                ...r,
                name: newRuleData.name,
                type: newRuleData.actionType,
                platform: newRuleData.platform.split(' - ')[0],
                entity: newRuleData.platform.split(' - ')[1] || newRuleData.platform,
                schedule: newRuleData.runAtScheduledTimes ? "Scheduled" : "daily",
                runsAt: newRuleData.runAtScheduledTimes ? "Runs at scheduled times" : "Runs according to schedule"
            } : r));
            setEditingRuleId(null);
        } else {
            const newRule = {
                id: Date.now(),
                name: newRuleData.name || "Untitled Rule",
                status: "active",
                type: newRuleData.actionType,
                platform: newRuleData.platform.split(' - ')[0],
                entity: newRuleData.platform.split(' - ')[1] || newRuleData.platform,
                triggers: 0,
                lastRun: "Just now",
                nextRun: newRuleData.runAtScheduledTimes ? "Scheduled" : "Calculating...",
                schedule: newRuleData.runAtScheduledTimes ? "Scheduled" : "daily",
                created: new Date().toLocaleDateString(),
                runsAt: newRuleData.runAtScheduledTimes ? "Runs at scheduled times" : "Runs according to schedule"
            };
            setRules([newRule, ...rules]);
        }
        
        setIsCreateDrawerOpen(false);
        // Reset form
        setNewRuleData({
            platform: "Amazon - PrestigeAmazon",
            company: "Prestige",
            name: "New Automation Rule",
            notes: "",
            actionType: "Send Alert",
            applyTo: "all",
            metricsFrom: "7",
            runAtScheduledTimes: false
        });
    };

    const applyTemplate = (template) => {
        setNewRuleData({
            ...newRuleData,
            name: template.title,
            notes: template.desc,
            actionType: template.title.includes('Pause') ? 'Pause Campaign' : 
                        template.title.includes('Budget') ? 'Change Budget' : 
                        template.title.includes('Bid') ? 'Change Budget' : 'Send Alert'
        });
    };

    const handleExportRules = () => {
        const headers = ["Rule Name", "Status", "Type", "Platform", "Entity", "Triggers", "Last Run", "Schedule", "Created"];
        const csvContent = [
            headers.join(","),
            ...filteredRules.map(r => [
                `"${r.name}"`,
                r.status,
                r.type,
                r.platform,
                `"${r.entity}"`,
                r.triggers,
                r.lastRun,
                r.schedule,
                r.created
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${globalSelectedBrand}_Automation_Rules.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredRules = rules.filter(rule => {
        const matchesSearch = rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            rule.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            rule.entity.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesPlatform = globalSelectedPlatform === 'All' || 
                              (Array.isArray(globalSelectedPlatform) 
                                ? (globalSelectedPlatform.includes('All') || globalSelectedPlatform.some(p => p.toLowerCase() === rule.platform.toLowerCase()))
                                : (globalSelectedPlatform && rule.platform && rule.platform.toLowerCase() === globalSelectedPlatform.toLowerCase()));
        const matchesStatus = statusFilter === 'All' || 
                            (statusFilter === 'Active' && rule.status === 'active') ||
                            (statusFilter === 'Paused' && rule.status === 'paused');
        const matchesBrand = globalSelectedBrand === 'All' || 
                           (Array.isArray(globalSelectedBrand) 
                             ? (globalSelectedBrand.includes('All') || globalSelectedBrand.some(b => b.toLowerCase() === rule.brand.toLowerCase()))
                             : (globalSelectedBrand && rule.brand && rule.brand.toLowerCase() === globalSelectedBrand.toLowerCase()));

        return matchesSearch && matchesStatus && matchesPlatform && matchesBrand;
    });

    return (
        <Box sx={{
            p: 4,
            borderRadius: 5,
            bgcolor: '#f8fafc',
            minHeight: '100vh',
            fontFamily: "'Inter', 'Roboto', sans-serif",
            '& .MuiTypography-root': { fontFamily: "'Inter', 'Roboto', sans-serif" },
            '& .MuiButton-root': { fontFamily: "'Inter', 'Roboto', sans-serif" },
            '& .MuiChip-root': { fontFamily: "'Inter', 'Roboto', sans-serif" },
            '& .MuiMenuItem-root': { fontFamily: "'Inter', 'Roboto', sans-serif" },
            '& .MuiInputBase-root': { fontFamily: "'Inter', 'Roboto', sans-serif" }
        }}>
            {/* Header Area */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 6 }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Box sx={{ p: 1, bgcolor: '#8b5cf6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Activity className="w-6 h-6 text-white" />
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em' }}>
                            Smart Control - Automation Rules
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#64748b', ml: 8 }}>
                        Create and manage automation rules for intelligent campaign optimization
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        size="small"
                        placeholder="Search rules..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ 
                            bgcolor: 'white', 
                            borderRadius: '12px',
                            '& .MuiOutlinedInput-root': { borderRadius: '12px' }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={18} className="text-slate-400" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        variant="contained"
                        startIcon={<Plus size={18} />}
                        onClick={() => {
                            setEditingRuleId(null);
                            setIsCreateDrawerOpen(true);
                        }}
                        sx={{
                            bgcolor: '#8b5cf6',
                            '&:hover': { bgcolor: '#7c3aed' },
                            borderRadius: '12px',
                            px: 3,
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 700,
                            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                        }}
                    >
                        Create Rule
                    </Button>
                </Box>
            </Box>

            {/* Stats Cards */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, mb: 6 }}>
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card 
                            onClick={() => {
                                if (stat.label === 'Active') setStatusFilter('Active');
                                else if (stat.label === 'Paused') setStatusFilter('Paused');
                                else if (stat.label === 'Total Rules') setStatusFilter('All');
                            }}
                            sx={{
                                borderRadius: '24px',
                                boxShadow: statusFilter === (stat.label === 'Total Rules' ? 'All' : stat.label) 
                                    ? `0 0 0 2px ${stat.label === 'Active' ? '#10b981' : stat.label === 'Paused' ? '#3b82f6' : '#8b5cf6'}` 
                                    : '0 4px 20px rgba(0,0,0,0.03)',
                                border: '1px solid rgba(0,0,0,0.05)',
                                overflow: 'hidden',
                                cursor: stat.label === 'Total Triggers' ? 'default' : 'pointer',
                                transition: 'all 0.2s ease',
                                '&:hover': stat.label === 'Total Triggers' ? {} : { transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(0,0,0,0.06)' }
                            }}
                        >
                            <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3, gap: 3 }}>
                                <Box className={`${stat.bgColor} p-4 rounded-2xl`}>
                                    {stat.icon}
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </Box>

            {/* Table Header Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, px: 1 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filteredRules.length > 0 && selectedRules.length === filteredRules.length}
                            onChange={() => {
                                if (selectedRules.length === filteredRules.length) {
                                    setSelectedRules([]);
                                } else {
                                    setSelectedRules(filteredRules.map(r => r.id));
                                }
                            }}
                            sx={{ color: '#cbd5e1' }}
                        />
                    }
                    label={<Typography sx={{ fontWeight: 600, color: '#64748b' }}>Select all</Typography>}
                />
                <Button
                    variant="outlined"
                    startIcon={<Download size={18} />}
                    onClick={handleExportRules}
                    sx={{
                        borderRadius: '12px',
                        borderColor: '#e2e8f0',
                        color: '#64748b',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': { bgcolor: '#f1f5f9', borderColor: '#cbd5e1' }
                    }}
                >
                    Export
                </Button>
            </Box>

            {/* Rules List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <AnimatePresence mode="popLayout">
                    {filteredRules.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ textAlign: 'center', padding: '60px 20px' }}
                        >
                            <Box sx={{ 
                                width: 80, 
                                height: 80, 
                                bgcolor: '#f1f5f9', 
                                borderRadius: '50%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                margin: '0 auto 20px'
                            }}>
                                <Search size={32} className="text-slate-300" />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
                                No rules found for "{searchQuery}"
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                                Try adjusting your search term or select a different company.
                            </Typography>
                            <Button 
                                onClick={() => setSearchQuery('')}
                                sx={{ mt: 3, textTransform: 'none', fontWeight: 700, color: '#8b5cf6' }}
                            >
                                Clear search
                            </Button>
                        </motion.div>
                    ) : filteredRules.map((rule, idx) => (
                        <motion.div
                            key={rule.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card sx={{
                                borderRadius: '24px',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                                border: '1px solid rgba(0,0,0,0.05)',
                                '&:hover': { boxShadow: '0 12px 32px rgba(0,0,0,0.08)' },
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'visible'
                            }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                                        <Checkbox
                                            checked={selectedRules.includes(rule.id)}
                                            onChange={() => toggleRuleSelection(rule.id)}
                                            sx={{ mt: -0.5, color: '#cbd5e1' }}
                                        />

                                        <Box sx={{ flex: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>
                                                    {rule.name}
                                                </Typography>
                                                <Chip
                                                    label={rule.status}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: rule.status === 'active' ? '#ecfdf5' : '#f1f5f9',
                                                        color: rule.status === 'active' ? '#059669' : '#64748b',
                                                        fontWeight: 700,
                                                        fontSize: '10px',
                                                        textTransform: 'uppercase'
                                                    }}
                                                />
                                                <Chip
                                                    label={rule.type}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: rule.type === 'Send Alert' ? '#eff6ff' : '#eef2ff',
                                                        color: rule.type === 'Send Alert' ? '#2563eb' : '#4f46e5',
                                                        fontWeight: 700,
                                                        fontSize: '10px'
                                                    }}
                                                />
                                                <Chip
                                                    label={rule.platform}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: '#f5f3ff',
                                                        color: '#7c3aed',
                                                        fontWeight: 700,
                                                        fontSize: '10px'
                                                    }}
                                                />
                                                <Chip
                                                    label={rule.entity}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: '#f5f3ff',
                                                        color: '#7c3aed',
                                                        fontWeight: 700,
                                                        fontSize: '10px'
                                                    }}
                                                />
                                            </Box>

                                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Box sx={{ p: 0.5, bgcolor: '#fff1f2', borderRadius: '4px' }}>
                                                        <Activity size={12} className="text-rose-500" />
                                                    </Box>
                                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                                                        {rule.triggers} triggers
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Clock size={12} className="text-slate-400" />
                                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                                                        Last: {rule.lastRun}
                                                    </Typography>
                                                </Box>
                                                {rule.nextRun && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <ExternalLink size={12} className="text-blue-400" />
                                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                                                            Next: {rule.nextRun}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Calendar size={12} className="text-slate-400" />
                                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                                                        {rule.schedule}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Layers size={12} className="text-slate-400" />
                                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                                                        Created: {rule.created}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box sx={{ width: 6, height: 6, bgcolor: '#10b981', borderRadius: '50%' }} />
                                                <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700 }}>
                                                    {rule.runsAt}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* Actions */}
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Tooltip title={rule.status === 'active' ? "Pause" : "Resume"}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => toggleRuleStatus(rule.id)}
                                                    sx={{
                                                        bgcolor: rule.status === 'active' ? '#fff7ed' : '#f0fdf4',
                                                        color: rule.status === 'active' ? '#f97316' : '#22c55e',
                                                        '&:hover': { bgcolor: rule.status === 'active' ? '#ffedd5' : '#dcfce7' }
                                                    }}
                                                >
                                                    {rule.status === 'active' ? <Pause size={18} /> : <Play size={18} />}
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Edit">
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleEditRule(rule)}
                                                    sx={{ bgcolor: '#eff6ff', color: '#2563eb', '&:hover': { bgcolor: '#dbeafe' } }}
                                                >
                                                    <Edit2 size={18} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Clone">
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleCloneRule(rule)}
                                                    sx={{ bgcolor: '#f5f3ff', color: '#7c3aed', '&:hover': { bgcolor: '#ede9fe' } }}
                                                >
                                                    <Copy size={18} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => deleteRule(rule.id)}
                                                    sx={{ bgcolor: '#fff1f2', color: '#f43f5e', '&:hover': { bgcolor: '#ffe4e6' } }}
                                                >
                                                    <Trash2 size={18} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="View Logs">
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => window.location.hash = '#/history'}
                                                    sx={{ bgcolor: '#f8fafc', color: '#64748b', '&:hover': { bgcolor: '#f1f5f9' } }}
                                                >
                                                    <ScrollText size={18} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </Box>

            {/* Create Rule Drawer */}
            <Drawer
                anchor="right"
                open={isCreateDrawerOpen}
                onClose={() => setIsCreateDrawerOpen(false)}
                PaperProps={{
                    sx: { width: '650px', p: 0, bgcolor: '#f8fafc' }
                }}
            >
                {/* Drawer Header */}
                <Box sx={{ p: 3, bgcolor: 'white', borderBottom: '1px solid #f1f5f9', position: 'relative' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Box sx={{ p: 1, bgcolor: '#f5f3ff', borderRadius: '10px' }}>
                            <Zap className="w-6 h-6 text-violet-600" />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b' }}>
                            Create Automation Rule
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#64748b', ml: 8 }}>
                        Configure triggers, actions, and safety limits for intelligent campaign optimization
                    </Typography>
                    <IconButton 
                        onClick={() => setIsCreateDrawerOpen(false)}
                        sx={{ position: 'absolute', top: 20, right: 20, color: '#94a3b8' }}
                    >
                        <X size={24} />
                    </IconButton>
                </Box>

                <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Top Selectors */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>Company</Typography>
                            <FormControl fullWidth size="small">
                                <Select
                                    value={newRuleData.company}
                                    onChange={(e) => setNewRuleData({...newRuleData, company: e.target.value})}
                                    sx={{ 
                                        borderRadius: '12px', 
                                        bgcolor: 'white',
                                        '& .MuiSelect-select': { display: 'flex', alignItems: 'center', gap: 2 }
                                    }}
                                    renderValue={(value) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{ p: 0.5, bgcolor: '#f1f5f9', borderRadius: '4px', display: 'flex' }}>
                                                <Layers size={16} className="text-slate-400" />
                                            </Box>
                                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>{value}</Typography>
                                        </Box>
                                    )}
                                >
                                    {["Cadbury", "Ferrero", "Haldiram's", "Nestle"].map(brand => (
                                        <MenuItem key={brand} value={brand}>
                                            <Typography variant="body2">{brand}</Typography>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>Platform Account *</Typography>
                            <FormControl fullWidth size="small">
                                <Select
                                    value={newRuleData.platform}
                                    onChange={(e) => setNewRuleData({...newRuleData, platform: e.target.value})}
                                    sx={{ 
                                        borderRadius: '12px', 
                                        bgcolor: 'white',
                                        '& .MuiSelect-select': { display: 'flex', alignItems: 'center', gap: 2 }
                                    }}
                                    renderValue={(value) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{ p: 0.5, bgcolor: '#f1f5f9', borderRadius: '4px', display: 'flex' }}>
                                                <Layers size={16} className="text-slate-400" />
                                            </Box>
                                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>{value}</Typography>
                                        </Box>
                                    )}
                                >
                                    <MenuItem disabled value="">
                                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>Select platform...</Typography>
                                    </MenuItem>
                                    <MenuItem value="Amazon - PrestigeAmazon">
                                        <Typography variant="body2">Amazon - PrestigeAmazon</Typography>
                                    </MenuItem>
                                    <MenuItem value="BLINKIT - Prestige Blinkit">
                                        <Typography variant="body2">BLINKIT - Prestige Blinkit</Typography>
                                    </MenuItem>
                                    <MenuItem value="Instamart - prestige instamart">
                                        <Typography variant="body2">Instamart - prestige instamart</Typography>
                                    </MenuItem>
                                    <MenuItem value="Zepto - prestige zepto">
                                        <Typography variant="body2">Zepto - prestige zepto</Typography>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    {/* Accordion Sections */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {/* Templates */}
                        <Accordion sx={{ borderRadius: '16px !important', boxShadow: 'none', border: '1px solid #e2e8f0', '&:before': { display: 'none' } }}>
                            <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ p: 1, bgcolor: '#f5f3ff', borderRadius: '8px' }}>
                                        <Zap size={20} className="text-violet-600" />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography sx={{ fontWeight: 700, color: '#1e293b' }}>Quick Start Templates</Typography>
                                        <Chip label="Popular" size="small" sx={{ height: '20px', fontSize: '10px', fontWeight: 700, bgcolor: '#f5f3ff', color: '#7c3aed' }} />
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                    {templateList.map((template, idx) => (
                                        <Box 
                                            key={idx}
                                            component={motion.div}
                                            whileHover={{ scale: 1.02 }}
                                            onClick={() => applyTemplate(template)}
                                            sx={{ 
                                                p: 2, 
                                                borderRadius: '16px', 
                                                border: `1px solid ${template.border}`, 
                                                bgcolor: 'white',
                                                display: 'flex',
                                                gap: 2,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }
                                            }}
                                        >
                                            <Box sx={{ 
                                                p: 1.5, 
                                                borderRadius: '12px', 
                                                bgcolor: template.bg, 
                                                color: template.color,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: 'fit-content'
                                            }}>
                                                {template.icon}
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5, fontSize: '13px' }}>
                                                    {template.title}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: '#64748b', lineHeight: 1.4, display: 'block', fontSize: '11px' }}>
                                                    {template.desc}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                                <Box sx={{ mt: 3, textAlign: 'center' }}>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, cursor: 'pointer', '&:hover': { color: '#6366f1' } }}>
                                        or start from scratch →
                                    </Typography>
                                </Box>
                            </AccordionDetails>
                        </Accordion>

                        {/* Basic Info */}
                        <Accordion sx={{ borderRadius: '16px !important', boxShadow: 'none', border: '1px solid #e2e8f0', '&:before': { display: 'none' } }}>
                            <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ p: 1, bgcolor: '#f5f3ff', borderRadius: '8px' }}>
                                        <Edit2 size={20} className="text-violet-600" />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, color: '#1e293b' }}>Basic Info</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>{newRuleData.name || "Rule name and notes"}</Typography>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <TextField 
                                        fullWidth 
                                        size="small" 
                                        placeholder="Rule name" 
                                        value={newRuleData.name}
                                        onChange={(e) => setNewRuleData({...newRuleData, name: e.target.value})}
                                        sx={{ 
                                            '& .MuiOutlinedInput-root': { borderRadius: '10px' },
                                            bgcolor: 'white'
                                        }} 
                                    />
                                    <TextField 
                                        fullWidth 
                                        multiline 
                                        rows={3} 
                                        placeholder="Add notes for this rule..." 
                                        value={newRuleData.notes}
                                        onChange={(e) => setNewRuleData({...newRuleData, notes: e.target.value})}
                                        sx={{ 
                                            '& .MuiOutlinedInput-root': { borderRadius: '10px' },
                                            bgcolor: 'white'
                                        }} 
                                    />
                                </Box>
                            </AccordionDetails>
                        </Accordion>

                        {/* Apply To */}
                        <Accordion defaultExpanded sx={{ borderRadius: '16px !important', boxShadow: 'none', border: '1px solid #e2e8f0', '&:before': { display: 'none' } }}>
                            <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ p: 1, bgcolor: '#eff6ff', borderRadius: '8px' }}>
                                        <Target size={20} className="text-blue-600" />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, color: '#1e293b' }}>Apply To</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>All campaigns</Typography>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    <Box sx={{ display: 'flex', p: 0.5, bgcolor: '#f1f5f9', borderRadius: '12px', gap: 1 }}>
                                        <Button 
                                            fullWidth 
                                            onClick={() => setNewRuleData({...newRuleData, applyTo: 'all'})}
                                            sx={{ 
                                                borderRadius: '10px', 
                                                textTransform: 'none', 
                                                bgcolor: newRuleData.applyTo === 'all' ? '#3b82f6' : 'transparent', 
                                                color: newRuleData.applyTo === 'all' ? 'white' : '#64748b', 
                                                '&:hover': { bgcolor: newRuleData.applyTo === 'all' ? '#2563eb' : '#e2e8f0' } 
                                            }}
                                        >
                                            All matching
                                        </Button>
                                        <Button 
                                            fullWidth 
                                            onClick={() => setNewRuleData({...newRuleData, applyTo: 'selected'})}
                                            sx={{ 
                                                borderRadius: '10px', 
                                                textTransform: 'none', 
                                                bgcolor: newRuleData.applyTo === 'selected' ? '#3b82f6' : 'transparent', 
                                                color: newRuleData.applyTo === 'selected' ? 'white' : '#64748b', 
                                                '&:hover': { bgcolor: newRuleData.applyTo === 'selected' ? '#2563eb' : '#e2e8f0' } 
                                            }}
                                        >
                                            Selected only
                                        </Button>
                                    </Box>
                                    <FormControl fullWidth size="small">
                                        <Select 
                                            value={newRuleData.applyTo === 'all' ? 'all' : 'select'} 
                                            sx={{ borderRadius: '10px', bgcolor: 'white' }}
                                            disabled={newRuleData.applyTo === 'all'}
                                        >
                                            <MenuItem value="all">All Campaigns</MenuItem>
                                            <MenuItem value="select">Search Campaigns...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </AccordionDetails>
                        </Accordion>

                        {/* Trigger */}
                        <Accordion sx={{ borderRadius: '16px !important', boxShadow: 'none', border: '1px solid #e2e8f0', '&:before': { display: 'none' } }}>
                            <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ p: 1, bgcolor: '#ecfdf5', borderRadius: '8px' }}>
                                        <Zap size={20} className="text-emerald-600" />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, color: '#1e293b' }}>When to Trigger</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>{newRuleData.triggerMode === 'condition' ? 'When conditions are met' : 'No conditions'}</Typography>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails sx={{ pt: 0 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                    <FormControlLabel
                                        control={<Checkbox checked size="small" />}
                                        label={<Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>When conditions are met</Typography>}
                                    />

                                    <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b' }}>📊 Evaluate metrics from</Typography>
                                        <Select 
                                            size="small" 
                                            value={newRuleData.metricsFrom} 
                                            onChange={(e) => setNewRuleData({...newRuleData, metricsFrom: e.target.value})}
                                            sx={{ borderRadius: '8px', bgcolor: 'white', minWidth: 150 }}
                                        >
                                            <MenuItem value="7">Last 7 Days</MenuItem>
                                            <MenuItem value="14">Last 14 Days</MenuItem>
                                            <MenuItem value="30">Last 30 Days</MenuItem>
                                        </Select>
                                    </Box>

                                    <Box sx={{ p: 2.5, border: '1px solid #e2e8f0', borderRadius: '16px' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                            <GitBranch size={16} className="text-violet-500" />
                                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>Group 1</Typography>
                                        </Box>
                                        <Button startIcon={<Plus size={16} />} sx={{ textTransform: 'none', color: '#8b5cf6', fontWeight: 700, fontSize: '13px' }}>
                                            Add Condition
                                        </Button>
                                    </Box>

                                    <Box sx={{ 
                                        p: 2, 
                                        border: '1px dashed #cbd5e1', 
                                        borderRadius: '16px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        gap: 1,
                                        cursor: 'pointer',
                                        '&:hover': { bgcolor: '#f1f5f9' }
                                    }}>
                                        <Plus size={18} className="text-slate-400" />
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b' }}>Add Condition Group</Typography>
                                    </Box>

                                    <Box sx={{ p: 1.5, bgcolor: '#f5f3ff', borderRadius: '10px' }}>
                                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#7c3aed' }}>
                                            Logic Preview: <Box component="span" sx={{ color: '#94a3b8' }}>()</Box>
                                        </Typography>
                                    </Box>

                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                size="small" 
                                                checked={newRuleData.runAtScheduledTimes}
                                                onChange={(e) => setNewRuleData({...newRuleData, runAtScheduledTimes: e.target.checked})}
                                            />
                                        }
                                        label={<Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>Run at scheduled times</Typography>}
                                    />
                                </Box>
                            </AccordionDetails>
                        </Accordion>

                        {/* Action */}
                        <Accordion sx={{ borderRadius: '16px !important', boxShadow: 'none', border: '1px solid #e2e8f0', '&:before': { display: 'none' } }}>
                            <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ p: 1, bgcolor: '#fff7ed', borderRadius: '8px' }}>
                                        <Zap size={20} className="text-orange-600" />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, color: '#1e293b' }}>Then Do This</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>Send Alert Only</Typography>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 2 }}>
                                    {[
                                        { title: 'Pause Campaign', icon: <PauseCircle size={20} />, color: '#3b82f6' },
                                        { title: 'Enable Campaign', icon: <PlayCircle size={20} />, color: '#3b82f6' },
                                        { title: 'Change Budget', icon: <Coins size={20} />, color: '#eab308' }
                                    ].map((action, idx) => (
                                        <Box 
                                            key={idx} 
                                            onClick={() => setNewRuleData({...newRuleData, actionType: action.title})}
                                            sx={{ 
                                                p: 2, 
                                                borderRadius: '12px', 
                                                bgcolor: newRuleData.actionType === action.title ? '#eff6ff' : '#f1f5f9', 
                                                border: newRuleData.actionType === action.title ? '2px solid #3b82f6' : '2px solid transparent',
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                gap: 1.5,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                '&:hover': { bgcolor: '#e2e8f0' }
                                            }}
                                        >
                                            <Box sx={{ color: action.color }}>{action.icon}</Box>
                                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>{action.title}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                                <Box 
                                    onClick={() => setNewRuleData({...newRuleData, actionType: "Send Alert"})}
                                    sx={{ 
                                        p: 2, 
                                        borderRadius: '12px', 
                                        bgcolor: newRuleData.actionType === 'Send Alert' ? '#f97316' : '#f1f5f9', 
                                        border: newRuleData.actionType === 'Send Alert' ? '2px solid #ea580c' : '2px solid transparent',
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        gap: 1.5,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <Box sx={{ color: newRuleData.actionType === 'Send Alert' ? 'white' : '#f97316' }}><Bell size={20} /></Box>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: newRuleData.actionType === 'Send Alert' ? 'white' : '#1e293b' }}>Send Alert Only</Typography>
                                </Box>
                            </AccordionDetails>
                        </Accordion>

                        {/* Safety Limits */}
                        <Accordion sx={{ borderRadius: '16px !important', boxShadow: 'none', border: '1px solid #e2e8f0', '&:before': { display: 'none' } }}>
                            <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ p: 1, bgcolor: '#fef3c7', borderRadius: '8px' }}>
                                        <Shield size={20} className="text-amber-600" />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, color: '#1e293b' }}>Safety Limits</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>No limits set</Typography>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails sx={{ pt: 0 }}>
                                <FormControlLabel
                                    control={<Checkbox size="small" />}
                                    label={<Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>Enable safety limits</Typography>}
                                />
                            </AccordionDetails>
                        </Accordion>

                        {/* Rule Summary */}
                        <Box sx={{ 
                            mt: 1,
                            p: 2.5, 
                            bgcolor: '#f5f7ff', 
                            borderRadius: '16px', 
                            border: '1px solid #e0e7ff',
                            display: 'flex',
                            gap: 2,
                            alignItems: 'flex-start'
                        }}>
                            <Box sx={{ mt: 0.5 }}>
                                <Check size={18} className="text-violet-500" />
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#312e81', mb: 0.5 }}>
                                    Rule Summary
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#6366f1', fontWeight: 500 }}>
                                    {newRuleData.applyTo === 'all' ? 'For all campaigns' : 'For selected campaigns'}, {newRuleData.actionType.toLowerCase()}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Footer */}
                <Box sx={{ mt: 'auto', p: 3, bgcolor: 'white', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button 
                        onClick={() => setIsCreateDrawerOpen(false)}
                        sx={{ 
                            textTransform: 'none', 
                            color: '#1e293b', 
                            fontWeight: 700,
                            bgcolor: '#f1f5f9',
                            px: 3,
                            borderRadius: '10px',
                            '&:hover': { bgcolor: '#e2e8f0' }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="contained"
                        onClick={handleSaveRule}
                        sx={{ 
                            textTransform: 'none', 
                            bgcolor: '#c0a0f9', 
                            borderRadius: '10px',
                            px: 4,
                            fontWeight: 700,
                            boxShadow: 'none',
                            '&:hover': { bgcolor: '#b080f7', boxShadow: 'none' }
                        }}
                    >
                        Create Rule
                    </Button>
                </Box>
            </Drawer>
        </Box>
    );
};

export default AutomationRules;
