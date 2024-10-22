import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./loader";
import Navbar from "./Navbar";
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
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

  useEffect(() => {
    // connectWallet();
  }, []); // means at startup !!

  const navigate = useNavigate();
  return (
    <div>
      {isLoading === true ? (
        <Loader />
      ) : (
        <div>
          <Navbar/>
          
        
          <div className=" p-8 flex  justify-between items-center">
            <div className="">
              <img src="https://img.freepik.com/free-vector/online-doctor-concept-illustration_114360-1764.jpg?t=st=1729578767~exp=1729582367~hmac=a160727ef4a74909baf53e718d55d54617954188332f4f9d8a6ad9962327bbbb&w=740" className="w-[500px] h-[500px]" />
            </div>
            <div className="flex justify-center items-center w-[50%]">
              <div className=" w-[400px] h-[300px] font-ubuntu">
                <p
                  className="text-center p-4
           bg-emerald-600 text-white
            text-[25px]  "
                >
                  Track Patients
                </p>
                <p className=" text-center text-[30px] font-thin mt-10 text-black ">
                  𝓈𝒾𝑔𝓃 𝒾𝓃 𝒶𝓈
                </p>
                <div className="flex flex-col  mt-16 gap-4">
                  <button
                    onClick={() => {
                      navigate("/businessHome");
                    }}
                    className="px-8 
            py-4 border-4 border-emerald-600 
            hover:bg-emerald-600 
            hover:text-white text-[20px] font-thin tracking-wider rounded-md text-black"
                  >
                    Admin
                  </button>
                  <button
                    onClick={() => {
                      navigate("/customerHome");
                    }}
                    className="px-8 py-4 border-4 border-emerald-600
                hover:bg-emerald-600 
            hover:text-white text-[20px] font-thin tracking-wider rounded-md text-black"
                  >
                    Doctors
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
