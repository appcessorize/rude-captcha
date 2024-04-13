import React, { useState } from "react";

const CaptchaBox = () => {
  const [checked, setChecked] = useState(false);

  const toggleCheck = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div
        className="relative p-2 bg-white rounded shadow-lg w-56 h-14 flex items-center justify-center cursor-pointer"
        onClick={toggleCheck}
      >
        <div
          className={`relative w-6 h-6 flex justify-center items-center ${
            checked ? "bg-blue-600" : "bg-white"
          } border-2 border-gray-300 rounded`}
        >
          {checked && (
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9 19L3 12l2-2 4 4 8-8 2 2-10 10z" />
            </svg>
          )}
        </div>
        <span className="ml-2 text-sm text-gray-700">I'm not a robot</span>
      </div>
    </div>
  );
};

export default CaptchaBox;
