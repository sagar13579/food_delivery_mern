import { Tabs } from "antd";
import AnalyticsCard from "./AnalyticsCard";

const Analytics = () => {
  const items = [
    {
      key: "today",
      label: "Today",
      children: <AnalyticsCard title="Orders Today" />,
    },
    {
      key: "yesterday",
      label: "Last Day",
      children: <AnalyticsCard title="Orders Yesterday" />,
    },
    {
      key: "week",
      label: "Last Week",
      children: <AnalyticsCard title="Orders Last Week" />,
    },
    {
      key: "month",
      label: "Last Month",
      children: <AnalyticsCard title="Orders Last Month" />,
    },
  ];

  return (
    <div className="border-2 border-black p-6 bg-gray-100 w-[70%] pl-6 pt-12">
      <h2 className="text-2xl font-semibold mb-4">Analytics</h2>

      <div className="bg-white p-4 rounded-lg shadow">
        <Tabs defaultActiveKey="today" items={items} />
      </div>
    </div>
  );
};

export default Analytics;
