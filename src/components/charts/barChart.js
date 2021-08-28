import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function MeetingBarChart(props) {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
    <BarChart
      data={props.data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <Tooltip formatter={(value, name, props) => {return [value,name]}}/>
      <Legend />
      <Bar unit="%" name="Engagement" dataKey="engagement" stackId="a" fill="#82ca9d" />
      <Bar unit="%" name="Deadair" dataKey="deadair" stackId="a" fill="#8884d8" />
    </BarChart>
    </ResponsiveContainer>
  );
}
