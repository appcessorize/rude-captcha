const Toast = () => {
  return (
    <div
      id="toast-warning"
      className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div className="inline-flex flex-col items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-red-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
        <span className="text-red-500  text-xs ">HINT</span>
      </div>
      <div className="ms-3 text-sm font-normal">
        Make the 🖕 gesture to the webcam
      </div>
    </div>
  );
};

export default Toast;
