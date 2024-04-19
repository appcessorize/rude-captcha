const IntroOverlay = () => {
  return (
    <div className="fixed inset-0 bg-blue-500 z-50 flex  items-center  h-screen flex-col p-8">
      <div className="max-w-md px-12 mt-20 flex justify-between flex-col h-full">
        <div className="prose ">
          <h1 className="text-white">rudeCAPTCHA</h1>
          <h2 className="text-gray-100">
            Sick of proving to a robot you are human?
          </h2>
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