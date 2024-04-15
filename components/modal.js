import { useState } from "react";
const Modal = ({ toggleModal, toggleDetection, setShowModal }) => {
  const closeModal = () => {
    console.log("clickje");
    toggleDetection();
    setShowModal(false);
  };

  const [showVidText, setShowVidText] = useState(false);
  const [clipboardState, setClipboardState] = useState({
    text: "Clipboard",
    icon: "content_copy",
  });

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
        {!showVidText && (
          <div className="prose max-w-md">
            <h2>Share</h2>
            <p>Please share with your friends and followers</p>
          </div>
        )}
        {showVidText ? (
          <div className="prose pt-4 max-w-md">
            <h3>Share on TikTok/Reels</h3>
            <p>Please take a screen recording and share it</p>

            <h4>on iOS:</h4>
            <p>
              Go to{" "}
              <span className="font-semibold">
                Settings &gt; Control Centre
              </span>{" "}
              tap the Add button next to Screen Recording. Open Control Centre
              on your iPhone, then wait for the three-second countdown. Exit
              Control Centre to record your screen.
            </p>
            <button
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
              onClick={() => setShowVidText(false)}
            >
              <span class="material-icons text-white text-sm">
                <span class="material-symbols-outlined">arrow_back</span>
              </span>{" "}
              Back to Share
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 mt-4 w-full px-4">
            <button
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out"
              onClick={handleFacebookShare}
            >
              Facebook
            </button>
            <button
              className="w-full py-2 bg-black text-white rounded hover:bg-gray-700 transition duration-300 ease-in-out"
              onClick={handleTwitterShare}
            >
              Share on X
            </button>
            <button
              className="w-full py-2 bg-black text-white rounded hover:bg-gray-700 transition duration-300 ease-in-out flex items-center justify-center"
              onClick={() => setShowVidText(true)}
            >
              Share to TikTok
            </button>
            <button
              className="w-full py-2 bg-red-500 text-white rounded hover:bg-pink-700 transition duration-300 ease-in-out flex items-center justify-center"
              onClick={handleCopyToClipboard}
            >
              <span className="material-icons text-sm mr-2">
                {clipboardState.icon}
              </span>
              {clipboardState.text}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
