import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import LineChart from "./lineChart";
import BarChart from "./barChart";
import Loader from "./loader";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";

function PatientData() {
  const location = useLocation();
  const response = location.state;
  const customer = useSelector((store) => store.customer);
  const [timeSeriesData,setTimeSeriesData]=useState({})
  const [currentSelectedDeviceData, setCurrentSelectedDeviceData] = useState([]); // Time series data state
  const [iotDeviceData, setIotDeviceData] = useState([]); // IoT device data state
  const [selectedDevice, setSelectedDevice] = useState("temperature");
  const [isLoading, setIsLoading] = useState(true);

  const devices = [
    { key: "temperature", name: "Temperature sensor" },
    { key: "spO2", name: "Spo2 sensor" },
    { key: "bpm", name: "Bpm monitor" },
  ];

  useEffect(() => {
    getTimeSeriesData(); // Initial fetch
  }, []);

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
    

  const getTimeSeriesData = async () => {
    try {
      const id = 123; // Identifier for the data
      const response = await fetch(`http://localhost:3010/get_data?id=${id}`); // Backend API endpoint
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const result = await response.json(); // Parse the response JSON
      const latestValues = getLatest10Values(result); // Assuming getLatest10Values is a utility function to filter top 10 entries
      console.log("Fetched result:", latestValues);
  
      const aggregatedTimeSeries = generateAggregatedTimeSeries(latestValues, devices);
      console.log("Aggregated time series data:", aggregatedTimeSeries);
  
      // Assuming setTimeSeriesData is a state setter or similar function
      setTimeSeriesData(() => aggregatedTimeSeries);
      console.log("Starting to fill up the line chart >..");
      console.log(selectedDevice);
      console.log("lakshay is not gay...",aggregatedTimeSeries);
      setCurrentSelectedDeviceData(()=>{
        console.log("Line chart data updated ",aggregatedTimeSeries.timeSeries[selectedDevice]);
        return aggregatedTimeSeries.timeSeries[selectedDevice]
      })
      console.log("Starting to fill up the bar chart >..");
      await fetchData(aggregatedTimeSeries); // fetches the data for 
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };

  const onRefresh=()=>{
    getTimeSeriesData();
  }

  useEffect(() => {
    if (isLoading === false) {
      toast.success("Data Fetched Successfully !!");
    }
  }, [isLoading]);

  function extractLatestValues(timeSeriesData, devices) {
    const latestValues = devices.map((device) => {
      const deviceKey = device.key;
      const deviceTimeSeries = timeSeriesData.timeSeries[deviceKey];
  
      if (deviceTimeSeries && deviceTimeSeries.length > 0) {
        const latestEntry = deviceTimeSeries[deviceTimeSeries.length - 1]; // Get the latest entry
        return {
          x: device.name, // Use the device name as x
          y: latestEntry.y, // Use the latest value as y
        };
      }
  
      return {
        x: device.name, // Use the device name as x
        y: null, // If no data is available, set y to null
      };
    });
  
    return latestValues;
  }

  const fetchData = async (aggregatedTimeSeries) => {
    try {
      // Fetch IoT device data
      const latestDeviceValues = extractLatestValues(aggregatedTimeSeries, devices);
      setIotDeviceData(()=>latestDeviceValues);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data.");
    }
  };

  useEffect(() => {
    // Simulate a loading delay and fetch data
    setTimeout(() => setIsLoading(false), 3000);
  }, [response]);


  function getLatest10Values(data) {
    // Sort data by timestamp in descending order
    const sortedData = [...data].sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));
    
    // Pick the latest 10 values
    const latest10 = sortedData.slice(0, 10);
    
    return latest10;
  }
  

  // Function to generate time series data for an array of sensor readings
  // Function to generate aggregated time series data for all sensor readings
function generateAggregatedTimeSeries(resultArray, devices) {
  const aggregatedTimeSeries = {
    id: resultArray[0]?.id || null, // Use the ID from the first entry as the identifier
    timeSeries: {},
  };

  // Initialize timeSeries object for each device key
  devices.forEach((device) => {
    aggregatedTimeSeries.timeSeries[device.key] = [];
  });

  resultArray.forEach((data) => {
    const baseTimestamp = new Date(data.timestamp); // Base timestamp for the data

    devices.forEach((device) => {
      const deviceKey = device.key; // The key representing the sensor data in the result object
      const sensorValue = data[deviceKey]; // Retrieve the sensor value from the result object

      if (sensorValue !== undefined && sensorValue !== null) {
        aggregatedTimeSeries.timeSeries[deviceKey].push({
          x: baseTimestamp.toISOString(), // Use the timestamp as the x-axis value
          y: sensorValue.toString(), // Use the sensor value as the y-axis value
        });
      }
    });
  });

  return aggregatedTimeSeries;
}

// Asynchronous function to fetch and process time series data


  

  const handleChange = (e) => {
    setSelectedDevice(()=>e.target.value);
    if(timeSeriesData!==null){
      setCurrentSelectedDeviceData(()=>{
        console.log("Line chart data updated ",timeSeriesData.timeSeries[e.target.value]);
        return timeSeriesData.timeSeries[e.target.value]
      })
    }
  };

  return (
    <div>
      {isLoading === true ? (
        <Loader />
      ) : (
        <div className="w-screen h-screen flex flex-col items-center gap-4">
          <Navbar />

          <div className="w-[95%] bg-white p-5 rounded-md shadow-md shadow-gray-600">
            <div className="flex justify-between items-center bg-emerald-500 px-4 py-3 shadow-md shadow-gray-300 rounded-md">
              <p className="text-white text-[20px]">{response.id}</p>
              <p className="text-white text-[20px]">{response.age}</p>

              {/* Dropdown Menu */}
              <div className="relative">
                <div>
                  <select
                    value={selectedDevice}
                    onChange={(e)=>{
                      handleChange(e);
                    }}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-emerald-500 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="temperature">Temperature sensor</option>
                    <option value="spO2">Spo2 sensor</option>
                    <option value="bpm">Bpm monitor</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              style={{ display: "flex", width: "400px", height: "350px" }}
              className="mt-8 ml-[250px]"
            >
              <LineChart timeSeriesData={currentSelectedDeviceData} />
              <BarChart data={iotDeviceData} />
            </div>
            <div className="mt-12 p-2">
              <button onClick={predictDisease} className="mr-2 bg-emerald-500 px-5 py-1 text-white w-max text-[20px] rounded-md shadow-md shadow-green-300">
                Predict Disease
              </button>
              <button onClick={onRefresh} className=" bg-purple-700  px-5 py-1 text-white w-max text-[20px] rounded-md shadow-md shadow-purple-300">
                Refresh 🔃
              </button>
              </div>
          </div>
        </div>
      )}
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
    </div>
  );
}

export default PatientData;
