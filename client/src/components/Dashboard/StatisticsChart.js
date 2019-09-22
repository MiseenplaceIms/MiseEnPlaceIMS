import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Revenue', value: 400 },
  { name: 'Utilities', value: 90 },
  { name: 'Maintenance', value: 300 },
  { name: 'Salaries', value: 200 },
  { name: 'Groceries', value: 300 }
];

const COLORS = ['#242555', '#873F4F', '#CFD8E4', '#E84A68', '#85838B'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  payload,
  percent
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      style={{ textAlign: 'center' }}
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const StatisticsChart = () => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={160}
        cy={130}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={130}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default StatisticsChart;
