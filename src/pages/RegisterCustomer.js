// src/components/RegisterBusiness.js
import React, { useEffect, useState } from "react";
import "./RegisterBusiness.css"; // Import the custom CSS file
import { ethers } from "ethers";
import axios from "axios";
import { distance, motion } from "framer-motion";
import { mnemonicToEntropy } from "ethers/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { setCustomer, setBusiness } from "../reducer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";
import Abi from "./Abi";
import Loader from "./loader";
const RegisterCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    pwd: "",
    
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
  const getBusinessBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const add = await signer.getAddress();
    const tokenABI = Abi.tokenABI;
    const flipkartAddress = "0x37144a383A69d528A1176Ba237a0F860dA160141";

    // idhar add token contract address by taking it from the :
    // database itself !!
    const tokenContract = new ethers.Contract(
      "0x5eA776A5665dABbE9E3e1279F09F46ebc1929A00",
      tokenABI,
      provider
    );

    const tokenBalance = await tokenContract.balanceOf(flipkartAddress);
    console.log("Flip ", tokenBalance.toString());
  };
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

        // const contractAddress = "0x06441b211a8729B40FE15955F9A58b2F5829d022"; // Replace with your smart contract address
        // const contractABI = Abi.contractABI; // Replace with your smart contract ABI

        // const contract = new ethers.Contract(
        //   contractAddress,
        //   contractABI,
        //   signer
        // );

        // const add = await signer.getAddress();

        // const transaction = await contract.regCustomer(
        //   customerData.firstName,
        //   customerData.lastName,
        //   customerData.userEmail,
        //   add
        // );

        // const txResponse = await transaction.wait();
        // console.log("Transaction Response : ", txResponse.transactionHash);

        // const hash = txResponse.transactionHash;

        // // userWalletAddress:req.body.userWalletAddress,
        // //   firstName:req.body.firstName,
        // //   lastName:req.body.lastName,
        // //   userEmail:req.body.userEmail,

        // const pwd = customerData.pwd;
        // const userWalletAddress = add;
        const email = customerData.email;
        const name = customerData.name;
        const pwd = customerData.pwd;

        // Send transaction hash and other data to your backend
        const response = await axios.post(
          "http://localhost:3000/registerDoctor",
          {
            name,
            email,
            pwd,
          }
        );

        // Handle the response from the backend
        console.log(response.data); // This should contain user details and access token
        dispatch(setCustomer(response));
        toast.success("Doctor Registered Successfully");
        navigate("/customerHome");
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    // } else {
    //   await connectWallet();
    // }
  };

  const getAllBusiness = async () => {
    const response = await axios.get(
      "https://flipkartbackend-un9n.onrender.com/getListOfBusiness"
    );

    // Handle the response from the backend
    console.log(response.data); // This should contain user details and access token
  };

  return (
    <div>
      {isLoading === true ? (
        <Loader />
      ) : (
        <div className=" w-screen h-screen  flex flex-col items-center gap-12 font-ubuntu">
          <Navbar />
          <div className="w-[30%] drop-shadow-xl bg-white shadow-lg shadow-gray-800 rounded-lg flex flex-col gap-4">
            <h2 className="text-center bg-emerald-500 py-3 text-white text-[20px] rounded-t-lg">
              Register Doctor
            </h2>
            <form onSubmit={handleSubmit} className="p-12">
              <input
                type="text"
                id="fName"
                placeholder="Enter Doctor Name"
                value={customerData.name}
                onChange={(e) =>
                  setCustomerData({
                    ...customerData,
                    name: e.target.value,
                  })
                }
                required
              />

              <input
                type="email"
                id="customerEmail"
                placeholder="Enter Doctor Email"
                value={customerData.email}
                onChange={(e) =>
                  setCustomerData({
                    ...customerData,
                    email: e.target.value,
                  })
                }
                required
              />

              <input
                type="password"
                id="pwd"
                placeholder="Enter your Password"
                value={customerData.pwd}
                onChange={(e) =>
                  setCustomerData({ ...customerData, pwd: e.target.value })
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
                  Register
                </motion.button>
                <p className=" text-center p-1 ">
                  Already Registered ? <Link to="/loginCustomer">Sign In</Link>
                </p>
              </div>
            </form>
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
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default RegisterCustomer;
