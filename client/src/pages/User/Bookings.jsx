import React, { useContext, useEffect, useState } from "react";
import { apiConnector } from "../../API/apiconnector";
import { movieAPI } from "../../API/apis";
import toast from "react-hot-toast";
import { Ticket } from "./Ticket";
import { ProgressContext } from "../../context/Context";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setProgress} = useContext(ProgressContext);
  const { GET_BOOKING } = movieAPI;
  async function getBooking() {
    try {
      setProgress(10)
      setLoading(true);
      console.log("heree");
      const res = await apiConnector("POST", GET_BOOKING);
      setProgress(50)
      console.log("heree");
      
      setBookings(res.data.data);
      setProgress(70)
      console.log(res.data.data);
      setProgress(80)
      
      setLoading(false);
      setProgress(100)
    } catch (error) {
      setProgress(100)
      setLoading(false);
      toast.error("error occured");
    }
  }
  useEffect(() => {
    getBooking();
  }, []);

  return (
    <div className="w-full pb-2">
      {loading ? (
        <>loading</>
      ) : (
       bookings.map((ticket) => {
        return <div> <Ticket ticket={ticket}/> </div>
       })
      )}
    </div>
  );
};

export default Bookings;
