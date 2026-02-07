
import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const AdminCharts = () => {

    // Mock Data for Area Chart
    const dailyData = [
        { day: 'Mon', value: 12000 },
        { day: 'Tue', value: 18000 },
        { day: 'Wed', value: 15000 },
        { day: 'Thu', value: 22000 },
        { day: 'Fri', value: 19000 },
        { day: 'Sat', value: 24500 },
        { day: 'Sun', value: 28000 },
    ];

    // Mock Data for Pie Chart
    const categoryData = [
        { name: 'Physical', value: 45, color: '#8c25f4' },
        { name: 'Digital', value: 30, color: '#2563eb' }, // Blue
        { name: 'Services', value: 25, color: '#2dd4bf' }, // Cyan/Teal
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1a1a1a] border border-[#333] p-3 rounded-lg shadow-xl">
                    <p className="text-gray-400 text-xs mb-1">{label}</p>
                    <p className="text-[#8c25f4] font-bold text-sm">
                        ${(payload[0].value / 1000).toFixed(1)}k
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left: Daily Transactions Area Chart */}
            <div className="lg:col-span-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-bold text-sm">Daily Transactions</h3>
                    <button className="text-gray-500 hover:text-white">...</button>
                </div>

                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dailyData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8c25f4" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8c25f4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#666', fontSize: 12 }}
                                dy={10}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#333', strokeDasharray: '5 5' }} />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#8c25f4"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Right: Sales by Category Donut Chart */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col items-center justify-center">
                <h3 className="w-full text-left text-white font-bold text-sm mb-4">Sales by Category</h3>

                <div className="w-full h-[200px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <span className="text-3xl font-bold text-white block">45%</span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Physical</span>
                    </div>
                </div>

                {/* Custom Legend */}
                <div className="flex justify-center gap-6 mt-4 w-full">
                    {categoryData.map((item) => (
                        <div key={item.name} className="flex flex-col items-center">
                            <div className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: item.color }}></div>
                            <span className="text-xs text-gray-400 font-bold">{item.name}</span>
                            <span className="text-[10px] text-gray-600">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default AdminCharts;
