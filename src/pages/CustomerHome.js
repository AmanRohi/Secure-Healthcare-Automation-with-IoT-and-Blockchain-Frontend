import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import DonutChart from "./donutChart";
import LineChart from "./barChart";
import BarChart from "./barChart";
import Loader from "./loader";
import Navbar from "./Navbar";
import PatientData from "./PatientData";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import Abi from "./Abi";


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
    const accessToken=customer.accessToken;
    console.log(accessToken);
  },[isLoading])

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

  const handleSubmit = async ()=>{
    const accessToken=customer.accessToken;
    console.log(accessToken);
    try{
      const response = await axios.post(
        "http://localhost:3000/getPatientDetails",
        {
          pId
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRkNDY3M2M2ODliMzRkMzY5ZmRlZGYiLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE2OTIyMjMwOTF9.1WFN8JJAVQUkwFVr4a1GA1HfhyGFMFLPIoJHhLdeMpY`, // Provide your access token
          },
        }
      );

      // Call blockchain !! 
      await connectWallet();
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.enable();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          // Prompt user for account connections
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();

          const contractAddress = "0x06441b211a8729B40FE15955F9A58b2F5829d022"; // Replace with your smart contract address
          const contractABI = Abi.contractABI; // Replace with your smart contract ABI

          // const contract = new ethers.Contract(
          //   contractAddress,
          //   contractABI,
          //   signer
          // );

          // const add = await signer.getAddress();
          // const txResponse = await tx.wait();
          // console.log("Transaction Response : ", txResponse.transactionHash);

          // const hash = txResponse.transactionHash;
          // const ltAddress = await contract.getBusinessCoin(add);
          // console.log("LT Address:", ltAddress);

          toast.success("Data Fetched Successfully !");
        } catch (error) {
          toast.error("Data Fetching Error !!");
          console.log(error);
        }
      } else {
        await connectWallet();
      }

      // Handle the response from the backend
      console.log(response.data); // This should contain user details and access token
      navigate("/PatientData",{state:response.data} );
      // toast.success("Patient Data Retrieved Successfully");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }


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
        <form onSubmit={(e)=>{
          e.preventDefault();
          handleSubmit();
        }} className="p-12">
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
