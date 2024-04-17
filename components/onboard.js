import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useEffect, useRef, useState } from "react";

function Onboard({ setShowOnboard }) {
  const [isLastSlide, setIsLastSlide] = useState(false);
  const splideRef = useRef();

  const handleNavigation = () => {
    if (splideRef.current) {
      const splide = splideRef.current.splide;
      setIsLastSlide(splide.index === splide.length - 1);
    }
  };

  useEffect(() => {
    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";
    const splideInstance = splideRef.current?.splide;
    if (splideInstance) {
      splideInstance.on("mounted move", handleNavigation);
      return () => {
        splideInstance.off("mounted move", handleNavigation);
        // Re-enable scrolling when component unmounts
        document.body.style.overflow = "unset";
      };
    } else {
      // Ensure scrolling is enabled if component unmounts before splideInstance is set
      return () => (document.body.style.overflow = "unset");
    }
  }, []);
  const handleArrowButtonClick = () => {
    if (isLastSlide) {
      setShowOnboard(false);
    } else {
      splideRef.current.splide.go(">");
    }
  };
  const handleCheckboxChange = (event) => {
    const checkbox = event.target;
    const svgElement = checkbox.nextElementSibling.firstChild; // assuming the structure remains constant
    if (checkbox.checked) {
      svgElement.classList.remove("hidden");
      setShowOnboard(false);
    } else {
      svgElement.classList.add("hidden");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-8 overflow-hidden bg-white ">
      <style>
        {`
          .splide__pagination .splide__pagination__page {
            background-color: #888; /* Gray dots */
          }
          .splide__pagination .splide__pagination__page.is-active {
            background-color: #2196f3; /* Blue active dot */
          }
        `}
      </style>

      <button
        onClick={handleArrowButtonClick}
        style={{ touchAction: "manipulation" }} // Prevents double-tap zoom on mobile
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-50 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <span class="material-icons">
          {isLastSlide ? "done" : "chevron_right"}
        </span>

        <span class="sr-only">Scroll right</span>
      </button>

      <Splide
        options={{ arrows: false }}
        aria-label="React Splide Example"
        ref={splideRef}
      >
        <SplideSlide className="w-full h-screen flex items-center justify-around flex-col bg-blue-500">
          <div className="max-w-md px-12 mt-20">
            <div className="prose px-8">
              <h2 className="uppercase text-sm tracking-widest text-gray-100 leading-6 text-center ">
                rudeCAPTCHA
              </h2>
              <h2 className="text-white  ">Show 🖕 to verify yourself</h2>
              <h4 className="text-white  ">
                Please allow access to your webcam
              </h4>
            </div>
          </div>
          <div className=" flex w-1/3 justify-evenly items-center ">
            <button
              className="py-4 px-6  font-xl tracking-wide  text-blue-500 border border-1 border-white mt-12 bg-white rounded-lg"
              onClick={() => splideRef.current.splide.go(">")}
            >
              What?
            </button>
            <button
              className="py-4 px-6 font-xl font-semibold tracking-wide  bg-blue-500 border border-1 border-white mt-12 text-white rounded-lg"
              onClick={() => setShowOnboard(false)}
            >
              Start
            </button>
          </div>
        </SplideSlide>
        <SplideSlide className="w-full h-screen flex items-center justify-center flex-col bg-white">
          <div className="max-w-md px-12">
            <div className="prose ">
              <h2 className="uppercase text-sm tracking-widest leading-6 ">
                WHAT IS rudeCAPTCHA?
              </h2>
              <h2>Sick of proving to a robot you are human?</h2>
              <img
                src="/rudecaptcha.jpg"
                // className="max-w-full h-28 mx-auto"
                className="w-1/2 mx-auto"
                alt="RudeCaptcha example"
              />
              <h2 className="text-center">Tell CAPTCHA to Fuck Off</h2>
            </div>
            <div className=" flex w-full justify-evenly items-center ">
              <button
                className="py-4 px-6  font-xl tracking-wide  text-blue-500 border border-1 border-blue-500 mt-12 bg-white rounded-lg"
                onClick={() => splideRef.current.splide.go(">")}
              >
                Why?
              </button>
              <button
                className="py-4 px-6 font-xl font-semibold tracking-wide  bg-blue-500 border border-1 border-white mt-12 text-white rounded-lg"
                onClick={() => setShowOnboard(false)}
              >
                Start
              </button>
            </div>
          </div>
        </SplideSlide>

        <SplideSlide className="w-full h-screen flex flex-col items-center justify-center bg-white">
          <div className="prose max-w-md px-12">
            <h2 className="uppercase text-sm tracking-widest leading-6 ">
              WHY?
            </h2>
            <p>AI can defeat traditional CAPTCHA.</p>
            <p>What it can&#39;t do is be offensive.</p>
            <p>
              Stop performing unpaid labor for a globalized megacorp training an
              AI that will replace you.
            </p>
            <p>
              <span class="material-icons">public</span>
              <span className="font-semibold">ADDED BONUS:</span> Break down
              language barriers:
            </p>
            <p>Learn to insult people from all over the world</p>
          </div>

          <div className=" flex  justify-evenly items-center w-1/3 ">
            <button
              className="py-4 px-6  font-xl tracking-wide  text-blue-500 border border-1 border-blue-500 mt-12 bg-white rounded-lg"
              onClick={() => splideRef.current.splide.go(">")}
            >
              How?
            </button>
            <button
              className="py-4 px-6 font-xl font-semibold tracking-wide  bg-blue-500 border border-1 border-white mt-12 text-white rounded-lg"
              onClick={() => setShowOnboard(false)}
            >
              Start
            </button>
          </div>
        </SplideSlide>
        <SplideSlide className="w-full h-screen flex flex-col items-center justify-center bg-white">
          <div className="prose max-w-md px-12">
            <h2 className="uppercase text-sm tracking-widest leading-6 ">
              How it works
            </h2>
            <p>Make the gesture in the top left corner</p>
            <img
              src="/makeGesture.jpeg"
              // className="max-w-full h-28 mx-auto"
              className="w-full mx-auto"
              alt="how it works"
            />
            <p>Make sure the webcam can detect your hands</p>
          </div>

          <button
            className="p-4 bg-blue-500 mt-12 text-white rounded-lg"
            onClick={() => setShowOnboard(false)}
          >
            Got it
          </button>
        </SplideSlide>
        <SplideSlide className="w-full h-screen flex items-center  justify-center ">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-100 py-6 px-4 rounded flex items-center shadow-2xl ">
              <label
                htmlFor="robot"
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="robot"
                  className="hidden"
                  onChange={handleCheckboxChange}
                />
                <div className="w-5 h-5 mr-2 flex items-center justify-center bg-white border-2 border-gray-300 rounded">
                  {/* <span class="material-icons">check_box_outline_blank</span> */}
                  🖕
                </div>
                <span className="text-xl tracking-wide text-gray-700 pl-2">
                  I&#39;m not a robot
                </span>
              </label>
              {/* right content */}
              <div className="pl-12 flex flex-col items-center justify-center">
                <div className="bg-blue-200 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 128 128" // This ensures all content is visible within this coordinate system.
                    width="20" // Setting physical size to 10 units
                    height="20"
                    //   style={{
                    //     enableBackground: "new 0 0 28 28",
                    //   }}
                  >
                    <path
                      d="M98.78 62.95c1.4 6.28.71 36.04-3.03 41.8-6.34 9.7-14.34 8.04-18.36 9.69 0 0-5.39 2.15-12.33 1.39 0 0-5.71.89-15.12-2.93-5.81-2.37-12.65-4.16-18.06-18.45-3.69-9.73-3.76-10.63-1.39-14.03 0 0 1.77-3.22 3.58-3.48.76-.11 2.69-.85 3.39-2.23-.56 1.27-1.5 1.57-1.5 1.57s-2.83 8.4 3.41 10.98c4.95 2.04 1.2-4.8-1.77-12.85v-.01c.09-.28.13-.59.1-.92-.41-4.93-2.43-14.68 3.18-19.78 3.21-2.9 6.06-2.13 8.58-1.8 0 0 3.5 1.32 4.13-3.45.76-5.86-1.72-37.27 1.07-43.95 1.97-4.75 8.56-5.1 11.5-1.33 3.06 3.92 2.28 10.93 3.08 35.58.3 9.08.34 12.39 1.63 13.09 2.46 1.36 3.36-2.56 10.68.62 1.11.51 2.66 2.43 3.03 3.09.66 1.11 1.32 2.94 4.27 2.23 1.44-.34 8.38-1.81 9.93 5.17z"
                      style={{
                        fill: "#3b82f6",
                      }}
                    />
                    <path
                      d="M37.6 74.4c2.97 8.05 6.72 14.89 1.77 12.85-6.24-2.57-3.41-10.98-3.41-10.98s.94-.29 1.5-1.57c.01-.03.03-.06.04-.09.04-.07.06-.13.1-.21z"
                      style={{
                        fill: "#3b82f6",
                      }}
                    />
                    <path
                      d="M37.6 74.39v.01c-.04.08-.06.14-.1.22.04-.08.06-.15.09-.24l.01.01z"
                      style={{
                        fill: "#3b82f6",
                      }}
                    />
                    <path
                      d="M42.9 109.66s3.47 2.07 3.47 5.8v6.26a5.84 5.84 0 0 0 5.84 5.84h33.86c3.26 0 5.89-2.67 5.83-5.93-.04-2.43-.07-4.91-.07-5.91 0-5.79 4.3-11.68 4.3-11.68l-53.23 5.62z"
                      style={{
                        fill: "#3b82f6",
                      }}
                    />
                    <path
                      d="M.03 0h127.94v128H.03z"
                      style={{
                        fill: "none",
                      }}
                    />
                  </svg>
                </div>
                <p className="text-xs text-gray-400 mt-1 ">rudeCAPTCHA</p>
              </div>
            </div>
            <button
              className="p-4 bg-blue-500 mt-12 text-white rounded-lg"
              onClick={() => setShowOnboard(false)}
            >
              START
            </button>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  );
}

export default Onboard;
