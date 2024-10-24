// src/components/RegisterBusiness.js
import React, { useEffect, useState } from "react";
import "./RegisterBusiness.css"; // Import the custom CSS file
import { ethers } from "ethers";
import axios from "axios";
import { motion } from "framer-motion";
import { mnemonicToEntropy } from "ethers/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { setCustomer, setBusiness } from "../reducer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";
import Abi from "./Abi";
const LoginCustomer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState({
    pwd: "",
    email: "",
    // Add more fields as needed
  });

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

  // "0x1c9A0af0b1a14DaD32D93e9593740407Ac691BAe"
  // const getBusinessBalance = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   // Prompt user for account connections
  //   await provider.send("eth_requestAccounts", []);
  //   const signer = provider.getSigner();
  //   const add = await signer.getAddress();
  //   const tokenABI = Abi.tokenABI;
  //   const flipkartAddress = "0x37144a383A69d528A1176Ba237a0F860dA160141";

  //   // idhar add token contract address by taking it from the :
  //   // database itself !!
  //   const tokenContract = new ethers.Contract(
  //     "0x5eA776A5665dABbE9E3e1279F09F46ebc1929A00",
  //     tokenABI,
  //     provider
  //   );

  //   const tokenBalance = await tokenContract.balanceOf(flipkartAddress);
  //   console.log("Flip ", tokenBalance.toString());
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // await connectWallet();
    // if (window.ethereum) {
      try {
        // Request account access if needed
        // await window.ethereum.enable();
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // // Prompt user for account connections
        // await provider.send("eth_requestAccounts", []);
        // const signer = provider.getSigner();

        // const add = await signer.getAddress();

        const pwd = customerData.pwd;
        const email = customerData.email;

        // Send transaction hash and other data to your backend
        const response = await axios.post(
          "http://localhost:3000/loginDoctor",
          {
            email : email,
            pwd: pwd,
          }
        );

        // Handle the response from the backend
        console.log(response.data); // This should contain user details and access token
        dispatch(setCustomer(response.data));
        navigate("/customerHome");
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    } 
    // else {
    //   await connectWallet();
    // }
  

  // const getAllBusiness = async () => {
  //   const response = await axios.get(
  //     "https://flipkartbackend-un9n.onrender.com/getListOfBusiness"
  //   );

  //   // Handle the response from the backend
  //   console.log(response.data); // This should contain user details and access token
  // };

  return (
    <div className="w-screen h-screen  flex flex-col items-center gap-16">
      <Navbar/>
      <div className="w-[30%] drop-shadow-xl bg-white shadow-lg shadow-gray-400 rounded-lg flex flex-col gap-4">
        <h2 className="text-center bg-emerald-500 py-3 text-white text-[20px] rounded-t-lg">
          Welcome Doctor 
        </h2>
        <form onSubmit={handleSubmit} className="p-12">
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={customerData.email}
            onChange={(e) =>
              setCustomerData({ ...customerData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            id="pwd"
            placeholder="Password"
            value={customerData.pwd}
            onChange={(e) =>
              setCustomerData({ ...customerData, pwd: e.target.value })
            }
            required
          />

          
          <div className="flex flex-col mt-6  gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="px-1 py-3 bg-emerald-500 rounded-md text-white text-[18px]  shadow-md shadow-blue-400"
            >
              LogIn
            </motion.button>
          </div>
        </form>
      </div>
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
};

export default LoginCustomer;
