import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DonutChart from "./donutChart";
import LineChart from "./barChart";
import BarChart from "./barChart";
import Loader from "./loader";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";

function CustomerHome() {
  const navigate = useNavigate();
  const customer = useSelector((store) => store.customer);
  const [hashMap, setHashMap] = useState({
  });
  const [response,setResponse]=useState(102);
  
  const [businessess,setBusinessess]=useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pId, setPId] = useState("");
  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  },[]);

  useEffect(()=>{
    if(isLoading==false){
      toast.success("Signed In Successfully");
    }
  },[isLoading])

  

  // const getResponse = async () => {
  //   const accessToken = customer.data.accessToken;
    
  //   console.log("Here it is : ",accessToken);
  //   const rr = await axios.post(
  //     "https://flipkartbackend-un9n.onrender.com/getUserDetails",{},
  //     {
  //       headers: {
  //         Authorization: "Bearer " + accessToken,
  //         // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRkNDY3M2M2ODliMzRkMzY5ZmRlZGYiLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE2OTIyMjMwOTF9.1WFN8JJAVQUkwFVr4a1GA1HfhyGFMFLPIoJHhLdeMpY`, // Provide your access token
  //       },
  //     }
  //   );

    
  //   setResponse(rr.data);

  //   const rr2 = await axios.post(
  //     "https://flipkartbackend-un9n.onrender.com/getBusinessDetails/byUser",{
  //       businessess:rr.data.loyaltyPoints
  //     },
  //     {
  //       headers: {
  //         Authorization: "Bearer " + accessToken,
  //         // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRkNDY3M2M2ODliMzRkMzY5ZmRlZGYiLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE2OTIyMjMwOTF9.1WFN8JJAVQUkwFVr4a1GA1HfhyGFMFLPIoJHhLdeMpY`, // Provide your access token
  //       },
  //     }
  //   );


  //   setBusinessess(rr2.data);

  //   console.log("Here I am With data : ",rr2.data);

  //   console.log("I AM GOGO");

  // };
  // useEffect(() => {
  //    getResponse();
  // }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Connected to MetaMask");
        console.log(window.ethereum);
      } catch (error) {
        alert("Connect to Metamask !!");
        connectWallet();
      }
    }
  };

  // useEffect(() => {
  //   connectWallet();
  // }, []); // means at startup !!


  const handleSubmit = ()=>{


  }
  return (
    // <div>Hello</div>
    <div>
    {response===null || isLoading===true ? <Loader/> : <div className="w-screen h-screen   flex flex-col items-center gap-4">
      
      <div className="w-screen h-screen  flex flex-col items-center gap-16">
      <Navbar/>
      <div className="w-[30%] drop-shadow-xl bg-white shadow-lg shadow-gray-400 rounded-lg flex flex-col gap-4">
        <h2 className="text-center bg-emerald-400 py-3 text-white text-[20px] rounded-t-lg">
          Search for Patient
        </h2>
        <form onSubmit={handleSubmit} className="p-12">
          <input
            type="text"
            id="pID"
            placeholder="Enter Patient Id"
            value={pId}
            onChange={(e) =>
              setPId(()=>e.target.value)
            }
            required
          />
          

          {/* <label htmlFor="wallet">Business Wallet Address</label>
          <input
            type="text"
            id="wallet"
            placeholder="Enter your wallet address"
            value={businessData.businessWalletAddress}
            onChange={(e) => setBusinessData({ ...businessData, businessWalletAddress: e.target.value })}
            required
          /> */}

          {/* Add more input fields for other details */}

          <div className="flex flex-col mt-6  gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="px-1 py-3 bg-emerald-500 rounded-md text-white text-[18px]  shadow-md shadow-blue-400"
            >
              Search
            </motion.button>
          </div>
        </form>
      </div>
    </div>
    </div>}

    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

    </div>
  );
}

export default CustomerHome;
