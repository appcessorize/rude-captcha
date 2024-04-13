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
import LoadingSpinner from "@/components/loadingSpinner";
import APItems from "@/components/absolutelypositioneditems";

export default function CapatchaUI() {
  const [webcamLoading, setWebcamLoading] = useState(true);
  const [startDetection, setStartDetection] = useState(false);
  const [isDetectionActive, setIsDetectionActive] = useState(true);
  const [net, setNet] = useState(null);

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
    if (webcamRef.current && net && isDetectionActive) {
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
  const [showTick, setShowTick] = useState(false);

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
    if (
      urls[iRef.current].GestureDescription === answer ||
      urls[iRef.current].GestureDescription === answer2
    ) {
      console.log("success");

      const nextIndex = iRef.current < urls.length - 1 ? iRef.current + 1 : 0;
      setI(nextIndex);
      console.log("Index updated to:", nextIndex);
    }
  };
  return (
    <main className="h-screen w-screen flex flex-col md:flex-row bg-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden ">
          <div
            className="flex justify-between items-center p-4 bg-blue-500"
            style={{ minHeight: "4rem" }}
          >
            <div>
              <h4 className="text-gray-100 text-sm">
                {webcamLoading ? "Loading..." : "Make the Gesture"}
              </h4>
              <h4 className="text-xl font-bold text-white">
                {webcamLoading ? "RudeCaptcha" : urls[i].description}
              </h4>
            </div>
            {webcamLoading ? (
              <div className="h-24 " />
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
              <div className="h-full flex flex-col items-center justify-center ">
                <h5>LOADING...</h5>
                <h5>Initializing webcam...</h5>
                <h5>Loading AI model...</h5>
                <LoadingSpinner />
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
              className="text-gray-700 text-base overflow-hidden"
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
          <div className="px-4 pt-4 pb-2 flex justify-end space-x-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                i < urls.length - 1 ? setI(i + 1) : setI(0);
              }}
            >
              Skip
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                i < urls.length - 1 ? setI(i + 1) : setI(0);
              }}
            >
              Start
            </button>
          </div>
        </div>
      </div>
      <APItems
        answer={answer}
        answer2={answer2}
        startDetection={startDetection}
        runHandpose={runHandpose}
        net={net}
        setStartDetection={setStartDetection}
        urls={urls}
        i={i}
      />

      {/* <p className="absolute bottom-10 left-48 ">
        {isDetectionActive ? "detection on" : "detection off"}
      </p> */}

      {/* {isDetectionActive ? (
        <button
          className="bg-red-100 p-8 w-24 h-24 absolute bottom-10 left-24 "
          onClick={() => setIsDetectionActive(false)}
        >
          STOP
        </button>
      ) : (
        <button
          className="bg-red-100 p-8 w-24 h-24 absolute bottom-10 left-24"
          onClick={() => setIsDetectionActive(true)}
        >
          START
        </button>
      )} */}
    </main>
  );
}
