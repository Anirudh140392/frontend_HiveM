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
    Divider
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
    ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const HistoryDashboard = () => {
    const stats = [
        { label: "Total", value: 2962, icon: <ClipboardList className="w-6 h-6 text-amber-600" />, active: true },
        { label: "Success", value: 2871, icon: <CheckSquare className="w-6 h-6 text-emerald-500" />, active: false },
        { label: "Pending", value: 1, icon: <Hourglass className="w-6 h-6 text-amber-500" />, active: false },
        { label: "Failed", value: 85, icon: <X className="w-6 h-6 text-rose-500" />, active: false },
        { label: "Skipped", value: 5, icon: <FastForward className="w-6 h-6 text-blue-500" />, active: false }
    ];

    const timelineData = [
        {
            id: 1,
            type: "ALERT",
            status: "success",
            source: "Rule",
            platform: "Amazon",
            title: "test_trailytics",
            subtitle: "test_alert",
            timeAgo: "3d ago",
            icon: <Bell className="w-5 h-5 text-yellow-500" fill="currentColor" />,
            iconBg: "bg-yellow-50",
            actionLeft: "conditions...",
            actionRight: "notificatio...",
            actionRightColor: "text-emerald-600"
        },
        {
            id: 2,
            type: "STATUS",
            status: "success",
            source: "Rule",
            platform: "Zepto",
            title: "Test_Trailytics",
            subtitle: "boat Zepto test",
            timeAgo: "3d ago",
            icon: <Pause className="w-5 h-5 text-blue-500" fill="currentColor" />,
            iconBg: "bg-blue-50",
            actionLeft: "ACTIVE",
            actionRight: "PAUSED",
            actionRightColor: "text-emerald-600"
        },
        {
            id: 3,
            type: "STATUS",
            status: "success",
            source: "Rule",
            platform: "Zepto",
            title: "Test_Trailytics",
            subtitle: "boat Zepto test",
            timeAgo: "4d ago",
            icon: <Pause className="w-5 h-5 text-blue-500" fill="currentColor" />,
            iconBg: "bg-blue-50",
            actionLeft: "ACTIVE",
            actionRight: "PAUSED",
            actionRightColor: "text-emerald-600"
        }
    ];

    const FilterChip = ({ icon, label, active, colorClass }) => (
        <Chip
            icon={icon}
            label={label}
            size="small"
            sx={{
                bgcolor: active ? '#3b82f6' : '#f8fafc',
                color: active ? 'white' : '#64748b',
                fontWeight: 600,
                fontSize: '12px',
                border: active ? 'none' : '1px solid #e2e8f0',
                '& .MuiChip-icon': {
                    color: active ? 'white' : 'inherit'
                },
                mr: 1,
                mb: 1
            }}
            className={active ? '' : colorClass}
        />
    );

    return (
        <Box sx={{ 
            p: 4, 
            bgcolor: '#f8fafc', 
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
                    <TextField
                        fullWidth
                        placeholder="Search by campaign name, entity ID, action type..."
                        variant="outlined"
                        size="small"
                        sx={{
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                bgcolor: '#f8fafc',
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
                        <Filter size={18} className="text-slate-400 mr-3" />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FilterChip label="All Statuses" active={true} />
                            <FilterChip icon={<CheckSquare size={14} className="text-emerald-500" />} label="Success" />
                            <FilterChip icon={<Hourglass size={14} className="text-amber-500" />} label="Pending" />
                            <FilterChip icon={<X size={14} className="text-rose-500" />} label="Failed" />
                            <FilterChip icon={<FastForward size={14} className="text-blue-500" />} label="Skipped" />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#64748b', mr: 3, fontWeight: 500 }}>
                            Action:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Chip
                                label="All Types"
                                size="small"
                                sx={{
                                    bgcolor: '#6366f1',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '12px',
                                    mr: 1,
                                    mb: 1
                                }}
                            />
                            <FilterChip icon={<Pause size={14} className="text-blue-500" fill="currentColor" />} label="Status" />
                            <FilterChip icon={<Flame size={14} className="text-orange-500" fill="currentColor" />} label="Budget" />
                            <FilterChip icon={<TrendingUp size={14} className="text-indigo-400" />} label="Bid" />
                            <FilterChip icon={<Key size={14} className="text-amber-500" />} label="Keyword" />
                            <FilterChip icon={<Target size={14} className="text-rose-500" />} label="Targeting" />
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
                    >
                        <Card sx={{ 
                            borderRadius: '16px', 
                            boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
                            border: stat.active ? '2px solid #3b82f6' : '1px solid rgba(0,0,0,0.05)',
                            height: '100%'
                        }}>
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
                        1-20 of 2962
                    </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {timelineData.map((item, idx) => (
                        <Box 
                            key={item.id} 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                p: 3, 
                                borderBottom: idx !== timelineData.length - 1 ? '1px solid #f8fafc' : 'none',
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
                                <IconButton size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#64748b', bgcolor: '#f1f5f9' } }}>
                                    <Eye size={18} />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Card>
        </Box>
    );
};

export default HistoryDashboard;
