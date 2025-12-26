const AnalyticsCard = ({ title }) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium mb-4">{title}</h3>

      {/* Placeholder for now */}
      <div className="text-4xl font-bold text-green-600">
        0
      </div>

      <p className="text-gray-500 mt-2">
        Total orders
      </p>
    </div>
  );
};

export default AnalyticsCard;
