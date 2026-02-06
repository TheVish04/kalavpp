
import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MoreHorizontal } from 'lucide-react';

const RevenueChart = ({ salesData }) => {
    // Process Sales Data for the Chart
    // Group by Date (Day)
    const processData = () => {
        if (!salesData || salesData.length === 0) return Array(7).fill({ name: 'Day', value: 0 }); // Fallback flat line

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const chartMap = {};

        // 1. Initialize last 7 days with 0
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = d.toDateString(); // Unique key for mapping
            const label = days[d.getDay()];
            chartMap[key] = { name: label, value: 0, fullDate: key };
        }

        // 2. Sum up sales
        salesData.forEach(sale => {
            const date = new Date(sale.created_at).toDateString();
            if (chartMap[date]) {
                chartMap[date].value += (sale.price_at_purchase || sale.price || 0);
            }
        });

        return Object.values(chartMap); // Returns array sorted naturally if keys inserted in order? 
        // Object.values order isn't guaranteed historically, but usually works for modern JS engines for string keys created in order. 
        // Better to separate:
        // Let's re-do slightly safer:

        const result = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toDateString();

            // Find total specific to this date
            const daysTotal = salesData
                .filter(s => new Date(s.created_at).toDateString() === dateStr)
                .reduce((acc, curr) => acc + (curr.price_at_purchase || curr.price || 0), 0);

            result.push({ name: days[d.getDay()], value: daysTotal });
        }
        return result;
    };

    const data = processData();

    return (
        <div className="bg-[#121212] p-6 rounded-2xl border border-[#1e1e1e] mb-8 relative">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Revenue Growth</h3>
                    <p className="text-gray-500 text-xs">Income over last 7 days</p>
                </div>
                <button className="text-gray-500 hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#525252', fontSize: 12 }}
                            dy={10}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueChart;
