import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GiWoodFrame } from "react-icons/gi";
import { AiOutlinePicture } from "react-icons/ai";
import { BsEmojiDizzy } from "react-icons/bs";
import { MdLocalFireDepartment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import {
  listChampions,
  listIcons,
  listRanks,
  listRunes,
  listSecrunes,
  listSums,
} from "../actions/championActions";
import Slider from "react-slick";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const Cartitems = useSelector((state) => state.CartFromStorage);
  const { cartInfo } = Cartitems;
  const [selectedChampion, setSelectedChampion] = useState(null);
  const storedData = cartInfo || {
    skin: {
      id: 56,
      name: "Akshan",
      border: false,
      image: "/images/skins/Akshan_1.jpg",
      champion: 4,
    },
    icon: {
      category: 0,
      id: 63,
      image: "/images/icons/profileicon6054.png",
      name: "img",
    },
    rune: {
      id: 8,
      name: "Conqueror",
      image: "/images/runes/Conqueror.png",
    },
    secRune: {
      id: 1,
      name: "Domination",
      image: "/images/sec_runes/7200_Domination.png",
    },
    sum1: {
      id: 1,
      image: "/images/summoners/flash.png",
      name: "flash",
    },
    sum2: {
      id: 4,
      image: "/images/summoners/prime_smite.png",
      name: "smite",
    },
    rank: {
      id: 10,
      name: "Challenger",
      image: "/images/ranks/Challenger_HvlOg5i.png",
    },
    name: "HighOnCokayn",
    skinName: "Spirit Blossom Kindred",
    size: "20x35 cm",
  };

  // Initialize state with the retrieved or default data
  const [selectedSkin, setSelectedSkin] = useState(storedData.skin);
  const [selectedIcon, setSelectedIcon] = useState(storedData.icon);
  const [selectedRune, setSelectedRune] = useState(storedData.rune);
  const [selectedSecRune, setSelectedSecRune] = useState(storedData.secRune);
  const [selectedSum1, setSelectedSum1] = useState(storedData.sum1);
  const [selectedSum2, setSelectedSum2] = useState(storedData.sum2);
  const [selectedRank, setSelectedRank] = useState(storedData.rank);
  const [selectedName, setSelectedName] = useState(storedData.name);
  const [selectedSkinName, setSelectedSkinName] = useState(storedData.skinName);
  const [selectedSize, setselectedSize] = useState(storedData.size);

  const handleChampionClick = (champion) => {
    setSelectedChampion(champion); // Set the clicked champion
  };

  const handleBackClick = () => {
    setSelectedChampion(null); // Reset to show all champions
  };

  const [selectedOption, setSelectedOption] = useState("rank");

  const dispatch = useDispatch();
  const championList = useSelector((state) => state.championList);
  const { error, loading, champions } = championList;
  const rankList = useSelector((state) => state.rankList);
  const { errorrank, loadingrank, ranks } = rankList;
  const sumsList = useSelector((state) => state.sumsList);
  const { errorsums, loadingsums, sums } = sumsList;
  const runeList = useSelector((state) => state.runeList);
  const { errorune, loadinrune, runes } = runeList;
  const secruneList = useSelector((state) => state.secruneList);
  const { errosecrune, loadinsecrune, secrunes } = secruneList;
  const iconList = useSelector((state) => state.iconList);
  const { erroricons, loadingicons, icons } = iconList;

  const paintingData = {
    skin: selectedSkin,
    icon: selectedIcon,
    rune: selectedRune,
    secRune: selectedSecRune,
    sum1: selectedSum1,
    sum2: selectedSum2,
    rank: selectedRank,
    name: selectedName,
    skinName: selectedSkinName,
    size: selectedSize,
  };
  const handleBuyNowClick = () => {
    // Save to local storage
    localStorage.setItem("paintingData", JSON.stringify(paintingData));

    // Open checkout page in a new tab
    window.open("/checkout", "_blank");
  };
  useEffect(() => {
    dispatch(listChampions());
    dispatch(listIcons());
    dispatch(listRanks());
    dispatch(listRunes());
    dispatch(listSecrunes());
    dispatch(listSums());
  }, [dispatch]);

  const optionData = {
    rank: {
      icon: <GiWoodFrame className="xl:text-4xl text-xl" />,
      label: "Rank",
    },
    skin: {
      icon: <AiOutlinePicture className="xl:text-4xl text-xl" />,
      label: "Skin",
    },
    icon: {
      icon: <BsEmojiDizzy className="xl:text-4xl text-xl" />,
      label: "Icon",
    },
    other: {
      icon: <MdLocalFireDepartment className="xl:text-4xl text-xl" />,
      label: "Other",
    },
  };

  return (
    <>
      <div className="bg-[url(assets/bg.jpg)] bg-cover bg-center min-h-[100vh] pt-[50px] ">
        <Header />
        <div className="xl:mx-[250px] xl:mt-[100px] flex flex-wrap items-center justify-around ml-[12px] px-10 ">
          <div className="xl:w-[200px] xl:h-[600px] flex xl:flex-col xl:justify-around justify-between gap-3 xl:order-1 order-2 mb-7">
            {Object.keys(optionData).map((key) => (
              <div
                key={key}
                className="relative flex items-center"
                onClick={() => setSelectedOption(key)}
              >
                <div
                  className={`group flex items-center bg-[#EBD3F8] text-black rounded-full px-[10px] xl:px-0 transition-all duration-300 overflow-hidden gap-3 ${
                    selectedOption === key
                      ? "xl:w-[150px] w-full"
                      : "xl:w-[60px] w-[40px]"
                  } xl:h-[60px] h-[40px] active:scale-105`}
                >
                  <div className="flex items-center justify-center xl:w-[60px] xl:h-[60px] shrink-0">
                    {optionData[key].icon}
                  </div>

                  <span
                    className={`xl:ml-4  opacity-0 ${
                      selectedOption === key
                        ? "opacity-100"
                        : "group-hover:opacity-100"
                    } transition-all duration-300 whitespace-nowrap`}
                  >
                    {optionData[key].label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex items-center justify-center h-[70vh] w-[35vh] xl:order-2 order-1 ">
            {/* Layered Images */}
            <img
              src={selectedRank ? `${selectedRank.image}` : ""}
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
                  selectedSkin
                    ? `${selectedSkin.image}`
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
              src={selectedIcon ? `${selectedIcon.image}` : ""}
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
              src={selectedRune ? `${selectedRune.image}` : ""}
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
                selectedSecRune
                  ? `${selectedSecRune.image}`
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
              src={selectedSum1 ? `${selectedSum1.image}` : ""}
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
              src={selectedSum2 ? `${selectedSum2.image}` : ""}
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
                bottom: "27%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {selectedSkinName}
            </h1>

            <h1
              className="absolute text-[#bf930c] xl:text-[1vw]"
              style={{
                bottom: "11%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {selectedName}
            </h1>
          </div>

          <div className="xl:w-[425px] w-[290px] max-w-[300px] xl:max-w-[425px] flex flex-col justify-between xl:order-3 order-3 gap-5">
            <div className="bg-[#EBD3F8] xl:w-[425px] h-[125px] flex flex-col items-center justify-center gap-3 py-3 rounded-2xl">
              <div className="xl:w-[350px] h-[50px] flex items-center gap-6 px-3">
                <div className="text-black font-bold text-[13px] xl:text-base xl:text-nowrap xl:w-[120px]">
                  Summoner Name
                </div>
                <input
                  type="text"
                  className="w-[50%] py-1.5 text-base text-center  bg-transparent bg-white rounded-2xl border-black text-black focus:outline-none border-2"
                  value={selectedName}
                  onChange={(e) => setSelectedName(e.target.value)}
                />
              </div>

              <div className="xl:w-[350px] h-[50px] flex items-center justify-around gap-6 px-3">
                <div className="text-black font-bold text-[13px] xl:text-base xl:w-120px]">
                  Skin Name
                </div>
                <input
                  type="text"
                  className="w-[50%] py-1.5 text-base text-center  bg-transparent bg-white rounded-2xl border-black text-black focus:outline-none border-2"
                  value={selectedSkinName}
                  onChange={(e) => setSelectedSkinName(e.target.value)}
                />
              </div>
            </div>

            {/* Render content based on the selected option */}
            {selectedOption === "rank" && (
              <div className="bg-[#EBD3F8] rounded-2xl">
                <Slider {...settings} className="slider-container mx-10 my-10">
                  {ranks &&
                    ranks.map((i, index) => (
                      <div
                        className="size-[400px] flex flex-col items-center justify-center rounded-2xl"
                        key={index}
                        onClick={() => setSelectedRank(i)}
                      >
                        <div
                          className="bg-contain bg-center size-full bg-no-repeat rounded-t-2xl"
                          style={{
                            backgroundImage: `url(${i.image})`,
                          }}
                        ></div>
                      </div>
                    ))}
                </Slider>
              </div>
            )}

            {selectedOption === "skin" && (
              <div
                className="bg-[#EBD3F8] rounded-2xl h-[400px] p-5 flex flex-wrap gap-3 justify-center items-center overflow-auto
        [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300
       dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
              >
                {selectedChampion ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex  items-center justify-between w-full  gap-10">
                      <button
                        onClick={handleBackClick}
                        className="text-black px-3 py-1 rounded-lg"
                      >
                        <IoMdArrowRoundBack />
                      </button>
                      <h2 className="text-black text-lg">
                        {selectedChampion.name}'s Skins
                      </h2>
                      <div className=""></div>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center items-center">
                      {selectedChampion.skins.map((skin, index) => (
                        <div
                          className="xl:h-[250px] xl:w-[150px] w-[100px] h-[200px] bg-white flex flex-col items-center justify-center rounded-2xl"
                          key={index}
                          onClick={() => setSelectedSkin(skin)}
                        >
                          <div
                            className="bg-cover bg-center size-full bg-no-repeat rounded-2xl"
                            style={{
                              backgroundImage: `url(${skin.image})`,
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-black text-xl font-bold">
                      Select ur champion
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center items-center">
                      {champions &&
                        champions.map((champion, index) => (
                          <div
                            className="xl:size-[100px] size-[75px] bg-white flex flex-col items-center justify-center rounded-2xl cursor-pointer"
                            key={index}
                            onClick={() => handleChampionClick(champion)} // Pass the champion to the handler
                          >
                            <div
                              className="bg-cover bg-center size-full bg-no-repeat rounded-2xl"
                              style={{
                                backgroundImage: `url(${champion.image})`,
                              }}
                            ></div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedOption === "other" && (
              <div className="bg-[#EBD3F8] rounded-2xl pb-6 flex flex-col px-5 ">
                <div className="text-black pt-5 text-center pb-5 font-bold text-xl">
                  {" "}
                  Choose your runes and spells
                </div>
                <div className="flex flex-col justify-between items-center gap-3">
                  <div
                    className="xl:w-[70%] w-[90%] p-2 bg-white flex overflow-y-hidden gap-3 rounded-2xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300
         dark:[&::-webkit-scrollbar-track]:bg-purple-300 dark:[&::-webkit-scrollbar-thumb]:bg-purple-600"
                  >
                    {runes &&
                      runes.map((rune, index) => (
                        <div
                          className="size-[35px] bg-white flex flex-col items-center justify-center rounded-2xl"
                          key={index}
                          onClick={() => setSelectedRune(rune)}
                        >
                          <div
                            className="bg-cover bg-center size-[35px] bg-no-repeat "
                            style={{
                              backgroundImage: `url(${rune.image})`,
                            }}
                          ></div>
                        </div>
                      ))}
                  </div>

                  <div
                    className="xl:w-[70%] w-[90%] p-2 bg-white flex overflow-y-hidden gap-3 rounded-2xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300
    dark:[&::-webkit-scrollbar-track]:bg-purple-300 dark:[&::-webkit-scrollbar-thumb]:bg-purple-600"
                  >
                    {secrunes &&
                      secrunes.map((secrune, index) => (
                        <div
                          className="size-[35px]  bg-white flex flex-col items-center justify-center rounded-2xl"
                          key={index}
                          onClick={() => setSelectedSecRune(secrune)}
                        >
                          <div
                            className="bg-cover bg-center size-[35px] bg-no-repeat "
                            style={{
                              backgroundImage: `url(${secrune.image})`,
                            }}
                          ></div>
                        </div>
                      ))}
                  </div>

                  <div
                    className="xl:w-[70%] w-[90%] p-2 bg-white flex overflow-y-hidden gap-3 rounded-2xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300
    dark:[&::-webkit-scrollbar-track]:bg-purple-300 dark:[&::-webkit-scrollbar-thumb]:bg-purple-600"
                  >
                    {sums &&
                      sums.map((sums, index) => (
                        <div
                          className="size-[35px] bg-white flex flex-col items-center justify-center rounded-2xl"
                          key={index}
                          onClick={() => setSelectedSum1(sums)}
                        >
                          <div
                            className="bg-cover bg-center size-[35px] bg-no-repeat "
                            style={{
                              backgroundImage: `url(${sums.image})`,
                            }}
                          ></div>
                        </div>
                      ))}
                  </div>

                  <div
                    className="xl:w-[70%] w-[90%] p-2 bg-white flex overflow-y-hidden gap-3 rounded-2xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300
    dark:[&::-webkit-scrollbar-track]:bg-purple-300 dark:[&::-webkit-scrollbar-thumb]:bg-purple-600"
                  >
                    {sums &&
                      sums.map((sums, index) => (
                        <div
                          className="size-[35px] bg-white flex flex-col items-center justify-center rounded-2xl"
                          key={index}
                          onClick={() => setSelectedSum2(sums)}
                        >
                          <div
                            className="bg-cover bg-center size-[35px] bg-no-repeat "
                            style={{
                              backgroundImage: `url(${sums.image})`,
                            }}
                          ></div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
            {selectedOption === "icon" && (
              <div
                className="bg-[#EBD3F8] rounded-2xl h-[400px] p-5 flex flex-wrap gap-3 justify-center items-center overflow-auto [&::-webkit-scrollbar]:w-2
[&::-webkit-scrollbar-track]:rounded-full
[&::-webkit-scrollbar-track]:bg-gray-100
[&::-webkit-scrollbar-thumb]:rounded-full
[&::-webkit-scrollbar-thumb]:bg-gray-300
dark:[&::-webkit-scrollbar-track]:bg-purple-300
dark:[&::-webkit-scrollbar-thumb]:bg-purple-700"
              >
                {icons &&
                  icons.map((icon, index) => (
                    <div
                      className="xl:size-[100px] size-[75px] bg-white flex flex-col items-center justify-center rounded-2xl"
                      key={index}
                      onClick={() => setSelectedIcon(icon)}
                    >
                      <div
                        className="bg-cover bg-center size-full bg-no-repeat rounded-2xl"
                        style={{
                          backgroundImage: `url(${icon.image})`,
                        }}
                      ></div>
                    </div>
                  ))}
              </div>
            )}
            <div className="bg-[#EBD3F8] mb-20 h-[75px] rounded-2xl flex items-center xl:justify-between justify-center px-10">
              <div className="">
                <label htmlFor="size-select" className="mr-2">
                  Select Size:
                </label>
                <select
                  id="size-select"
                  name="size"
                  className="p-2 rounded-2xl"
                  value={selectedSize}
                  onChange={(event) => setselectedSize(event.target.value)}
                >
                  <option value="20x35">20x35 cm</option>
                  <option value="16x28">16x28 cm</option>
                </select>
              </div>

              <button
                className="bg-[#2E073F] text-white rounded-2xl xl:p-3 px-6"
                onClick={handleBuyNowClick}
              >
                BUY NOW!
              </button>
            </div>
          </div>
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
      </div>
      <Footer />
    </>
  );
}

export default Home;
