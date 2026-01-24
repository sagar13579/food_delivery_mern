import { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import './Verify.css'
import axiosInstance from '../../axiosInstance';

const Verify = () => {
  const { url } = useContext(StoreContext)
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId") 

  const navigate = useNavigate();

const verifyPayment = async () => {
  try {
    const response = await axiosInstance.post(
      "/api/order/verify",
      { success, orderId }
    );

    console.log("response:", response.data);

    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  } catch (error) {
    console.error("Verify payment error:", error);
    navigate("/");
  }
};

  useEffect(() => {
    verifyPayment();
  }, [])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
