import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useTranslation } from 'react-i18next';

const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function Graphics({ products }) {
  // const products = useSelector((state) => state.products);
  const [costGroups, setCostGroups] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    let lessthan800 = 0,
      lessThan1600 = 0,
      between2400 = 0,
      morethan3500 = 0;
    products.forEach((prod) => {
      if (prod.price > 800) return lessthan800++;
      if (prod.price < 1500) return lessThan1600++;
      if (prod.price <= 5000) return between2400++;
      morethan3500++;
    });
    setCostGroups([
      { name: t('graphicsAdmin.less1'), qty: lessthan800 },
      { name: t('graphicsAdmin.less2'), qty: lessThan1600 },
      { name: t('graphicsAdmin.major1'), qty: between2400 },
      { name: t('graphicsAdmin.major2'), qty: morethan3500 },
    ]);
  }, [products]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      <PieChart width={200} height={200}>
        <Pie
          data={costGroups}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="qty"
        >
          {costGroups.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Stack gap={2}>
        <Typography variant="h6">Prices</Typography>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {COLORS.map((color, i) => (
            <Stack key={color} alignItems="center" spacing={1}>
              <Box sx={{ width: 20, height: 20, background: color }} />
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {costGroups[i]?.name}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
