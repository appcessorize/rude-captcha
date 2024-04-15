import { useState } from "react";
const Modal = ({ toggleModal, toggleDetection, setShowModal }) => {
  //   const [clipboardText, setClipboardText] = useState("Clipboard");
  //   const [clipboardIcon, setClipboardIcon] = useState("content_copy");

  const [clipboardState, setClipboardState] = useState({
    text: "Clipboard",
    icon: "content_copy",
  });
  const closeModal = () => {
    console.log("clickje");
    toggleDetection();
    setShowModal(false);
  };
  const handleCopyToClipboard = () => {
    const textToCopy = "Check out this great site!";
    const urlToCopy = "https://rude-capt.vercel.app";
    const fullText = `${textToCopy} ${urlToCopy}`;

    navigator.clipboard
      .writeText(fullText)
      .then(() => setClipboardState({ text: "Copied", icon: "check_circle" }))
      .catch((err) => console.error("Failed to copy text to clipboard", err));
  };
  const handleFacebookShare = () => {
    const url = "https://rude-capt.vercel.app";
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, "_blank");
  };
  const handleTwitterShare = () => {
    const url = "https://rude-capt.vercel.app";
    const text = encodeURIComponent("Check out this great site!");
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${text}&via=YourTwitterHandle&hashtags=ExampleHashTag`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-8"
      onClick={closeModal}
    >
      <div
        className="bg-white p-5 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-100 rounded-full flex items-center justify-center"
        >
          <span className="material-icons ">close</span>
        </button>
        <div className="prose">
          <h2>Share</h2>
          <p>Please share with your friends and followers</p>
        </div>
        <div className="space-x-4 mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={handleFacebookShare}
          >
            Facebook
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
            onClick={handleTwitterShare}
          >
            X
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-pink-700 "
            onClick={handleCopyToClipboard}
          >
            <span className="material-icons text-sm">
              {clipboardState.icon}
            </span>{" "}
            {clipboardState.text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
