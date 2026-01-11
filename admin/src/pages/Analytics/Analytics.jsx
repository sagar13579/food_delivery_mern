import { Tabs } from "antd";
import AnalyticsCard from "./AnalyticsCard";

const Analytics = () => {
  
  const items = [
    {
      key: "today",
      label: "Today",
      children: <AnalyticsCard title="Orders Today" url_endpoint="today" />,
    },
    {
      key: "yesterday",
      label: "Yesterday",
      children: <AnalyticsCard title="Orders Yesterday" url_endpoint="yesterday" />,
    },
    {
      key: "week",
      label: "Last 7 Days",
      children: <AnalyticsCard title="Orders Last 7 Days" url_endpoint="last-week" />,
    },
    {
      key: "month",
      label: "Last 30 Days",
      children: <AnalyticsCard title="Orders Last 30 Days" url_endpoint="last-30-days" />,
    },
  ];

  return (
    <div className="border-2 border-black bg-gray-100 w-[70%] pl-6 pt-12">
      <h2 className="text-2xl font-semibold mb-4">Analytics</h2>

      <div className="bg-white m-3 rounded-lg shadow">
        <Tabs defaultActiveKey="today" items={items} />
      </div>
    </div>
  );
};

export default Analytics;
