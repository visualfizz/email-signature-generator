// import logo from "./logo.svg";
// import "./App.css";
// import Signature from "./Signature";
import React from "react";
import AppContext from "./AppContext";

class SignatureForm extends React.Component {
  static contextType = AppContext;

  // componentDidMount() {
  //   const user = this.context;

  //   console.log(user); // { name: 'Tania', loggedIn: true }
  // }

  constructor(props) {
    super(props);
    this.state = { sigName: "", sigJob: "", sigPhone: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const { user, setUser } = {};
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    // alert("A name was submitted: " + this.state.sigName);
    event.preventDefault();
    // this.createSignature();
    console.log("create sig button cliekced");
    this.setUser({
      name: this.state.sigName,
      job: this.state.sigJob,
      phone: this.state.sigPhone,
    });
  }

  createSignature() {
    var signature =
      document.getElementById("signature").contentWindow.document
        .documentElement.outerHTML;
    let formName = document.getElementById("sig-name").value;

    var newSig = signature.replace("Callie Coe", formName);

    console.log(formName);
    console.log(newSig);

    document.getElementById("signature").setAttribute("srcdoc", newSig);
  }

  render() {
    this.user = this.context.user;
    this.setUser = this.context.setUser;

    return (
      <div className="card h-100">
        <form id="sig-form" onSubmit={this.handleSubmit}>
          {/* <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" /> */}

          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="sig-name" className="form-label">
                Name *
              </label>
              <input
                name="sigName"
                type="text"
                value={this.state.sigName}
                onChange={this.handleChange}
                className="form-control"
                id="sig-name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sig-job" className="form-label">
                Job Title *
              </label>
              <input
                name="sigJob"
                type="text"
                value={this.state.sigJob}
                onChange={this.handleChange}
                className="form-control"
                id="sig-job"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sig-phone" className="form-label">
                Phone Number
              </label>
              <input
                name="sigPhone"
                type="text"
                value={this.state.sigPhone}
                onChange={this.handleChange}
                className="form-control"
                id="sig-phone"
                aria-describedby="sig-phone-help"
              />
              <div id="sig-phone-help" className="form-text"></div>
            </div>
          </div>

          <div className="card-footer">
            <button
              id="sig-form-submit"
              type="submit"
              className="btn btn-primary"
              // onClick={this.handleSubmit}
            >
              Create Signature
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignatureForm;
