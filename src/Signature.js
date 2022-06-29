import React, { useContext } from "react";
import AppContext from "./AppContext";
// eslint-disable-next-line import/no-webpack-loader-syntax
import sigHTML from 'raw-loader!./signature.html';

const Signature = () => {
  const { user } = useContext(AppContext);

  function replaceText() {
    var newSig = sigHTML.replace("{name}", user.name).replace("{job}", user.job);
    if(user.phone) {
      newSig = newSig.replace("{phone}", user.phone);
    } else {
      newSig = newSig.replace("{phone}", '&nbsp;').replace('P:', '');
    }
    return newSig;
  }

  return (
    <div>
      <iframe id="signature" title="signature" srcDoc={replaceText()}></iframe>
    </div>
  );
};

export default Signature