import Image from "next/image";
const Faq = ({ toggleFaq }) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white z-[1000] flex justify-center p-8 ">
      <button onClick={toggleFaq} className="fixed top-5 right-5">
        <span className="material-icons text-red-500 text-2xl md:text-3xl hover:text-red-700 hover:animate-pulse">
          cancel
        </span>
      </button>
      <article className="prose">
        <h2 className="text-blue-500">RudeCaptcha</h2>
        <h2>How to use it?</h2>

        <p>1. Make sure your webcam/ front facing camera is on</p>
        <p>
          2. Copy the obscene hand gesture in the top right in front of the
          camera
        </p>
        <Image
          src="/makeGesture.jpeg" // Assuming '/makeGesture.jpeg' is correctly placed in your 'public' folder
          alt="make gesture"
          width={500} // Specify the width
          height={300} // And the height
          layout="responsive" // This makes the image scale nicely to the parent element's width
        />

        <p>
          3. Sometimes the AI can&apos;t detect it straight away so move your
          hand a bit.
        </p>
        <p>4. You will be asked to perform a new gesture</p>
        <h2>FAQ</h2>
        <h4>Why did you make this?</h4>
        <p>answer</p>
        <h4>Do you really think this will replace Captchas?</h4>
        <p>No</p>
        <h4>How does this work?</h4>
        <p>
          It uses the Tensorflow.js and the handpose and fingerpose libraries
        </p>

        <h2>Share</h2>
        <h2>Contact</h2>
        <p>
          Got a question or comment? Contact me via the widget in the bottom
          right
        </p>
        <p>
          lorem ipsum Why do we use it? It is a long established fact that a
          reader will be distracted by the readable content of a page when
          looking at its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to generators
          on the Internet tend to repeat predefined chunks as necessary, making
          this the first true generator on the Internet. It uses a dictionary of
          over 200 Latin words, combined with a handful of model sentence
          structures, to generate Lorem Ipsum which looks reasonable. The
          generated Lorem Ipsum is therefore always free from repetition,
          injected humour, or non-characteristic words etc. generators on the
          Internet tend to repeat predefined chunks as necessary, making this
          the first true generator on the Internet. It uses a dictionary of over
          200 Latin words, combined with a handful of model sentence structures,
          to generate Lorem Ipsum which looks reasonable. The generated Lorem
          Ipsum is therefore always free from repetition, injected humour, or
          non-characteristic words etc. embarrassing hidden in the middle of
          text. All the Lorem Ipsum generators on the Internet tend to repeat
          predefined chunks as necessary, making this the first true generator
          on the Internet. It uses a dictionary of over 200 Latin words,
          combined with a handful of model sentence structures, to generate
          Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
          therefore always free from repetition, injected humour, or
          non-characteristic words etc.
        </p>
        <div className=" flex items-center justify-center">
          <button
            onClick={toggleFaq}
            className=" flex items-center justify-center mb-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            <span className="text-white material-icons mr-2 text-xl">
              cancel
            </span>
            CLOSE FAQ
          </button>
        </div>
      </article>
    </div>
  );
};

export default Faq;
