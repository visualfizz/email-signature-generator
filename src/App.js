import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Signature from "./Signature";
import SignatureForm from "./SignatureForm";
import { AppProvider } from "./AppContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import HTMLMinifier from 'html-minifier-terser/dist/htmlminifier.esm.bundle';

function App() {
  const user = { name: "First Last", job: "Job Title", phone: "555-123-4567" };
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    const credential = localStorage.getItem("credential");
    if (credential) {
      fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`)
        .then((res) => res.json())
        .then((response) => {
          setLoggedIn(true);
          setUsername(response.name);
          setEmail(response.email);
        })
        .catch((error) => console.log(error));
    }
  }, []); // <-- empty dependency array

  // const googleSuccess = async (res) => {
  //   console.log('auth.js-googlesuccess-res', res)
  //   fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${res.credential}`)
  //     .then(res => res.json())
  //     .then(response => {
  //       console.log('user Info=', response)
  //     })
  //     .catch(error => console.log(error));
  // };
  // const googleError = (error) => {
  //   console.log('google signin failed-error', error)
  // } 

  return (
    <GoogleOAuthProvider clientId="2231101338-jvngdfqalrv4aal892ujtr9j2sddngf9.apps.googleusercontent.com">
      <div className="App">
        <Header
          loggedIn={loggedIn}
          onSignOut={signOut}
          username={username}
          email={email}
        ></Header>
        <div className="container">
          {!loggedIn && (
            <div id="signin-screen">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  setLoggedIn(true);
                  localStorage.setItem(
                    "credential",
                    credentialResponse.credential
                  );
                  fetch(
                    `https://oauth2.googleapis.com/tokeninfo?id_token=${credentialResponse.credential}`
                  )
                    .then((res) => res.json())
                    .then((response) => {
                      //console.log('user Info=', response)
                      setUsername(response.name);
                    })
                    .catch((error) => console.log(error));
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          )}
          {loggedIn && (
            <AppProvider value={user}>
              <div id="content" className="protected py-5">
                <div className="row justify-content-center g-4">
                  <div className="col-lg-6">
                    <SignatureForm />
                  </div>
                  <div className="col-lg-6">
                    <div className="card h-100">
                      <div className="card-body d-flex flex-column justify-content-center">
                        <Signature />
                      </div>
                      <div className="card-footer">
                        <div className="d-flex align-items-center gap-2">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={copySignature}
                          >
                            Copy Signature
                          </button>
                          {showCopied && (
                            <div
                              className={`text-success go`}
                              onAnimationEnd={() => setShowCopied(false)}
                            >
                              Copied!
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <h2>How to Add the Signature to Your Email App</h2>
                  <h3>Gmail</h3>
                  <p><a href="https://support.google.com/mail/answer/8395" target="_blank">Create a Gmail Signature</a></p>
                  <p>Paste the signature you created into the box.</p>
                  <h3>Apple Mail (macOS)</h3>
                  <p>Preferences > Signatures</p>
                  <p>Click the + button to add a new signature. Uncheck the box "Always match my default message font." Paste the signature you created into the box.</p>
                </div>
              </div>
            </AppProvider>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );

  function signOut() {
    localStorage.removeItem("credential");
    setLoggedIn(false);
  }

  function copyToClip(str) {
    function listener(e) {
      e.clipboardData.setData("text/html", str);
      e.clipboardData.setData("text/plain", str);
      e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
  }

  async function copySignature() {
    var sigIframeHtml = document.getElementById("signature").contentWindow.document.documentElement.outerHTML;
    var result = await HTMLMinifier.minify(sigIframeHtml, {collapseWhitespace: true, minifyCSS: true});
    copyToClip(
      result
    );
    setShowCopied(true);
  }
}

export default App;
