import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import store from './dux';

ReactDOM.render(
  // <Provider store={store}>
    <div>
      <h1>The Shoppies</h1>
      <div className="container" id="search">
        <p>Movie title</p>
        <p>*input search bar*</p>
        {/* input search bar */}
      </div>
      <div className="flexboxes">
        <div className="container" id="searchResults">
          <h4>Search Results for *search input*</h4>
          <div className="resultsLine">
          <p className="results">Title (Year)</p>
          <button className="results">Nominate</button>
          </div>
        </div>
        <div className="container" id="nominations">
          <h4>Nominations</h4>
          <div className="resultsLine">
          <p className="results">Nom (Year)</p>
          <button className="results">Remove</button>
          </div>
        </div>
        </div>
      </div>,
  // </Provider>,
  document.getElementById('app')
);
