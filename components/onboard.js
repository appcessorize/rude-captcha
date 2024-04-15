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
    const splideInstance = splideRef.current?.splide;

    if (splideInstance) {
      splideInstance.on("mounted move", handleNavigation);

      // Return a cleanup function
      return () => {
        if (splideInstance) {
          splideInstance.off("mounted move", handleNavigation);
        }
      };
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-red-100 bg-opacity-50 z-50 flex justify-center items-center p-8">
      <style>
        {`
          .splide__pagination .splide__pagination__page {
            background-color: #888; /* Gray dots */
          }
          .splide__pagination .splide__pagination__page.is-active {
            background-color: #2196f3; /* Red active dot */
          }
        `}
      </style>
      {!isLastSlide && (
        <button
          onClick={() => splideRef.current.splide.go(">")}
          className="bg-blue-500 md:h-20 md:w-20 h-10 w-10 rounded-full fixed top-[50%] md:right-20 right-2 transform -translate-y-1/2 md:text-3xl text-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300 active:shadow-inner transition-shadow duration-300 z-[2000]"
          style={{ touchAction: "manipulation" }} // Prevents double-tap zoom on mobile
        >
          ⮕
        </button>
      )}
      <Splide
        options={{ arrows: false }}
        aria-label="React Splide Example"
        ref={splideRef}

        //   className=" bg-blue-100"
      >
        <SplideSlide className="w-full h-full bg-white md:bg-gray-100 flex items-center justify-center flex-col">
          <div className="w-full md:min-w-md  max-w-md min-h-screen flex items-center  flex-col bg-white p-4">
            {/* <p>Rude Captcha</p>
            <p>Sick of proving to a robot you are human</p> */}
            <div className="prose">
              <h2>WHAT IS RudeCaptcha?</h2>
              <h2>Sick of proving to a robot you are human?</h2>
              <p>
                Unpaid labor. AI can defeat traditional captcha . AI cannit be
                offensive
              </p>
              <p>
                Start by learning how to insult people from all over the world
                WHY AND WHAT
              </p>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide className="w-screen h-screen bg-red-500 flex items-center justify-center flex-col">
          <div className="w-full md:min-w-md h-full flex items-center justify-center flex-col bg-yellow-500 ">
            <p>HOW TO USE IT</p>
          </div>
        </SplideSlide>
        <SplideSlide className="w-screen h-screen  bg-orange-500 flex items-center justify-center flex-col">
          <div className="w-full md:min-w-md h-full flex items-center justify-center flex-col bg-white">
            <p>Start</p>
            <h2>I'm not a robot box</h2>
            <button
              className="bg-black text-white p-4 rounded-lg"
              onClick={() => setShowOnboard(false)}
            >
              hide onboard
            </button>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  );
}

export default Onboard;
