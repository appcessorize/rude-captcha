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

import React, { useRef, useEffect, useState } from "react";

export default function Home() {
  const [webcamLoading, setWebcamLoading] = useState(false);
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

          setAnswer(sortPredictions[0].name);
          if (sortPredictions[1]) {
            setAnswer2(sortPredictions[1].name);
          }
          console.log("calling");
          // Call handleGestureRecognition here after setting answer and answer2
          handleGestureRecognition(
            sortPredictions[0].name,
            sortPredictions[1].name
          );
        }
      } else {
        setAnswer(0);
        setAnswer2(0);
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
  const [answer, setAnswer] = useState("no answer yet");
  const [answer2, setAnswer2] = useState("no answer2 yet");
  const [showTick, setShowTick] = useState(false);

  const handleGestureRecognition = (answer, answer2) => {
    console.log(
      "called handleGestureRecognition",
      urls[i].GestureDescription,
      answer,
      answer2
    );
    if (
      urls[i].GestureDescription === answer ||
      urls[i].GestureDescription === answer2
    ) {
      console.log("success");
      setShowTick(true); // Show the tick mark

      // Wait for 1.5 seconds before hiding the tick and moving to the next gesture
      setTimeout(() => {
        const nextIndex = i < urls.length - 1 ? i + 1 : 0;
        setShowTick(false); // Hide the tick mark

        // Move to the next gesture or reset

        setI(nextIndex);

        // Reset answers
        setAnswer("no answer yet");
        setAnswer2("no answer2 yet");

        // Optionally, re-enable detection here if you disabled it earlier
        setIsDetectionActive(true);
      }, 1500);
    }
  };
  return (
    <main className="h-screen w-screen flex flex-col md:flex-row bg-gray-100">
      <h1 className="absolute left-5 top-5 text-3xl   ">
        rude<span className="">Captcha</span>
      </h1>
      <p className="absolute right-5 top-5 text-sm ">
        Answer: 1:{answer} 2:{answer2}
      </p>
      {net && <p className="absolute right-5 bottom-5 text-sm ">net ready</p>}
      {net &&
        (startDetection ? (
          <></>
        ) : (
          <button
            onClick={() => {
              runHandpose(net);
              setStartDetection(true);
            }}
            className="bg-red-500 p-2 text-sm text-white z-50 rounded-lg absolute left-5 bottom-5 "
          >
            Start detect
          </button>
        ))}
      <div className=" md:flex-1 h-1/3 md:h-full  ">
        <p className="z-0 absolute top-10 left-50">Video loading</p>

        <video
          ref={webcamRef}
          autoPlay
          playsInline
          muted
          className=" w-full h-full object-cover z-100 "
        />
      </div>
      <div className="flex-1   flex items-center justify-center">
        <div className="max-w-sm min-h-[calc(50%-56px)] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {showTick && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="bg-white bg-opacity-50 backdrop-blur-lg rounded-full w-48 h-48 flex items-center justify-center text-7xl text-green-500">
                ✓
              </div>
            </div>
          )}
          <div className="relative h-64">
            <img
              src={urls[i].url}
              alt={urls[i].description}
              className="absolute top-0 left-0 w-full h-full object-cover"
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
          <div className="p-4">
            <h5 className="text-lg font-bold mb-2">{urls[i].description}</h5>
            <p
              className="text-gray-700 text-base overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
            >
              {urls[i].blurb || <div className="h-14"></div>}
            </p>
          </div>
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
    </main>
  );
}
