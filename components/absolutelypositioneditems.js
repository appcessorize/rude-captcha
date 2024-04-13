const APItems = ({
  answer,
  answer2,
  startDetection,
  runHandpose,
  net,
  setStartDetection,
  urls,
  i,
}) => {
  return (
    <>
      <h1 className="absolute left-5 top-5 text-3xl   ">
        rude<span className="">Captcha</span>
      </h1>
      <p className="absolute right-5 top-5 text-sm ">
        Answer: 1:{answer} 2:{answer2} needed:{urls[i].GestureDescription}{" "}
        {answer !== urls[i].GestureDescription ||
        answer2 !== urls[i].GestureDescription
          ? "correct"
          : "no"}
      </p>
      <p>i:{i}</p>
      {net && <p className="absolute right-5 bottom-5 text-sm ">net ready</p>}
      {net &&
        (startDetection ? (
          <></>
        ) : (
          <button
            onClick={() => {
              runHandpose(net);
              setStartDetection(true);
            }}
            className="bg-red-500 p-2 text-sm text-white z-50 rounded-lg absolute left-5 bottom-5 "
          >
            Start detect
          </button>
        ))}
    </>
  );
};

export default APItems;
