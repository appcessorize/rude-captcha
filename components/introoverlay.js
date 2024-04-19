// const IntroOverlay = () => {
//   return (
//     <div
//       className={`fixed inset-0  z-50 flex  items-center  h-screen flex-col p-8 bg-blue-500`}
//     >
//       <div className="max-w-md px-12 mt-20 flex justify-between flex-col h-full">
//         <div className="prose ">
//           <h1 className="text-white">rudeCAPTCHA</h1>
//           <h2 className="text-gray-100">
//             Sick of proving to a robot you are human?
//           </h2>
//           <img src="/rudeCaptchaTitle.jpeg" alt="rudeCaptchaTitle"  />
//         </div>
//         <div className="flex items-center justify-center flex-col">
//           <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
//             <div className="bg-blue-600 h-2.5 rounded-full animate-widthGrow"></div>
//           </div>

//           <div className="flex items-baseline">
//             <p className="text-gray-200 pt-2 ">
//               Loading{"  "}
//               <span className="material-icons text-sm animate-spin text-white">
//                 rotate_right
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IntroOverlay;
import Image from "next/image";

const IntroOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center h-screen flex-col p-8 bg-blue-500">
      <div className="max-w-md px-12 mt-20 flex justify-between flex-col h-full">
        <div className="prose">
          <h1 className="text-white">rudeCAPTCHA</h1>
          <h2 className="text-gray-100">
            Sick of proving to a robot you are human?
          </h2>
          {/* Replace the img element with Image from next/image for optimization */}
          <Image
            src="/rudeCaptchaTitle.jpeg"
            alt="rudeCaptchaTitle"
            width={500} // Adjust width as needed
            height={300} // Adjust height as needed
            layout="responsive"
            priority={true} // Load image immediately
          />
        </div>
        <div className="flex items-center justify-center flex-col">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full animate-widthGrow"></div>
          </div>

          <div className="flex items-baseline">
            <p className="text-gray-200 pt-2 ">
              Loading{"  "}
              <span className="material-icons text-sm animate-spin text-white">
                rotate_right
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroOverlay;
