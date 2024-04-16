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
      {!isLastSlide && (
        <button
          onClick={() => splideRef.current.splide.go(">")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-blue-500 hover:bg-blue-700 text-white rounded-full p-2 md:p-4 md:w-20 md:h-20 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300 active:shadow-inner transition-shadow duration-300"
          style={{ touchAction: "manipulation" }} // Prevents double-tap zoom on mobile
        >
          ⮕
        </button>
      )}
      <Splide
        options={{ arrows: false }}
        aria-label="React Splide Example"
        ref={splideRef}
      >
        <SplideSlide className="w-full h-screen flex items-center justify-center flex-col bg-white">
          <div className="max-w-md p-4">
            <div className="prose">
              <h2>WHAT IS RudeCaptcha?</h2>
              <p>Sick of proving to a robot you are human?</p>
              <p>
                Unpaid labor. AI can defeat traditional captcha. Start by
                learning to insult people fro all over the world GLOBALICON `WHy
                AND WHAT
              </p>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide className="w-full h-screen flex items-center justify-center bg-yellow-500">
          <div className="prose">
            <h2>HOW TO USE IT</h2>
          </div>
        </SplideSlide>
        <SplideSlide className="w-full h-screen flex items-center justify-center bg-orange-500">
          <button
            className="p-4 bg-black text-white rounded-lg"
            onClick={() => setShowOnboard(false)}
          >
            hide onboard
          </button>
          <div>i am not a robo BOX</div>
        </SplideSlide>
      </Splide>
    </div>
  );
}

export default Onboard;
