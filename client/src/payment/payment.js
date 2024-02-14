import { toast } from "react-hot-toast";
 
import { apiConnector } from "../API/apiconnector";
import rzpLogo from "../assets/rzp_logo.png"
 
import { movieAPI } from "../API/apis";


const {GET_PAYMENT_DATA, PAYMENT_VERIFY_API} = movieAPI;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function buyCourse(selectedSeats,showId, userDetails, navigate) {
    const toastId = toast.loading("Loading...");
    try{
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        //initiate the order
        const orderResponse = await apiConnector("POST", GET_PAYMENT_DATA, 
                                {seats:selectedSeats,showId},
                              )

        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
       

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            // order_amount : `${orderResponse.data.data.amount}`,
            // order_amount : 10000,
            order_id:orderResponse.data.data.id,
            name:process.env.REACT_APP_NAME,
            description: "Thank You for Purchasing the Course",
            image:rzpLogo,
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response) {
                //send successful wala mail
                
                // sendPaymentSuccessEmail(response, orderResponse.data.data.amount,token );
                //verifyPayment
             
                verifyPayment({...response},  navigate);
            },
            modal: {
                "ondismiss": function(){
                    window.location.replace(`/bookmovie/${showId}`)
                 }
            }
        }
        //miss hogya tha 
        const paymentObject = new window.Razorpay(options);
         
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
           
        })

    }
    catch(error) {
       
       
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}
 
 
async function verifyPayment(bodyData, navigate) {
    const toastId = toast.loading("Verifying Payment....");
    
    try{
        const response  = await apiConnector("POST", PAYMENT_VERIFY_API, bodyData, )

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
  
    }   
    catch(error) {
    
      
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
 
}