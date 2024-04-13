import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { urls } from "../utilites/urls";

export default function CardFlip() {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Flip card handler
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setTimeout(() => {
      // Change content after the flip animation
      setIndex(index < urls.length - 1 ? index + 1 : 0);
    }, 300); // Adjust timing to match the half-way point of your animation
  };

  // Animation variants for flipping
  const cardVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  return (
    <main className="h-screen w-screen flex flex-col md:flex-row bg-gray-100">
      <div className="md:flex-1 h-1/3 md:h-full"></div>
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence>
          <motion.div
            key={index}
            initial={false}
            animate={isFlipped ? "back" : "front"}
            variants={cardVariants}
            transition={{ duration: 0.6 }}
            className="max-w-sm min-h-[calc(50%-56px)] mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {/* {isFlipped ? (
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="bg-white bg-opacity-50 backdrop-blur-lg rounded-full w-48 h-48 flex items-center justify-center text-7xl text-green-500">
                  ✓
                </div>
              </div>
            ) : null} */}
            <div className="relative h-64">
              <img
                src={urls[index].url}
                alt={urls[index].description}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h5 className="text-lg font-bold mb-2">
                {urls[index].description}
              </h5>
              <p
                className="text-gray-700 text-base overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                }}
              >
                {urls[index].blurb || <div className="h-14"></div>}
              </p>
            </div>
            <div className="px-4 pt-4 pb-2 flex justify-end space-x-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  setIndex(index < urls.length - 1 ? index + 1 : 0)
                }
              >
                Skip
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleFlip}
              >
                Start
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
