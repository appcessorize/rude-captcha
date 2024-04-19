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
import { middle_finger_down } from "../utilites/middleFingerDown";
import Image from "next/image";
import Faq from "@/components/faq";
import React, { useRef, useEffect, useState } from "react";
// import LoadingSpinner from "@/components/loadingSpinner";
// import APItems from "@/components/absolutelypositioneditems";
import IconButton from "@/components/iconbutton";
import Modal from "@/components/modal";
import { urls } from "@/utilites/urls";
import Onboard from "@/components/onboard";
import IntroOverlay from "@/components/introoverlay";

import Toast from "@/components/toast";
//start btn shimmer YES but
// hide icons before start is pressed yes
//change text when start is active yes

//blur on mobile YES

//share YEs BUT need to change copy
//og YES but needs update

//more pics
//more gestures
// skip YES
//clean up

// INRO

export default function CapatchaUI() {
  const [webcamLoading, setWebcamLoading] = useState(true);
  const [startDetection, setStartDetection] = useState(false);
  const [showTick, setShowTick] = useState(false);
  const isDetectionActiveRef = useRef(false);
  // const isDetectionActiveRef = useRef(false);
  const [net, setNet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showOnboard, setShowOnboard] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // debug
  const [detectingHand, setDetectingHand] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
    toggleDetection();
  };
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
            setWebcamLoading(false);
            // runHandpose();
            // setTimeout(() => {
            //   setWebcamLoading(false);
            // }, 500);
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
        setDetectingHand(true);
        const GE = new fp.GestureEstimator([
          middle_finger_down,
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

  const [i, setI] = useState(0);
  const iRef = useRef(i);
  useEffect(() => {
    iRef.current = i; // Keep the ref current with the state
  }, [i]);

  // show hide intro

  const [answer, setAnswer] = useState("no answer yet");
  const [answer2, setAnswer2] = useState("no answer2 yet");
  const [showFaq, setShowFaq] = useState(false);
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
        }, 1500);
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

  //experimental
  const [videoPlaying, setVideoPlaying] = useState(false);
  useEffect(() => {
    const video = webcamRef.current;
    if (video) {
      const handleCanPlay = () => {
        setWebcamLoading(false);
        setVideoPlaying(true);
        console.log("Video is ready to play.");
      };
      const handlePlaying = () => {
        setVideoPlaying(true);
        console.log("Video is playing.");
      };
      const handlePause = () => {
        setVideoPlaying(false);
        console.log("Video is paused.");
      };

      // Add event listeners
      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("playing", handlePlaying);
      video.addEventListener("pause", handlePause);

      return () => {
        // Cleanup event listeners
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("playing", handlePlaying);
        video.removeEventListener("pause", handlePause);
      };
    }
  }, [webcamRef, net]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
      console.log("Timer expired, set showIntro to false");
    }, 5000);

    // Check if webcamLoading is already false at the time of component mount or gets updated to false
    if (!webcamLoading) {
      clearTimeout(timer);
      setShowIntro(false);
      console.log("Webcam finished loading, set showIntro to false");
    }

    // Cleanup function
    return () => clearTimeout(timer);
  }, []); // Depend on webcamLoading so this effect re-runs if it changes

  useEffect(() => {
    if (!startDetection && videoPlaying && net) {
      console.log("start detection");
      runHandpose(net);
      setStartDetection(true);
    }
  }, [videoPlaying]);

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center md:flex-row bg-white p-4 md:p-0 overflow-hidden">
      <p className="absolute top-10">
        {detectingHand ? "detecting hand" : "not detecting hand"}||
        detectionActiveRef:
        {isDetectionActiveRef.current ? "true" : "false"}
      </p>
      {showOnboard && <Onboard setShowOnboard={setShowOnboard} />}

      {showIntro && <IntroOverlay showIntro={showIntro} />}
      {showFaq && <Faq toggleFaq={toggleFaq} />}
      {showModal && (
        <Modal
          toggleModal={toggleModal}
          toggleDetection={toggleDetection}
          setShowModal={setShowModal}
        />
      )}

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden ">
          <div
            className="flex justify-between items-center p-4 bg-blue-500"
            style={{ minHeight: "4rem" }}
          >
            <div>
              <h4 className="text-gray-100 text-sm ">
                {webcamLoading || showTick
                  ? "Loading..."
                  : !startDetection
                  ? "Get Ready"
                  : "Make the Gesture"}
              </h4>
              <h4 className="text-xl font-bold text-white">
                {webcamLoading || !startDetection
                  ? "rudeCAPTCHA"
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
            ) : startDetection ? (
              <img
                src={urls[i].url}
                alt={urls[i].description}
                className="h-24 border-white border-2"
              />
            ) : (
              <div className="h-24  flex items-center justify-center" />
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
              <div
                className="absolute top-0 left-0 w-full h-full bg-transparent flex items-center justify-center  "
                style={{
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
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
            {!webcamLoading && (
              <div className="absolute top-0 left-0 w-full h-full bg-transparent grid grid-cols-4 grid-rows-4 border border-transparent z-10">
                {Array.from({ length: 16 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="border border-white"
                    style={{ minHeight: "1px" }}
                  />
                ))}
              </div>
            )}
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
                ? "Sick of having to prove to a robot you're human? AI isn't allowed to be offensive so won't be able to break this Captcha."
                : !startDetection
                ? " Make the obscene gesture indicated in the top right. Make sure your hand is visible to the webcam.  Press Start to begin."
                : urls[i].blurb || <div className="h-14"></div>}
            </p>
          </div>

          {/* Buttons */}
          <div className="px-4 pt-4 pb-2 flex justify-start space-x-3">
            <IconButton showTick={showTick} icon={"help"} onClick={toggleFaq} />
            <IconButton
              showTick={showTick}
              icon={" ios_share"}
              onClick={toggleModal}
            />
            {startDetection && (
              <IconButton
                showTick={showTick}
                icon={"autorenew"}
                onClick={() => {
                  i > 0 ? setI(i - 1) : setI(urls.length - 1);
                }}
              />
            )}
            <div className=" w-full flex justify-end">
              {startDetection && (
                <button
                  onClick={() => {
                    toggleDetection();
                  }}
                  type="button"
                  className=" focus:outline-none hover:underline text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Start
                </button>
              )}
              {/* {net && !webcamLoading && !startDetection && videoPlaying && (
                <button
                  onClick={() => {
                    runHandpose(net);
                    setStartDetection(true);
                  }}
                  type="button"
                  className=" focus:outline-none hover:underline text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Start
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
