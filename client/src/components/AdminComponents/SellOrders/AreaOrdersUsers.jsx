import moment from "moment";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const months = 5;
const today = new Date();
const tempData = [];
for (let i = 0; i < months; i++) {
  const date = new Date(
    today.getFullYear(),
    today.getMonth() - (months - (i + 1))
  );
  tempData.push({
    date,
    name: moment(date).format("MMM YYYY"),
    users: 0,
    rooms: 0,
  });
}
const AreaOrdersUsers = ({ orders, users }) => {
  const [data, setData] = useState();

  useEffect(() => {
    for (let i = 0; i < months; i++) {
      tempData[i].users = 0;
    }
    users.forEach((e) => {
      for (let i = 0; i < months; i++) {
        if (moment(tempData[i].date).isSame(e?.createdAt, "month"))
          return tempData[i].users++;
      }
    });
    setData([...tempData]);
  }, [users]);

  useEffect(() => {
    for (let i = 0; i < months; i++) {
      tempData[i].orders = 0;
    }
    orders.forEach((e) => {
      for (let i = 0; i < months; i++) {
        if (moment(tempData[i].date).isSame(e?.date, "month"))
          return tempData[i].orders++;
      }
    });
    setData([...tempData]);
  }, [orders]);

  return (
    <div style={{ width: "100%", height: 300, minWidth: 250 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="users"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="orders"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaOrdersUsers;
