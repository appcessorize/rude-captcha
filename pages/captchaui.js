import * as fp from "fingerpose";
// import * as tf from "@tensorflow/tfjs";
import * as tf from "@tensorflow/tfjs-backend-webgl";
import * as handpose from "@tensorflow-models/handpose";
import { middleFingerUpGesture } from "../utilites/middleFingerUpGesture";
import { vSign } from "../utilites/vSign";
import { thumbsUpGesture } from "../utilites/thumbsUpGesture";
import { thumbsDownGesture } from "../utilites/thumbsDownGesture";
import { closedFistGesture } from "../utilites/closedFistGesture";
import { closedFistNoFingersGesture } from "../utilites/closedFistNoFingersGesture";
import { moutzaGesture } from "../utilites/moutzaGesture";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
// import LoadingSpinner from "@/components/loadingSpinner";
import APItems from "@/components/absolutelypositioneditems";

export default function CapatchaUI() {
  const [webcamLoading, setWebcamLoading] = useState(true);
  const [startDetection, setStartDetection] = useState(false);
  const [showTick, setShowTick] = useState(false);
  const isDetectionActiveRef = useRef(true);
  const [net, setNet] = useState(null);
  const toggleDetection = () => {
    isDetectionActiveRef.current = !isDetectionActiveRef.current;
    console.log("Detection toggled to:", isDetectionActiveRef.current);
  };

  const webcamRef = useRef(null);
  useEffect(() => {
    if (net !== null) {
      // Check if the browser supports the getUserMedia API

      setWebcamLoading(true);

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request access to the webcam

        navigator.mediaDevices
          .getUserMedia({
            video: true,
            // facingMode: "user", // Uses the front camera
            frameRate: { ideal: 15, max: 30 },
            width: { ideal: 640 }, // Adjust as needed
            height: { ideal: 1138 }, // 640 * (16/9) = ~1138 for a 9:16 aspect ratio
            aspectRatio: { ideal: 9 / 16 },
            // video: true,
            // frameRate: { ideal: 15, max: 30 },
            // width: { ideal: 640 },
            // height: { ideal: 360 },

            // aspectRatio: { ideal: 1.777777778 },
          })
          .then((stream) => {
            // runHandpose();
            setWebcamLoading(false);
            // If access is granted, set the video source to the webcam stream
            if (webcamRef.current) {
              webcamRef.current.srcObject = stream;
            }
          })
          .catch((err) => {
            console.error("Error accessing the webcam:", err);
          });
      }
    }
  }, [net]);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedNet = await handpose.load(); // Load the model
        setNet(loadedNet); // Store the loaded model in state
        console.log("Handpose model loaded.");
      } catch (error) {
        console.error("Failed to load the Handpose model:", error);
      }
    };

    loadModel();
  }, []);

  const runHandpose = async (net) => {
    setInterval(() => {
      detect(net);
    }, 300);
  };

  const detect = async (net) => {
    if (webcamRef.current && net) {
      const video = webcamRef.current;
      const hand = await net.estimateHands(video);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          vSign,
          middleFingerUpGesture,
          thumbsUpGesture,
          thumbsDownGesture,
          closedFistGesture,
          closedFistNoFingersGesture,
          moutzaGesture,
        ]);

        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const sortPredictions = gesture.gestures.sort(
            (a, b) => b.score - a.score
          );

          // Always safe to access the first prediction's name if gestures array is not empty
          setAnswer(sortPredictions[0].name);

          // Check if there is a second prediction before trying to access its name
          if (sortPredictions.length > 1) {
            setAnswer2(sortPredictions[1].name);
            handleGestureRecognition(
              sortPredictions[0].name,
              sortPredictions[1].name
            );

            // if (sortPredictions[0].name === urls[i].GestureDescription) {
            //   alert("success");
            //   const nextIndex = i < urls.length - 1 ? i + 1 : 0;
            //   console.log("nextIndex", nextIndex, i);
            //   setI(nextIndex);
            //   console.log(i);
            // }
          } else {
            setAnswer2("no second answer"); // or any other default/fallback value
            handleGestureRecognition(
              sortPredictions[0].name,
              "no second answer"
            );
          }
          console.log("calling");
        }
      } else {
        setAnswer("no answer yet");
        setAnswer2("no answer yet");
      }
    }
  };

  const urls = [
    {
      description: "V Sign",
      url: "/vSign.png",
      GestureDescription: "vSign",
      blurb:
        "The obscene V sign, fingers up with palm inward, stems from medieval archers as defiance, now a rude gesture in the UK.",
    },
    {
      description: "Thumbs Down",
      url: "/thumbsDown.png",
      GestureDescription: "thumbs_down",
      blurb:
        "The thumbs-down gesture, signifying disapproval or rejection, traces back to ancient Rome's gladiatorial combats, widely recognized across cultures today.",
    },

    {
      description: "Thumbs Up",
      url: "/thumbsUp.png",
      GestureDescription: "thumbs_up",
      blurb:
        "Traditionally positive, the thumbs-up gesture can be obscene in certain cultures like Iran and Greece, symbolizing a disrespectful insult.",
    },
    {
      description: "Moutza",
      url: "/moutza.jpg",
      GestureDescription: "moutza",
      blurb:
        "The Moutza, spreading open the fingers on one hand, hails from ancient Greece, signifying insult, commonly used in the Balkans.",
    },
    {
      description: "Middle Finger",
      url: "/midfingercar.jpg",
      GestureDescription: "middle_finger_up",
      blurb:
        "The middle finger gesture, dating back to ancient Greece, symbolizes insult or anger, universally recognized as a sign of disrespect.",
    },
    {
      description: "Wanker",
      url: "https://media.istockphoto.com/id/182912888/photo/obscene-anti-social-behaviour.jpg?s=612x612&w=is&k=20&c=esk7pC1fVO4eKPakEatwYi-0wi45cj_mEGPMQ3szERM=",
      GestureDescription: "closed_fist",
      blurb:
        'The "wanker" gesture, involving a fist-and-forearm motion, originates from British slang, signifying masturbation and used to mock or insult someone.',
    },
    {
      description: "Bras d'honneur",
      url: "/french.jpg",
      GestureDescription: "closed_fist",
      blurb:
        "The Bras d'honneur or 'the Italian salute', originated in France, it's an insult akin to up yours with diverse cultural meanings.",
    },
    {
      description: "Middle Finger",
      url: "/midfinger.jpg",
      GestureDescription: "middle_finger_up",
      blurb:
        "The middle finger gesture, dating back to ancient Greece, symbolizes insult or anger, universally recognized as a sign of disrespect.",
    },
    {
      description: "Fig",
      url: "/thumbfist.jpg",
      GestureDescription: "closed_fist",
      blurb:
        "Originating from Roman times, the obscene fig gesture, thumb between fingers, signifies contempt, mainly used in Turkey and Russia.",
    },
    {
      description: "Middle Finger",
      url: "/midfingnews.jpg",
      GestureDescription: "middle_finger_up",
      blurb:
        "The middle finger gesture, dating back to ancient Greece, symbolizes insult or anger, universally recognized as a sign of disrespect.",
    },
  ];
  const [i, setI] = useState(0);
  const iRef = useRef(i);
  useEffect(() => {
    iRef.current = i; // Keep the ref current with the state
  }, [i]);

  const [answer, setAnswer] = useState("no answer yet");
  const [answer2, setAnswer2] = useState("no answer2 yet");
  const [showFaq, setShowFaq] = useState(false);
  //   const handleGestureRecognition = (answer, answer2) => {
  //     console.log(
  //       "called handleGestureRecognition",
  //       urls[i].GestureDescription,
  //       answer,
  //       answer2
  //     );
  //     if (
  //       urls[i].GestureDescription === answer ||
  //       urls[i].GestureDescription === answer2
  //     ) {
  //       console.log("success");
  //       //   setShowTick(true); // Show the tick mark

  //       // Wait for 1.5 seconds before hiding the tick and moving to the next gesture

  //       //   const nextIndex = i < urls.length - 1 ? i + 1 : 0;
  //       // Hide the tick mark

  //       // Move to the next gesture or reset

  //       //   setI(nextIndex);
  //       //   setI(i + 1);
  //       // Reset answers
  //       //   setAnswer("no answer yet");
  //       //   setAnswer2("no answer2 yet");

  //       // Optionally, re-enable detection here if you disabled it earlier
  //       //   setIsDetectionActive(true);
  //     }
  //   };
  const handleGestureRecognition = (answer, answer2) => {
    if (isDetectionActiveRef.current) {
      if (
        urls[iRef.current].GestureDescription === answer ||
        urls[iRef.current].GestureDescription === answer2
      ) {
        toggleDetection();
        setShowTick(true);
        console.log("success");
        setTimeout(() => {
          setShowTick(false);
          toggleDetection(); // This call re-enables detection
          console.log("Detection re-enabled.");
        }, 2000);
        const nextIndex = iRef.current < urls.length - 1 ? iRef.current + 1 : 0;
        setI(nextIndex);
        console.log("Index updated to:", nextIndex);
      }
    }
  };
  const toggleFaq = () => {
    toggleDetection();
    setShowFaq(!showFaq);
  };
  return (
    <main className="h-screen w-screen flex flex-col md:flex-row bg-white p-4 md:p-0">
      {showFaq && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white z-[1000] flex justify-center p-8 ">
          <button onClick={toggleFaq} className="fixed top-5 right-5">
            <span className="material-icons text-red-500 text-2xl md:text-3xl hover:text-red-700 hover:animate-pulse">
              cancel
            </span>
          </button>
          <article className="prose">
            <h2 className="text-blue-500">RudeCaptcha</h2>
            <h2>How to use it?</h2>

            <p>1. Make sure your webcam/ front facing camera is on</p>
            <p>
              2. Copy the obscene hand gesture in the top right in front of the
              camera
            </p>
            <Image
              src="/makeGesture.jpeg" // Assuming '/makeGesture.jpeg' is correctly placed in your 'public' folder
              alt="make gesture"
              width={500} // Specify the width
              height={300} // And the height
              layout="responsive" // This makes the image scale nicely to the parent element's width
            />

            <p>
              3. Sometimes the AI can&apos;t detect it straight away so move
              your hand a bit.
            </p>
            <p>4. You will be asked to perform a new gesture</p>
            <h2>FAQ</h2>
            <h4>Why did you make this?</h4>
            <p>answer</p>
            <h4>Do you really think this will replace Captchas?</h4>
            <p>No</p>
            <h4>How does this work?</h4>
            <p>
              It uses the Tensorflow.js and the handpose and fingerpose
              libraries
            </p>

            <h2>Share</h2>
            <h2>Contact</h2>
            <p>
              Got a question or comment? Contact me via the widget in the bottom
              right
            </p>
            <p>
              lorem ipsum Why do we use it? It is a long established fact that a
              reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              generators on the Internet tend to repeat predefined chunks as
              necessary, making this the first true generator on the Internet.
              It uses a dictionary of over 200 Latin words, combined with a
              handful of model sentence structures, to generate Lorem Ipsum
              which looks reasonable. The generated Lorem Ipsum is therefore
              always free from repetition, injected humour, or
              non-characteristic words etc. generators on the Internet tend to
              repeat predefined chunks as necessary, making this the first true
              generator on the Internet. It uses a dictionary of over 200 Latin
              words, combined with a handful of model sentence structures, to
              generate Lorem Ipsum which looks reasonable. The generated Lorem
              Ipsum is therefore always free from repetition, injected humour,
              or non-characteristic words etc. embarrassing hidden in the middle
              of text. All the Lorem Ipsum generators on the Internet tend to
              repeat predefined chunks as necessary, making this the first true
              generator on the Internet. It uses a dictionary of over 200 Latin
              words, combined with a handful of model sentence structures, to
              generate Lorem Ipsum which looks reasonable. The generated Lorem
              Ipsum is therefore always free from repetition, injected humour,
              or non-characteristic words etc.
            </p>
            <div className=" flex items-center justify-center">
              <button
                onClick={toggleFaq}
                className=" flex items-center justify-center mb-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              >
                <span className="text-white material-icons mr-2 text-xl">
                  cancel
                </span>
                CLOSE FAQ
              </button>
            </div>
          </article>
        </div>
      )}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden ">
          <div
            className="flex justify-between items-center p-4 bg-blue-500"
            style={{ minHeight: "4rem" }}
          >
            <div>
              <h4 className="text-gray-100 text-sm ">
                {webcamLoading
                  ? "Loading..."
                  : showTick
                  ? "Loading..."
                  : "Make the Gesture"}
              </h4>
              <h4 className="text-xl font-bold text-white">
                {webcamLoading
                  ? "RudeCaptcha"
                  : showTick
                  ? "Correct"
                  : urls[i].description}
              </h4>
            </div>
            {webcamLoading || showTick ? (
              <div className="h-24  flex items-center justify-center">
                <div className="pr-4">
                  {/* <LoadingSpinner /> */}
                  <p className="material-icons text-xl animate-spin">
                    <span className="material-symbols-outlined text-2xl text-white">
                      rotate_right
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <img
                src={urls[i].url}
                alt={urls[i].description}
                className="h-24 border-white border-2"
              />
            )}
          </div>

          {/* Existing video and grid overlay */}
          <div className="relative h-64 bg-gray-100">
            {webcamLoading && (
              <div className="h-full flex flex-col items-center justify-center prose">
                <h3>LOADING...</h3>
                <h5>Initializing webcam...</h5>
                <h5>Loading AI model...</h5>
                {/* <LoadingSpinner /> */}
                <p className="material-icons  animate-spin ">
                  <span className="material-symbols-outlined text-5xl">
                    rotate_right
                  </span>
                </p>
              </div>
            )}
            {showTick && (
              <div className="absolute top-0 left-0 w-full h-full bg-transparent flex items-center justify-center backdrop-filter backdrop-blur-lg">
                <div className="bg-white/50 h-24 w-24 flex items-center justify-center rounded-full  ">
                  <p className="text-green-500 text-5xl ">✓</p>
                </div>
              </div>
            )}
            <video
              ref={webcamRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover z-100"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-transparent grid grid-cols-4 grid-rows-4 border border-transparent z-10">
              {Array.from({ length: 16 }).map((_, idx) => (
                <div
                  key={idx}
                  className="border border-white"
                  style={{ minHeight: "1px" }}
                />
              ))}
            </div>
          </div>

          {/* Content block */}
          <div className="p-4">
            <p
              className={` text-base overflow-hidden   ${
                showTick ? "text-white" : "text-gray-700"
              }`}
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
            >
              {webcamLoading
                ? "Sick of having to prove to a robot you're human. AI isn't allowed to be offensive so won't be able to break this Captcha."
                : urls[i].blurb || <div className="h-14"></div>}
              {/* //   {urls[i].blurb || <div className="h-14"></div>} */}
            </p>
          </div>

          {/* Buttons */}
          <div className="px-4 pt-4 pb-2 flex justify-start space-x-3">
            <button
              disabled={showTick}
              className={`text-white font-bold py-2 px-2 rounded ${
                showTick ? "text-white" : "text-gray-400 hover:bg-blue-50"
              }`}
              onClick={toggleFaq}
            >
              <span className="material-icons text-gray-500 text-2xl">
                help
              </span>
            </button>
            <button
              disabled={showTick}
              className={`text-white font-bold py-2 px-2 rounded ${
                showTick ? "text-white" : "text-gray-400 hover:bg-blue-50"
              }`}
              onClick={() => alert("Share not implemented yet")}
            >
              <span className="material-icons text-gray-500 text-2xl">
                ios_share
              </span>
            </button>
            <button
              disabled={showTick}
              className={`text-white font-bold py-2 px-2 rounded ${
                showTick ? "text-white" : "text-gray-400 hover:bg-blue-50"
              }`}
              onClick={() => {
                i < urls.length - 1 ? setI(i + 1) : setI(0);
              }}
            >
              <span className="material-icons text-gray-500 text-2xl">
                autorenew
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* <APItems
        answer={answer}
        answer2={answer2}
        startDetection={startDetection}
        runHandpose={runHandpose}
        net={net}
        setStartDetection={setStartDetection}
        urls={urls}
        i={i}
      /> */}
    </main>
  );
}
