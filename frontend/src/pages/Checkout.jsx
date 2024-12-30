import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { LuInfo } from "react-icons/lu";
import { BiSolidBank } from "react-icons/bi";
import { FaImage } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";

export default function Checkout() {
  const [paintingData, setPaintingData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    city: "",
    shippingAddress: "",
    zipCode: "",
    paymentMethod: "creditCard", // Default to Credit Card
    creditCardDetails: "",
    edinarAccount: "",
    paymentProof: null,
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("creditCard");

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };
  useEffect(() => {
    // Retrieve the painting data from localStorage
    const data = localStorage.getItem("paintingData");
    if (data) {
      setPaintingData(JSON.parse(data));
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handlePaymentMethodChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, paymentMethod: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add further logic for form validation and submission
  };
  return (
    <div className="bg-[url(assets/bg.jpg)] bg-cover bg-center min-h-[100vh] pt-[50px] ">
      <Header />
      <div className="bg-[#EBD3F8] rounded-2xl p-[40px] xl:px-[200px] xl:mx-[400px] mx-[20px] my-[100px] flex flex-col items-top justify-center gap-y-5">
        <div className="flex justify-center items-center gap-2">
          <IoBagCheckOutline className="text-[50px]" />
          <div className=" font-bold xl:text-[50px] text-[30px]">Checkout</div>
        </div>

        <div className="flex items-center gap-2 justify-center">
          <LuInfo className="xl:text-[30px]" />
          <div className="xl:text-[30px]">You don't have any Items yet</div>
        </div>
        <div className="flex items-center justify-center text-center text-xs xl:text-sm">
          Do you need any kind of help? Please Contact us.
        </div>
      </div>

      <div className="bg-[#EBD3F8] rounded-2xl p-[40px] xl:px-[200px] xl:mx-[400px] mx-[20px]  flex flex-col items-top justify-center gap-y-5">
        <div className="flex justify-center items-center gap-2">
          <IoBagCheckOutline className="text-[50px]" />
          <div className=" font-bold xl:text-[50px] text-[30px]">Checkout</div>
        </div>
        <hr className="border-black mx-40" />
        <div className="flex items-center gap-2 justify-center">
          <LuInfo className="xl:text-[30px]" />
          <div className="xl:text-[30px]">Shipping info</div>
        </div>
        <div className="">
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-[#EBD3F8] rounded-2xl shadow-purple-950 shadow-sm "
          >
            <div className="flex items-center justify-center gap-2 xl:gap-10 flex-wrap">
              <div className="xl:max-w-[40%]">
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="p-2 border rounded-lg w-full"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="p-2 border rounded-lg w-full"
                    required
                  />
                  <div className="py-1 flex gap-1 items-center">
                    <LuInfo className="" />
                    <div className="text-xs text-wrap">
                      Please ensure you have a WhatsApp account so we can send
                      the shipping details.
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="city" className="block text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="p-2 border rounded-lg w-full"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="shippingAddress"
                    className="block text-gray-700"
                  >
                    Shipping Address
                  </label>
                  <input
                    type="text"
                    id="shippingAddress"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    className="p-2 border rounded-lg w-full"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="zipCode" className="block text-gray-700">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="p-2 border rounded-lg w-full"
                    required
                  />
                </div>
              </div>

              <div className="xl:max-w-[50%] ">
                {/* Payment Method Selection */}
                <h2 className="xl:text-xl mb-4">Select Payment Method</h2>

                <div className="flex space-x-4 mb-4">
                  <div
                    className={`cursor-pointer border rounded-lg p-4 flex items-center justify-center xl:w-32 xl:h-32 size-24 ${
                      selectedPaymentMethod === "creditCard"
                        ? "border-black bg-[#2E073F] text-white"
                        : "border-black text-black"
                    }`}
                    onClick={() => handlePaymentMethodSelect("creditCard")}
                  >
                    <BiSolidBank className="xl:size-16 size-10" />
                  </div>

                  <div
                    className={`cursor-pointer border rounded-lg p-4 flex items-center justify-center xl:w-32 xl:h-32 size-24 ${
                      selectedPaymentMethod === "edinar"
                        ? "border-black bg-[#2E073F]"
                        : "border-black"
                    }`}
                    onClick={() => handlePaymentMethodSelect("edinar")}
                  >
                    <img
                      src="src/assets/edinar.png"
                      alt="Edinar"
                      className=""
                    />
                  </div>
                </div>

                {/* Account Details Section */}
                {selectedPaymentMethod === "creditCard" && (
                  <div className="mb-4 flex flex-col items-center justify-center">
                    <div className="text-center border-2 border-black my-3 w-full rounded-2xl">
                      <div className="font-bold">RIB</div>
                      <div className="flex items-center justify-center gap-1">
                        <BiSolidBank className="size-4" />
                        <div className="">05013000084502110018</div>
                      </div>

                      <div className="">account</div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === "edinar" && (
                  <div className="mb-4 flex flex-col items-center justify-center">
                    <div className="">E-dinar Details</div>
                    <div className="text-center border-2 border-black my-3 w-full rounded-2xl">
                      <div className="font-bold">RIB</div>
                      <div className="flex items-center justify-center gap-1">
                        <FaPhone className="size-4" />
                        <div className="">53034007</div>
                      </div>

                      <div className="">account</div>
                    </div>
                  </div>
                )}

                {/* Payment Proof Upload Section */}

                <div className="mb-4">
                  <label
                    htmlFor="paymentProof"
                    className="block text-gray-700 mb-2"
                  >
                    <div className="border-2 border-dashed border-[#2E073F] rounded-lg flex flex-col items-center justify-center p-3 my-3 cursor-pointer">
                      <FaImage className="text-[#2E073F] w-12 h-12 mb-2" />
                      <div className="text-center text-gray-700">
                        Click here to upload your proof of payment
                      </div>
                      <div className="text-xs text-gray-500">
                        ('PNG, JPEG, JPG')
                      </div>
                    </div>
                  </label>

                  <input
                    type="file"
                    id="paymentProof"
                    name="paymentProof"
                    onChange={handleInputChange}
                    className="hidden"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-[#2E073F]  text-white rounded-2xl p-2 my-3 w-[50%]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
