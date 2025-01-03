import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaClipboardList, FaWhatsapp } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { LuInfo } from "react-icons/lu";
import { BiSolidBank } from "react-icons/bi";
import { FaImage } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { GiPaintRoller } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { FiGift } from "react-icons/fi";
import { RiEmojiStickerFill } from "react-icons/ri";
import { GiKeyCard } from "react-icons/gi";
import { FaBox } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";
import { CreateOrder } from "../actions/championActions";
import { ORDER_CREATE_RESET } from "../constants/championConstants";
import Loader from "../components/Loader";

export default function Checkout() {
  const Cartitems = useSelector((state) => state.CartFromStorage);
  const { error, loading, cartInfo } = Cartitems;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("edinar");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const oorder = useSelector((state) => state.order);
  const { loading:loadingorder,success, orderInfo } = oorder;
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    city: "",
    shippingAddress: "",
    zipCode: "",
    paymentMethod: selectedPaymentMethod,
    paymentProof: null,
    price: cartInfo && cartInfo.size === "20x35 cm" ? "89DT" : "69DT", // Add price with logic here
    cartInfo,
  });
  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };
  const redirect = location.search ? location.search.split("=")[1] : "/login";
  useEffect(() => {
    if (!userInfo) {
      navigate(redirect);
    }

    if (success) {
      dispatch({ type: ORDER_CREATE_RESET });
      navigate("/profile", {
        state: { message: "Success" },
      });
    }
  }, [navigate, cartInfo, userInfo, redirect, success, dispatch]);
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCartData = JSON.parse(localStorage.getItem("cartData"));
      setCartData(updatedCartData);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };
console.log(formData)
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
    dispatch(CreateOrder(formData));
  };
  if(loading||loadingorder){
    return <Loader/>
  }
  return (
    <>
      <div className="bg-[url(assets/bg.jpg)] bg-cover bg-center min-h-[100vh] pt-[50px] pb-20">
        <Header />
        {!cartInfo ? (
          <div className="bg-[#EBD3F8] rounded-2xl p-[40px] xl:px-[200px] xl:mx-[400px] mx-[20px] my-[100px] flex flex-col items-top justify-center gap-y-5">
            <div className="flex justify-center items-center gap-2">
              <IoBagCheckOutline className="text-[50px]" />
              <div className=" font-bold xl:text-[50px] text-[30px]">
                Checkout
              </div>
            </div>

            <div className="flex items-center gap-2 justify-center">
              <LuInfo className="xl:text-[30px]" />
              <div className="xl:text-[30px]">You don't have any Items yet</div>
            </div>
            <div className="flex items-center justify-center text-center text-xs xl:text-sm">
              Do you need any kind of help? Please Contact us.
            </div>
          </div>
        ) : (
          <div className="bg-[#EBD3F8] rounded-2xl p-[40px]  xl:px-[200px] xl:mx-[400px] mx-[20px] mt-[100px] flex flex-col items-top justify-center gap-y-5">
            <div className="flex justify-center items-center gap-2">
              <IoBagCheckOutline className="text-[50px]" />
              <div className=" font-bold xl:text-[50px] text-[30px]">
                Checkout
              </div>
            </div>

            <hr className="border-black mx-40" />

            <div className="flex items-center gap-2 justify-center">
              <GiPaintRoller className="xl:text-[30px]" />
              <div className="xl:text-[30px]">Preview</div>
            </div>
            <div className="bg-[#EBD3F8] rounded-2xl xl:p-5 p-1 shadow-purple-950 shadow-sm xl:flex items-start justify-center ">
              <div className="relative flex items-center justify-center h-[70vh] w-[35vh] ">
                {/* Layered Images */}
                <img
                  src={cartInfo.rank ? `${cartInfo.rank.image}` : ""}
                  className="absolute z-10 h-[85%] "
                  style={{
                    transform: "translate(-50%, -50%)",
                    top: "49%",
                    left: "50%",
                  }}
                  alt="rank"
                />
                <div className="absolute h-[81%]">
                  <img
                    src={
                      cartInfo.skin
                        ? `${cartInfo.skin.image}`
                        : "src/assets/jhinloadscreen_5.jpg"
                    }
                    className="h-full object-cover"
                    alt="skin"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-black"
                    style={{ height: "60%" }}
                  />
                </div>

                <img
                  src="src/assets/lines.png"
                  alt=""
                  className="absolute xl:w-[250px] w-[200px] "
                  style={{
                    bottom: "20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />

                <img
                  src="src/assets/layer 1.png"
                  className="absolute xl:size-[60px] size-[55px]"
                  style={{
                    bottom: "16.1%",
                    left: "50%",

                    transform: "translateX(-50%)",
                  }}
                  alt=""
                />

                <img
                  src={cartInfo.icon ? `${cartInfo.icon.image}` : ""}
                  className="absolute rounded-full xl:size-[55px] size-[50px]"
                  style={{
                    bottom: "16.5%",
                    left: "50%",

                    transform: "translateX(-50%)",
                  }}
                  alt=""
                />

                <img
                  src="src/assets/layer 1.png"
                  className="absolute xl:size-[45px] size-[40px]"
                  style={{
                    bottom: "16%",
                    left: "10%",
                  }}
                  alt=""
                />
                <img
                  src={cartInfo.rune ? `${cartInfo.rune.image}` : ""}
                  className="absolute xl:size-[45px] size-[40px]"
                  style={{
                    bottom: "16%",
                    left: "10%",
                  }}
                  alt="rune"
                />

                <img
                  src="src/assets/layer 1.png"
                  className="absolute xl:size-[30px] size-[25px]"
                  style={{
                    bottom: "16%",
                    left: "21%",
                  }}
                  alt=""
                />
                <img
                  src={
                    cartInfo.secRune
                      ? `${cartInfo.secRune.image}`
                      : "src/assets/Domination.webp"
                  }
                  className="absolute xl:size-[20px] size-[15px]"
                  style={{
                    bottom: "17%",
                    left: "23%",
                  }}
                  alt="secrune"
                />

                <img
                  src="src/assets/sums.png"
                  className="absolute xl:size-[35px] size-[30px]"
                  style={{
                    bottom: "17%",
                    right: "22%",
                  }}
                  alt=""
                />
                <img
                  src={cartInfo.sum1 ? `${cartInfo.sum1.image}` : ""}
                  className="absolute xl:size-[27px] size-[23px]"
                  style={{
                    bottom: "17.5%",
                    right: "23.3%",
                  }}
                  alt=""
                />

                <img
                  src="src/assets/sums.png"
                  className="absolute xl:size-[35px] size-[30px]"
                  style={{
                    bottom: "17%",
                    right: "10%",
                  }}
                  alt=""
                />
                <img
                  src={cartInfo.sum2 ? `${cartInfo.sum2.image}` : ""}
                  className="absolute xl:size-[27px] size-[23px]"
                  style={{
                    bottom: "17.5%",
                    right: "11.3%",
                  }}
                  alt=""
                />

                <h1
                  className="absolute text-white xl:text-[0.8vw] text-nowrap text-center"
                  style={{
                    bottom: "25%",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  {cartInfo.skinName}
                </h1>

                <h1
                  className="absolute text-[#bf930c] xl:text-[1vw]"
                  style={{
                    bottom: "11%",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  {cartInfo.name}
                </h1>
              </div>
              <div className="m-auto">
                <div className="text-xl font-semibold">
                  With this you will have:
                </div>
                <div className="flex items-center gap-1">
                  <FiGift />
                  <div className="">Additional Gifts:</div>
                </div>
                <div className="flex items-center gap-1">
                  <RiEmojiStickerFill />
                  <div className="">6 Random stickers</div>
                </div>
                <div className="flex items-center gap-1">
                  <GiKeyCard />
                  <div className="">2 Keychains!</div>
                </div>
                <div className="flex items-center gap-1">
                  <FaBox />
                  <div className="">Wooden Box</div>
                </div>
                <div className="flex items-center gap-1 py-5 font-bold">
                  <FaMoneyBillWave />
                  <div className="flex gap-1 items-center">
                    <div className="text-nowrap">
                      Price:{" "}
                      {cartInfo && cartInfo.size === "20x35 cm"
                        ? "89DT"
                        : "69DT"}{" "}
                    </div>
                    <div className="font-normal text-wrap xl:text-sm text-xs">
                      WITH FREE DELIVERY!
                    </div>
                  </div>
                </div>
              </div>
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
                      <label
                        htmlFor="phoneNumber"
                        className="block text-gray-700"
                      >
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
                          Please ensure you have a WhatsApp account so we can
                          send updates about your order.
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
                        <div className="text-center border-2 border-black my-3 w-full rounded-2xl">
                          <div className="font-bold">E-dinar</div>
                          <div className="flex items-center justify-center gap-1">
                            <FaPhone className="size-4" />
                            <div className="">53034007</div>
                          </div>

                          <div className="">account</div>
                        </div>
                      </div>
                    )}

                    {/* Payment Proof Upload Section */}

                    <div className="">
                      <label
                        htmlFor="paymentProof"
                        className="block text-gray-700"
                      >
                        <div className="border-2 border-dashed border-[#2E073F] rounded-lg flex flex-col items-center justify-center p-3 cursor-pointer">
                          {formData.paymentProof ? (
                            // Display the uploaded image preview
                            <div className="flex flex-col items-center">
                              <img
                                src={URL.createObjectURL(formData.paymentProof)}
                                alt="Uploaded Proof"
                                className="w-24 h-24 object-cover rounded-md"
                              />
                              <div className="text-green-600 font-medium mt-2">
                                Loaded
                              </div>
                            </div>
                          ) : (
                            // Show the upload icon and instructions
                            <>
                              <FaImage className="text-[#2E073F] w-12 h-12" />
                              <div className="text-center text-gray-700">
                                Click here to upload your proof of payment
                              </div>
                              <div className="text-xs text-gray-500">
                                ('PNG, JPEG, JPG')
                              </div>
                            </>
                          )}
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
                    <div className="flex items-center gap-1 py-3 font-bold">
                      <FaMoneyBillWave />
                      <div className="flex gap-1">
                        Final Price:{" "}
                        {cartInfo.size === "20x35 cm" ? "89DT" : "69DT"}{" "}
                        <div className="font-normal">WITH FREE DELIVERY!</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    disabled={
                      !formData.fullName ||
                      !formData.phoneNumber ||
                      !formData.city ||
                      !formData.shippingAddress ||
                      !formData.zipCode ||
                      !formData.paymentProof
                    }
                    className={`rounded-2xl p-2 my-3 w-[50%] ${
                      !formData.fullName ||
                      !formData.phoneNumber ||
                      !formData.city ||
                      !formData.shippingAddress ||
                      !formData.zipCode ||
                      !formData.paymentProof
                        ? "bg-[#5c565f] cursor-not-allowed"
                        : "bg-[#2E073F] text-white"
                    }`}
                  >
                    BUY NOW!
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div
          className="fixed right-[20px] xl:right-[150px] z-50"
          style={{ bottom: "70px", zIndex: 18 }}
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://wa.me/21693964524?text=I%20am%20interested%20in%20buying%20a%20league%20frame"
            className=""
          >
            <FaWhatsapp className="text=white size-[70px] bg-[#2E073F] xl:bg-[#D6BEE4] text-white xl:text-black p-3 rounded-2xl" />
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
