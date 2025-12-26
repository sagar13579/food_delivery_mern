import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import './Profile.css'

const Profile = () => {

  const { token, url } = useContext(StoreContext);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // 🔹 Fetch profile
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        url + "/api/user/profile-data",
        { headers: { token } }
      );

      setData({
        name: res.data.data.name || "",
        email: res.data.data.email || "",
        phone: res.data.data.phone || "",
        street: res.data.data.street || "",
        city: res.data.data.city || "",
        state: res.data.data.state || "",
        zipcode: res.data.data.zipcode || "",
        country: res.data.data.country || ""
      });
    } catch (err) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

const saveProfile = async (e) => {
  e.preventDefault();

  const payload = {
    phone: data.phone,
    address: {
      street: data.street,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      country: data.country,
    },
  };

  console.log("Payload sent to backend:", payload);

  try {
    const addedData = await axios.post(
      url + "/api/user/profile/add",
      payload,
      { headers: { token } }
    );
    toast.success("Profile updated successfully");
  } catch (err) {
    toast.error("Failed to update profile");
  }
};

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <form className="profile" onSubmit={saveProfile}>
  <h2>My Profile</h2>

    <input
      name="name"
      value={data.name}
      disabled
    />

  <input
    name="email"
    value={data.email}
    disabled
  />

  <input
    name="phone"
    value={data.phone}
    onChange={onChangeHandler}
    placeholder="Phone"
  />

  <input
    name="street"
    value={data.street}
    onChange={onChangeHandler}
    placeholder="Street"
  />

  <div className="multi-field">
    <input
      name="city"
      value={data.city}
      onChange={onChangeHandler}
      placeholder="City"
    />

    <input
      name="state"
      value={data.state}
      onChange={onChangeHandler}
      placeholder="State"
    />
  </div>

  <div className="multi-field">
    <input
      name="zipcode"
      value={data.zipcode}
      onChange={onChangeHandler}
      placeholder="Zip Code"
    />

    <input
      name="country"
      value={data.country}
      onChange={onChangeHandler}
      placeholder="Country"
    />
  </div>

  <button type="submit">Save Profile</button>
</form>
  );
};

export default Profile;

