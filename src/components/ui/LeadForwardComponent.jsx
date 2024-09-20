import { useState, useEffect } from "react";

function LeadForwardComponent({ userDetails, clickNextButton }) {
  const [forwardCount, setForwardCount] = useState(5); // assuming initial forward count is 10

  useEffect(() => {
    // Decrease forwardCount every second
    const intervalId = setInterval(() => {
      setForwardCount((prevCount) => prevCount - 1);
    }, 1000);

    // Automatically click the next button after 10 seconds
    const timeoutId = setTimeout(() => {
      clickNextButton("NEXT");
    }, 5000);

    // Cleanup intervals and timeouts when the component unmounts
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [clickNextButton]);

  return (
    <>
      <p className="text-center">
        This Lead Will Be Available At {userDetails.shadualeTime}{" "}
        {userDetails.selectedTime}
      </p>
      <p className="text-center font-bold">
        We Will Forward The Next Lead Automatically In {forwardCount} seconds
      </p>
    </>
  );
}

export default LeadForwardComponent;
