const IconButton = ({ showTick, onClick, icon }) => {
  return (
    <button
      disabled={showTick}
      className="text-white font-bold py-2 px-2 rounded hover:bg-blue-50"
      onClick={onClick}
    >
      <span
        className={`material-icons  text-2xl  ${
          showTick ? "text-white" : "text-gray-500 hover:bg-blue-50"
        }`}
      >
        {icon}
      </span>
    </button>
  );
};

export default IconButton;
