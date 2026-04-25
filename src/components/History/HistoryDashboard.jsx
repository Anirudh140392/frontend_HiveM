import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    Chip,
    IconButton,
    Divider,
    FormControl,
    Select,
    MenuItem,
    Dialog,
    DialogContent,
    Button
} from '@mui/material';
import {
    Search,
    Filter,
    CheckSquare,
    Hourglass,
    X,
    FastForward,
    Pause,
    Flame,
    TrendingUp,
    Key,
    Target,
    ClipboardList,
    Bell,
    Eye,
    ScrollText,
    ArrowRight,
    Layers,
    Activity,
    ChevronDown,
    Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const HistoryDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('Boat');
    const [selectedPlatform, setSelectedPlatform] = useState('All platforms');
    const [selectedSource, setSelectedSource] = useState('All activity sources');
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [debugItem, setDebugItem] = useState(null);

    const brands = [
        "All", "Boat", "Bowlers", "Bunge", "Continental Coffee", "Cremica", 
        "Godrej Consumer Products Ltd", "Mamaearth", "Pidilite", 
        "Prestige", "Protinex (Danone)", "Samsonite", 
        "Smoke Boat Blinkit 202604240116", "Sony", "Sugar Cosmetics", "Zydus"
    ];
    const generateHistoryForBrand = (brand) => {
        const platformMap = { "Boat": "Amazon", "Sony": "Amazon", "Mamaearth": "Instamart", "Prestige": "Amazon", "Zydus": "Blinkit" };
        const mainPlatform = platformMap[brand] || "Amazon";
        
        const types = ["STATUS", "BUDGET", "BID", "ALERT", "KEYWORD", "TARGETING"];
        const statuses = ["success", "pending", "failed", "skipped"];
        const icons = {
            STATUS: <Pause className="w-5 h-5 text-blue-500" fill="currentColor" />,
            BUDGET: <Flame className="w-5 h-5 text-orange-500" fill="currentColor" />,
            BID: <TrendingUp className="w-5 h-5 text-indigo-500" />,
            ALERT: <Bell className="w-5 h-5 text-yellow-500" fill="currentColor" />,
            KEYWORD: <Key className="w-5 h-5 text-amber-500" />,
            TARGETING: <Target className="w-5 h-5 text-rose-500" />
        };
        const bgs = {
            STATUS: "bg-blue-50",
            BUDGET: "bg-orange-50",
            BID: "bg-indigo-50",
            ALERT: "bg-yellow-50",
            KEYWORD: "bg-amber-50",
            TARGETING: "bg-rose-50"
        };

        return Array.from({ length: 15 }, (_, i) => {
            const type = types[i % types.length];
            return {
                id: `${brand}-hist-${i + 1}`,
                type: type,
                status: statuses[i % statuses.length],
                source: i % 3 === 0 ? "Manual" : "Rule",
                platform: mainPlatform,
                title: `${brand} ${type.toLowerCase()} check`,
                subtitle: `Process ${1000 + i}`,
                timeAgo: `${i + 1}h ago`,
                icon: icons[type],
                iconBg: bgs[type],
                actionLeft: "Value A",
                actionRight: "Value B",
                actionRightColor: "text-emerald-600"
            };
        });
    };

    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        setHistoryData(generateHistoryForBrand(selectedBrand));
    }, [selectedBrand]);

    const stats = [
        { label: "Total", value: historyData.length, icon: <ClipboardList className="w-6 h-6 text-amber-600" />, active: true },
        { label: "Success", value: historyData.filter(d => d.status === 'success').length, icon: <CheckSquare className="w-6 h-6 text-emerald-500" />, active: false },
        { label: "Pending", value: historyData.filter(d => d.status === 'pending').length, icon: <Hourglass className="w-6 h-6 text-amber-500" />, active: false },
        { label: "Failed", value: historyData.filter(d => d.status === 'failed').length, icon: <X className="w-6 h-6 text-rose-500" />, active: false },
        { label: "Skipped", value: historyData.filter(d => d.status === 'skipped').length, icon: <FastForward className="w-6 h-6 text-blue-500" />, active: false }
    ];

    const handleDownloadJSON = (item) => {
        const debugData = {
            id: item.id,
            type: item.type,
            status: item.status,
            platform: item.platform,
            request: {
                url: `https://brands.blinkit.com/adservice/v3/campaigns`,
                method: "PUT",
                campaign_id: item.id,
                ad_type: "PRODUCT_LISTING",
                body: { source_platform: item.platform }
            },
            response: {
                status: true,
                message: "success",
                data: { campaign_id: item.id }
            },
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(debugData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `debug_action_${item.id}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const filteredTimeline = historyData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All Statuses' || item.status.toLowerCase() === statusFilter.toLowerCase();
        const matchesType = typeFilter === 'All Types' || item.type.toLowerCase() === typeFilter.toLowerCase();
        const matchesPlatform = selectedPlatform === 'All platforms' || item.platform.toLowerCase() === selectedPlatform.toLowerCase();
        const matchesSource = selectedSource === 'All activity sources' || item.source.toLowerCase() === selectedSource.toLowerCase();
        
        return matchesSearch && matchesStatus && matchesType && matchesPlatform && matchesSource;
    });

    const FilterChip = ({ icon, label, active, onClick }) => (
        <Chip
            icon={icon}
            label={label}
            size="small"
            onClick={onClick}
            sx={{
                bgcolor: active ? '#4f46e5' : '#f1f5f9',
                color: active ? 'white' : '#64748b',
                fontWeight: 800,
                fontSize: '11px',
                border: 'none',
                height: '28px',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                '& .MuiChip-icon': {
                    color: active ? 'white' : 'inherit',
                    ml: '8px !important'
                },
                '&:hover': {
                    bgcolor: active ? '#4338ca' : '#e2e8f0'
                },
                mr: 0.5,
                mb: 1
            }}
        />
    );

    return (
        <Box sx={{
            p: 4,
            bgcolor: '#f8fafc',
            borderRadius: 5,
            minHeight: '100vh',
            fontFamily: "'Inter', 'Roboto', sans-serif",
            '& .MuiTypography-root': { fontFamily: "'Inter', 'Roboto', sans-serif" },
            '& .MuiButton-root': { fontFamily: "'Inter', 'Roboto', sans-serif" },
            '& .MuiChip-root': { fontFamily: "'Inter', 'Roboto', sans-serif" },
            '& .MuiTextField-root': { fontFamily: "'Inter', 'Roboto', sans-serif" },
            '& .MuiInputBase-root': { fontFamily: "'Inter', 'Roboto', sans-serif" }
        }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <ScrollText className="w-8 h-8 text-amber-700" fill="#fcd34d" />
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em' }}>
                    Action History
                </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
                Search, filter, debug payloads, and revert actions
            </Typography>

            {/* Filter Section */}
            <Card sx={{
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
                border: '1px solid rgba(0,0,0,0.05)',
                mb: 4
            }}>
                <CardContent sx={{ p: '24px !important' }}>
                    {/* Selectors Row */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 3 }}>
                        <FormControl fullWidth size="small">
                            <Select
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                sx={{ borderRadius: '12px', bgcolor: '#f8fafc' }}
                                startAdornment={<Box sx={{ mr: 1, display: 'flex' }}><Layers size={18} className="text-slate-400" /></Box>}
                            >
                                {brands.map(brand => <MenuItem key={brand} value={brand}>{brand}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth size="small">
                            <Select
                                value={selectedPlatform}
                                onChange={(e) => setSelectedPlatform(e.target.value)}
                                sx={{ borderRadius: '12px', bgcolor: '#f8fafc' }}
                                startAdornment={<Box sx={{ mr: 1, display: 'flex' }}><Layers size={18} className="text-slate-400" /></Box>}
                            >
                                <MenuItem value="All platforms">All platforms</MenuItem>
                                <MenuItem value="Amazon">Amazon</MenuItem>
                                <MenuItem value="Blinkit">Blinkit</MenuItem>
                                <MenuItem value="Instamart">Instamart</MenuItem>
                                <MenuItem value="Zepto">Zepto</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth size="small">
                            <Select
                                value={selectedSource}
                                onChange={(e) => setSelectedSource(e.target.value)}
                                sx={{ borderRadius: '12px', bgcolor: '#f8fafc' }}
                            >
                                <MenuItem value="All activity sources">All activity sources</MenuItem>
                                <MenuItem value="Rule">Rule</MenuItem>
                                <MenuItem value="Manual">Manual</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <TextField
                        fullWidth
                        placeholder="Search by campaign name, entity ID, action type..."
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                bgcolor: 'white',
                                '& fieldset': { borderColor: '#e2e8f0' }
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={18} className="text-slate-400" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <FilterChip label="All Statuses" icon={<ClipboardList size={14} />} active={statusFilter === 'All Statuses'} onClick={() => setStatusFilter('All Statuses')} />
                            <FilterChip icon={<CheckSquare size={14} />} label="Success" active={statusFilter === 'Success'} onClick={() => setStatusFilter('Success')} />
                            <FilterChip icon={<Hourglass size={14} />} label="Pending" active={statusFilter === 'Pending'} onClick={() => setStatusFilter('Pending')} />
                            <FilterChip icon={<X size={14} />} label="Failed" active={statusFilter === 'Failed'} onClick={() => setStatusFilter('Failed')} />
                            <FilterChip icon={<FastForward size={14} />} label="Skipped" active={statusFilter === 'Skipped'} onClick={() => setStatusFilter('Skipped')} />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#64748b', mr: 2, fontWeight: 700, fontSize: '12px' }}>
                            Action:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <FilterChip label="All Types" icon={<Activity size={14} />} active={typeFilter === 'All Types'} onClick={() => setTypeFilter('All Types')} />
                            <FilterChip icon={<Pause size={14} fill="currentColor" />} label="Status" active={typeFilter === 'Status'} onClick={() => setTypeFilter('Status')} />
                            <FilterChip icon={<Flame size={14} fill="currentColor" />} label="Budget" active={typeFilter === 'Budget'} onClick={() => setTypeFilter('Budget')} />
                            <FilterChip icon={<TrendingUp size={14} />} label="Bid" active={typeFilter === 'Bid'} onClick={() => setTypeFilter('Bid')} />
                            <FilterChip icon={<Key size={14} />} label="Keyword" active={typeFilter === 'Keyword'} onClick={() => setTypeFilter('Keyword')} />
                            <FilterChip icon={<Target size={14} />} label="Targeting" active={typeFilter === 'Targeting'} onClick={() => setTypeFilter('Targeting')} />
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* KPI Cards */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 3, mb: 4 }}>
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Card 
                            onClick={() => setStatusFilter(stat.label === 'Total' ? 'All Statuses' : stat.label)}
                            sx={{
                                borderRadius: '16px',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
                                border: (statusFilter === stat.label || (stat.label === 'Total' && statusFilter === 'All Statuses')) 
                                    ? '2px solid #3b82f6' 
                                    : '1px solid rgba(0,0,0,0.05)',
                                height: '100%',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                                    borderColor: '#3b82f6'
                                },
                                bgcolor: (statusFilter === stat.label || (stat.label === 'Total' && statusFilter === 'All Statuses'))
                                    ? '#eff6ff'
                                    : 'white'
                            }}
                        >
                            <CardContent sx={{ p: '20px !important', display: 'flex', alignItems: 'center', gap: 2 }}>
                                {stat.icon}
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b', lineHeight: 1.2 }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </Box>

            {/* Timeline List */}
            <Card sx={{
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.05)'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, borderBottom: '1px solid #f1f5f9' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                        Action Timeline
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                        Showing {filteredTimeline.length} actions
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <AnimatePresence mode="popLayout">
                        {filteredTimeline.map((item, idx) => (
                            <Box
                                component={motion.div}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 3,
                                    borderBottom: idx !== filteredTimeline.length - 1 ? '1px solid #f8fafc' : 'none',
                                    '&:hover': { bgcolor: '#f8fafc' },
                                    transition: 'background-color 0.2s'
                                }}
                            >
                            <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 3
                            }} className={item.iconBg}>
                                {item.icon}
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                    <Chip label={item.type} size="small" sx={{ bgcolor: '#f1f5f9', color: '#64748b', fontWeight: 700, fontSize: '10px', height: '20px' }} />
                                    <Chip label={item.status} size="small" sx={{ bgcolor: '#dcfce7', color: '#16a34a', fontWeight: 700, fontSize: '10px', height: '20px' }} />
                                    <Chip label={item.source} size="small" sx={{ bgcolor: '#f3e8ff', color: '#9333ea', fontWeight: 700, fontSize: '10px', height: '20px' }} />
                                    <Chip label={item.platform} size="small" sx={{ bgcolor: '#e0e7ff', color: '#4f46e5', fontWeight: 700, fontSize: '10px', height: '20px' }} />
                                </Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#64748b' }}>
                                    {item.subtitle} • {item.timeAgo}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    bgcolor: '#f8fafc',
                                    px: 2,
                                    py: 1,
                                    borderRadius: '20px',
                                    border: '1px solid #f1f5f9'
                                }}>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                                        {item.actionLeft}
                                    </Typography>
                                    <ArrowRight size={12} className="text-slate-400" />
                                    <Typography variant="caption" className={`${item.actionRightColor} font-bold`}>
                                        {item.actionRight}
                                    </Typography>
                                </Box>
                                <IconButton 
                                    size="small" 
                                    onClick={() => setDebugItem(item)}
                                    sx={{ color: '#94a3b8', '&:hover': { color: '#64748b', bgcolor: '#f1f5f9' } }}
                                >
                                    <Eye size={18} />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                    </AnimatePresence>
                </Box>
            </Card>

            {/* Debug Dialog */}
            <Dialog 
                open={Boolean(debugItem)} 
                onClose={() => setDebugItem(null)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: '20px', p: 1 }
                }}
            >
                <DialogContent>
                    {debugItem && (
                        <Box>
                            {/* Modal Header */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }} className={debugItem.iconBg}>
                                        {debugItem.icon}
                                    </Box>
                                    <Box>
                                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                            <Chip label={debugItem.type} size="small" sx={{ bgcolor: '#e0e7ff', color: '#4338ca', fontWeight: 800, fontSize: '10px', height: '20px' }} />
                                            <Chip label={debugItem.status} size="small" sx={{ bgcolor: '#dcfce7', color: '#16a34a', fontWeight: 800, fontSize: '10px', height: '20px' }} />
                                            <Chip label={debugItem.source} size="small" sx={{ bgcolor: '#f3e8ff', color: '#9333ea', fontWeight: 800, fontSize: '10px', height: '20px' }} />
                                            <Chip label={debugItem.platform} size="small" sx={{ bgcolor: '#e0e7ff', color: '#4f46e5', fontWeight: 800, fontSize: '10px', height: '20px' }} />
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>
                                            {debugItem.id}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                                            {debugItem.title} • {debugItem.timeAgo}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ bgcolor: '#f1f5f9', px: 2, py: 1, borderRadius: '12px', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#64748b' }}>{debugItem.actionLeft}</Typography>
                                        <ArrowRight size={14} className="text-slate-400" />
                                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#10b981' }}>{debugItem.actionRight}</Typography>
                                    </Box>
                                    <IconButton onClick={() => setDebugItem(null)} size="small" sx={{ bgcolor: '#eff6ff', color: '#3b82f6' }}>
                                        <ChevronDown size={20} />
                                    </IconButton>
                                </Box>
                            </Box>

                            {/* Status Section */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8' }}>HTTP:</Typography>
                                <Chip label="200" size="small" sx={{ bgcolor: '#dcfce7', color: '#16a34a', fontWeight: 800, fontSize: '11px', height: '22px' }} />
                            </Box>

                            {/* Request Section */}
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                    <Box component="span" sx={{ color: '#6366f1' }}>{'{/}'}</Box>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#6366f1', letterSpacing: '0.05em' }}>REQUEST</Typography>
                                </Box>
                                <Box sx={{ 
                                    p: 2, 
                                    bgcolor: '#f8fafc', 
                                    border: '1px solid #e2e8f0', 
                                    borderRadius: '12px',
                                    fontFamily: 'monospace',
                                    fontSize: '13px',
                                    color: '#475569',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-all'
                                }}>
                                    {`"{\\"url\\":\\"https://brands.blinkit.com/adservice/v3/campaigns\\",\\"method\\":\\"PUT\\",\\"campaign_id\\":\\"${debugItem.id}\\",\\"ad_type\\":\\"PRODUCT_LISTING\\",\\"body\\":{\\"source_platform\\":\\"${debugItem.platform}\\"}}"`}
                                </Box>
                            </Box>

                            {/* Response Section */}
                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                    <Box component="span" sx={{ color: '#10b981' }}>{'{/}'}</Box>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#10b981', letterSpacing: '0.05em' }}>RESPONSE</Typography>
                                </Box>
                                <Box sx={{ 
                                    p: 2, 
                                    bgcolor: '#f8fafc', 
                                    border: '1px solid #e2e8f0', 
                                    borderRadius: '12px',
                                    fontFamily: 'monospace',
                                    fontSize: '13px',
                                    color: '#475569'
                                }}>
                                    {`"{\\"status\\":true,\\"message\\":\\"success\\",\\"data\\":{\\"campaign_id\\":\\"${debugItem.id}\\"}}"`}
                                </Box>
                            </Box>

                            <Button 
                                variant="contained" 
                                startIcon={<Download size={18} />}
                                onClick={() => handleDownloadJSON(debugItem)}
                                sx={{ 
                                    textTransform: 'none', 
                                    bgcolor: '#4f46e5', 
                                    borderRadius: '10px',
                                    fontWeight: 700,
                                    px: 3,
                                    mb: 4,
                                    '&:hover': { bgcolor: '#4338ca' }
                                }}
                            >
                                Download Debug JSON
                            </Button>

                            <Divider sx={{ mb: 2 }} />
                            
                            {/* Footer Info */}
                            <Box sx={{ display: 'flex', gap: 3 }}>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>ID: 6614b26e...</Typography>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>Entity: {debugItem.id}</Typography>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>Platform: {debugItem.platform}</Typography>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>Source: {debugItem.source.toLowerCase()}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>HTTP:</Typography>
                                    <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 800 }}>200</Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default HistoryDashboard;
