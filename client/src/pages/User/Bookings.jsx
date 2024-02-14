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
    
      const res = await apiConnector("POST", GET_BOOKING);
      setProgress(50)
     
      
      setBookings(res.data.data);
      setProgress(70)
      
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
