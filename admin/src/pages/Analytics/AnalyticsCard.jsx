import axios from 'axios';
import { url } from '../../assets/assets';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const AnalyticsCard = ({ title, url_endpoint }) => {

  const [orderCount, setOrderCount] = useState();

    const fetchOrderCount = async () => {
    const response = await axios.get(`${url}/api/order/analytics/${url_endpoint}`)
    if(response.data.success)
    {
      setOrderCount(response.data.totalOrders);
      console.log(response.data.totalOrders);
      
    }
    else{
      toast.error("Error fetching order count");
    }
  }

  useEffect(()=>{
    fetchOrderCount();
  },[])

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium mb-4">{title}</h3>

      {/* Placeholder for now */}
      <div className="text-4xl font-bold text-green-600">
        {orderCount}
      </div>

      <p className="text-gray-500 mt-2">
        Total orders
      </p>
    </div>
  );
};

export default AnalyticsCard;
