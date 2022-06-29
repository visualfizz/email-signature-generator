import React, { Component } from "react";

const AppContext = React.createContext();

class AppProvider extends Component {
  // Context state
  state = {
    user: this.props.value || {},
  }

  // Method to update state
  setUser = (user) => {
    this.setState((prevState) => ({ user }))
  }

  render() {
    const { children } = this.props
    const { user } = this.state
    const { setUser } = this

    return (
      <AppContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
}

export default AppContext

export { AppProvider }