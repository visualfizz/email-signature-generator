function Header(props) {
  return (
    <header className="App-header">
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid text-white">
          <h1 className="display-6">VisualFizz Email Signature Tool</h1>
          {props.loggedIn && (
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex flex-column small text-end">
                <div>{props.username}</div>
                <div>{props.email}</div>
              </div>
              <button
                className="btn btn-light btn-sm protected"
                onClick={props.onSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
