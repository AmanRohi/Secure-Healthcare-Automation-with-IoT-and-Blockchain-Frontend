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
import { ToastContainer,toast } from "react-toastify";

function PatientData() {
  const location=useLocation();
  const response=location.state;
  const customer = useSelector((store) => store.customer);
  const [hashMap, setHashMap] = useState({
  });
  const [selectedDevice,setSelectedDevice]=useState("device-1");
  
  const [businessess,setBusinessess]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=>{
    if(isLoading==false){
        toast.success("Data Fetched Successfully !!");
    }
  },[isLoading])

  const predictDisease=async()=>{
    try{
      const url = "http://127.0.0.1:3002/predict_rfc";
      const response = await axios.post(
          url,
          {
              "ID": 1,
              "AGE": 58.0,
              "PackHistory": 77.0,
              "COPDSEVERITY": 60.0,
              "MWT1": 120.0,
              "MWT2": 120.0,
              "MWT1Best": 120.0,
              "FEV1": 1.21,
              "FEV1PRED": 36.0,
              "FVC": 2.4,
              "FVCPRED": 98.0,
              "CAT": 25.0,
              "HAD": 8.0,
              "SGRQ": 69.55,
              "AGEquartiles": 4,
              "copd": 3,
              "gender": 1,
              "smoking": 2,
              "Diabetes": 1,
              "muscular": 2,
              "hypertension": 1,
              "AtrialFib": 0,
              "IHD": 0
          },
          {
              headers: {
                  "Content-Type": "application/json"
              }
          }
      );
  
        console.log(response.data.rfc_prediction);
        toast.success("Copd Level : "+response.data.rfc_prediction[0])
    }
    catch(e){
        console.log(e);
        toast.error("Prediction Can't be Made !!");
    }
      // window.alert("Copd Level : "+response.data.rfc_prediction[0]);
  }

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

  const handleChange = (event) => {
    setSelectedDevice(event.target.value);
    };
  useEffect(() => {
    // connectWallet();
  }, []); // means at startup !!
  return (
    // <div>Hello</div>
    <div>
    {isLoading===true ? <Loader/> : <div className="w-screen h-screen   flex flex-col items-center gap-4">
      <Navbar/>
      
      <div className="w-[95%] bg-white p-5 rounded-md shadow-md shadow-gray-600">
  <div className="flex justify-between items-center bg-emerald-500 px-4 py-3 shadow-md shadow-gray-300 rounded-md">
    <p className="text-white text-[20px]">{response.id}</p>
    <p className="text-white text-[20px]">{response.age}</p>

    {/* Dropdown Menu */}
    <div className="relative">
      
      <div >
        <select
        value={selectedDevice}
        onChange={handleChange}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-emerald-500 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
      >
        <option value="device-1">Device 1</option>
        <option value="device-2">Device 2</option>
        <option value="device-3">Device 3</option>
        <option value="device-4">Device 4</option>
        <option value="device-5">Device 5</option>
      </select>


      </div>
    </div>
  </div>

  <div
    style={{ display: 'flex', width: '400px', height: '350px' }}
    className="mt-8 ml-[250px]"
  >
    <LineChart timeSeriesData={getTimeSeriesData()} />
    <BarChart data={getIotDeviceData()} />
  </div>

  <div className="mt-12 p-2">
    <button onClick={predictDisease} className="bg-emerald-500 px-5 py-1 text-white w-max text-[20px] rounded-md shadow-md shadow-green-300">
      Predict Disease
    </button>
    <div className="mt-4 flex gap-2 flex-wrap">
      {businessess.map((res) => {
        return (
          <div className="p-2 px-3 h-max bg-gray-500/95 rounded-md text-white justify-center flex gap-1 text-[22px]">
            <p>{res.businessDetails.name}</p>
            <p>{res.totalCount}</p>
          </div>
        );
      })}
    </div>
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

export default PatientData;