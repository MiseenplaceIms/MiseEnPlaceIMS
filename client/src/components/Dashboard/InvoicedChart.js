import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const data = [
  {
    name: 'Meat',
    Recent: 400,
    Previous: 240,
    amt: 240
  },
  {
    name: 'Seafood',
    Recent: 300,
    Previous: 398,
    amt: 221
  },
  {
    name: 'Produce',
    Recent: 200,
    Previous: 980,
    amt: 229
  },
  {
    name: 'Dairy',
    Recent: 278,
    Previous: 390,
    amt: 200
  },
  {
    name: 'DryGoods',
    Recent: 189,
    Previous: 480,
    amt: 218
  },
  {
    name: 'Misc',
    Recent: 239,
    Previous: 380,
    amt: 250
  }
];

const InvoicedChart = () => {
  return (
    <div style={{ width: '100%', height: 270 }}>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Previous" fill="#335B86" />
          <Bar dataKey="Recent" fill="#B91736" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InvoicedChart;
