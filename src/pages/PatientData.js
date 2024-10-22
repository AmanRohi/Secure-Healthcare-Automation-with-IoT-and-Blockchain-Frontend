import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import DonutChart from "./donutChart";
import LineChart from "./lineChart";
import BarChart from "./barChart";
import Loader from "./loader";
import Navbar from "./Navbar";


function PatientData() {
  const location=useLocation();
  const response=location.state;
  const customer = useSelector((store) => store.customer);
  const [hashMap, setHashMap] = useState({
  });
  const [selectedDevice,setSelectedDevice]=useState("device-1");
  
  const [businessess,setBusinessess]=useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    console.log("newly added data");
    console.log(response);
  }, []);

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

  const getTimeSeriesData = () => {
    let timeSeriesData = [];
    
    response[0].readings.forEach(reading => {
      const deviceId = reading.id;
      
      if (deviceId == selectedDevice) {
        const lastTimestamp = new Date(reading.timestamp);
        const finalValue = parseInt(reading.reading, 10);
        
        // Generate random data points
        const points = [];
        let currentTimestamp = new Date(lastTimestamp);
        
        // Create random values leading up to the last timestamp
        for (let i = 0; i < 10; i++) {
          const randomValue = Math.floor(Math.random() * (finalValue + 20)); // Random value between 0 and (finalValue + 20)
          currentTimestamp.setHours(currentTimestamp.getHours() - 1); // Move back 1 hour for each point
          points.push({ x: currentTimestamp.toISOString(), y: randomValue.toString() }); // Convert value to string
        }
    
        // Add the final point
        points.push({ x: lastTimestamp.toISOString(), y: finalValue.toString() }); // Convert value to string
        
        console.log("time series data : ");
        console.log(points);
        timeSeriesData = points;
      }
    });
    
    console.log(timeSeriesData);
    return timeSeriesData;
  };
  
  

  const getIotDeviceData=()=>{
    const readings = response[0].readings.map(reading => ({
        x:reading.id,
        y:parseInt(reading.reading, 10), // Convert reading to a number
      }));
    return readings;
  }

  useEffect(() => {
    // connectWallet();
  }, []); // means at startup !!
  return (
    // <div>Hello</div>
    <div>
    {isLoading===true ? <Loader/> : <div className="w-screen h-screen   flex flex-col items-center gap-4">
      <Navbar/>
      <div className="w-[95%]  bg-white p-5 rounded-md shadow-md shadow-gray-600  ">
        <div className="flex justify-between bg-indigo-500 px-4 py-3 shadow-md shadow-gray-300 rounded-md">
          <p className=" text-white text-[20px]">{response.id}</p>
          <p className=" text-white text-[20px]">{response.age}</p>
        </div>
        <div style={{ display:'flex',width: '400px', height: '350px' }} className="mt-8 ml-[250px]">
          <LineChart timeSeriesData={getTimeSeriesData()}></LineChart>
          <BarChart data={getIotDeviceData()} ></BarChart>
        </div>
        <div className="mt-12   p-2 ">
          <p className="bg-blue-700 px-5 py-1 text-white w-max text-[20px] rounded-md shadow-md shadow-green-300">
            Loyalty Points
          </p>
          <div className="mt-4 flex gap-2 flex-wrap ">
            {businessess.map((res) => {
              return (
                <div className=" p-2 px-3 h-max bg-gray-500/95 rounded-md text-white justify-center  flex  gap-1 text-[22px]">
                  <p>{res.businessDetails.name}</p>
                  <p>{res.totalCount}</p>
                </div>
              );
            })}
          </div>
        </div>

        <motion.button
          onClick={() => {
            // navigate("/getReward");
          }}
          whileTap={{ scale: 0.9 }}
          type="button"
          className="mt-16 bg-emrald-700 px-5 py-2 text-white w-max text-[20px] rounded-md shadow-md shadow-green-300"
        >
          Make Prediction
        </motion.button>
        <motion.button
          onClick={() => {
            // navigate("/transactionHistory");
          }}
          whileTap={{ scale: 0.9 }}
          type="button"
          className="ml-5 bg-violet-700 px-5 py-2 text-white w-max text-[20px] rounded-md shadow-md shadow-green-300"
        >
          Transaction History
        </motion.button>
      </div>
    </div>}
    </div>
  );
}

export default PatientData;