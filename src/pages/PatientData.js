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

  const [timeSeriesData, setTimeSeriesData] = useState([]); // Time series data state
  const [iotDeviceData, setIotDeviceData] = useState([]); // IoT device data state
  const [selectedDevice, setSelectedDevice] = useState("device-1");
  const [isLoading, setIsLoading] = useState(true);

  const devices = [
    { key: "temperature", name: "temperature sensor" },
    { key: "spO2", name: "spo2 sensor" },
    { key: "bpm", name: "bpm monitor" },
  ];

  useEffect(() => {
    if (isLoading === false) {
      toast.success("Data Fetched Successfully !!");
    }
  }, [isLoading]);

  useEffect(() => {
    // Simulate a loading delay and fetch data
    const fetchData = async () => {
      try {
        // Simulate loading
        setTimeout(() => setIsLoading(false), 3000);

        // Fetch IoT device data
        const readings = response[0].readings.map((reading) => ({
          x: reading.id,
          y: parseInt(reading.reading, 10),
        }));
        setIotDeviceData(readings);

        // Fetch time series data
        const id = 123;
        const response2 = await fetch(`http://localhost:3010/get_data?id=${id}`);
        if (!response2.ok) {
          throw new Error(`Error: ${response2.status} - ${response2.statusText}`);
        }
        const result = await response2.json();
        const generatedData = generateTimeSeriesForArray(result, devices);
        setTimeSeriesData(getLatest10Values(generatedData)); // Set time series data in state
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data.");
      }
    };

    fetchData();
  }, [response]);


  function getLatest10Values(data) {
    // Sort data by timestamp in descending order
    const sortedData = [...data].sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));
    
    // Pick the latest 10 values
    const latest10 = sortedData.slice(0, 10);
    
    // Map the data into the required format for the chart
    return latest10.map((item) => ({
      x: item.timestamp.toString(), // Keep timestamp as a string for further parsing
      y: item.temperature.toString(), // Replace 'temperature' with the relevant field
    }));
  }
  

  function generateTimeSeriesForArray(resultArray, devices) {
    return resultArray.map((data) => {
      return {
        id: data.id,
        timeSeries: generateTimeSeriesForObject(data, devices),
      };
    });
  }

  function generateTimeSeriesForObject(data, devices) {
    const baseTimestamp = new Date(data.timestamp);

    // Loop through each device to create time series
    return devices.map((device) => {
      const finalValue = parseInt(data[device.key], 10); // Get the final value of the parameter
      const points = [];
      let currentTimestamp = new Date(baseTimestamp);

      // Create random values leading up to the last timestamp
      for (let i = 0; i < 10; i++) {
        const randomValue = Math.floor(Math.random() * (finalValue + 20)); // Random value
        currentTimestamp.setHours(currentTimestamp.getHours() - 1); // Move back 1 hour
        points.push({ x: currentTimestamp.toISOString(), y: randomValue.toString() }); // Push point
      }

      // Add the final point
      points.push({ x: baseTimestamp.toISOString(), y: finalValue.toString() });

      return {
        deviceId: device.name, // Use device name as ID
        timeSeriesData: points,
      };
    });
  }

  const handleChange = (event) => {
    setSelectedDevice(event.target.value);
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
              style={{ display: "flex", width: "400px", height: "350px" }}
              className="mt-8 ml-[250px]"
            >
              <LineChart timeSeriesData={timeSeriesData} />
              <BarChart data={iotDeviceData} />
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
