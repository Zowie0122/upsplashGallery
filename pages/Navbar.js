import Head from "next/head";

export default function Navbar({ setInput }) {
  return (
    <div>
      <Head>
        <title>Find your best image</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        />
      </Head>
      <main>
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>

              <li className="nav-item active">
                <a className="nav-link" href="/Gallery">
                  Your Saved Gallery<span className="sr-only">(current)</span>
                </a>
              </li>
            </ul>
            {setInput && (
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
              </form>
            )}
          </div>
        </nav>
      </main>
    </div>
  );
}
