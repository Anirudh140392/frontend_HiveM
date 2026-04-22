import React, { useState } from 'react';
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
    Avatar
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
    ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AutomationRules = () => {
    const [selectedRules, setSelectedRules] = useState([]);
    const [rules, setRules] = useState([
        {
            id: 1,
            name: "test_alert",
            status: "active",
            type: "Send Alert",
            platform: "Amazon",
            entity: "Boat Amazon India",
            triggers: 5,
            lastRun: "21/04/2026, 00:00:17",
            nextRun: "22/04/2026, 00:00:17",
            schedule: "daily",
            created: "17/04/2026",
            runsAt: "Runs at specific times"
        },
        {
            id: 2,
            name: "boat Zepto test",
            status: "active",
            type: "Pause Campaign",
            platform: "Zepto",
            entity: "Boat Zepto",
            triggers: 7,
            lastRun: "20/04/2026, 16:18:09",
            nextRun: "20/04/2026, 21:48:00",
            schedule: "daily",
            created: "17/04/2026",
            runsAt: "Runs at specific times: 16:18"
        },
        {
            id: 3,
            name: "test_blinkit",
            status: "paused",
            type: "Pause Campaign",
            platform: "BLINKIT",
            entity: "Boat Blinkit",
            triggers: 3,
            lastRun: "17/04/2026, 13:06:03",
            nextRun: null,
            schedule: "daily",
            created: "17/04/2026",
            runsAt: "Runs at specific times: 13:06"
        }
    ]);

    const stats = [
        { label: "Total Rules", value: 47, icon: <Layers className="w-6 h-6 text-orange-500" />, bgColor: "bg-orange-50" },
        { label: "Active", value: 2, icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />, bgColor: "bg-emerald-50" },
        { label: "Paused", value: 45, icon: <PauseCircle className="w-6 h-6 text-blue-500" />, bgColor: "bg-blue-50" },
        { label: "Total Triggers", value: 154, icon: <Zap className="w-6 h-6 text-amber-500" />, bgColor: "bg-amber-50" }
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
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <Select
                            value="Boat"
                            sx={{
                                bgcolor: 'white',
                                borderRadius: '12px',
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' }
                            }}
                        >
                            <MenuItem value="Boat">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Avatar sx={{ width: 20, height: 20, fontSize: '10px' }}>B</Avatar>
                                    Boat
                                </Box>
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        startIcon={<Plus size={18} />}
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
                        <Card sx={{
                            borderRadius: '24px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            overflow: 'hidden'
                        }}>
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
                            checked={selectedRules.length === rules.length}
                            onChange={handleSelectAll}
                            sx={{ color: '#cbd5e1' }}
                        />
                    }
                    label={<Typography sx={{ fontWeight: 600, color: '#64748b' }}>Select all</Typography>}
                />
                <Button
                    variant="outlined"
                    startIcon={<Download size={18} />}
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
                <AnimatePresence>
                    {rules.map((rule, idx) => (
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
                                                <IconButton size="small" sx={{ bgcolor: '#eff6ff', color: '#2563eb', '&:hover': { bgcolor: '#dbeafe' } }}>
                                                    <Edit2 size={18} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Clone">
                                                <IconButton size="small" sx={{ bgcolor: '#f5f3ff', color: '#7c3aed', '&:hover': { bgcolor: '#ede9fe' } }}>
                                                    <Copy size={18} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton size="small" sx={{ bgcolor: '#fff1f2', color: '#f43f5e', '&:hover': { bgcolor: '#ffe4e6' } }}>
                                                    <Trash2 size={18} />
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
        </Box>
    );
};

export default AutomationRules;
