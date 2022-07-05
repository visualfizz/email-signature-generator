import React, { useContext } from "react";
import AppContext from "./AppContext";
// eslint-disable-next-line import/no-webpack-loader-syntax
import sigHTML from "raw-loader!./signature.html";

const Signature = () => {
  const { user } = useContext(AppContext);

  function replaceText() {
    var newSig = sigHTML
      .replace("{name}", user.name)
      .replace("{job}", user.job);
    if (user.phone) {
      newSig = newSig.replace(/{phone}/g, formatPhoneNumber(user.phone));
    } else {
      newSig = newSig.replace(/{phone}/g, "&nbsp;").replace("P:", "");
    }
    return newSig;
  }

  function formatPhoneNumber(phoneNumber) {
    const phoneDigits = phoneNumber.replace(/\D/g, "");
    const phoneChunk1 = phoneDigits.slice(0, 3);
    const phoneChunk2 = phoneDigits.slice(3, 6);
    const phoneChunk3 = phoneDigits.slice(6, 10);
    return `(${phoneChunk1}) ${phoneChunk2}-${phoneChunk3}`;
  }

  return (
    <div>
      <iframe id="signature" title="signature" srcDoc={replaceText()}></iframe>
    </div>
  );
};

export default Signature;
