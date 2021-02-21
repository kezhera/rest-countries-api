import React from 'react';
import {  BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import './App.css';
import './index.css';
import Header from './component/Header';
import Content from './component/Content';
import CountryInner from './component/CountryInner';
function App() {
  if( localStorage.getItem("darkMode") == null ){
      localStorage.setItem("darkMode", "dark");
  }
  return (
        <>
        <Router>
            <Header />
            <main className="content" id="content">
              <Switch>
                    <Route path="/inner/:value">
                      <div className="container">
                        <div className="row">
                          <CountryInner />
                        </div>
                      </div>
                    </Route>
                    <Route path="/region/:value">
                      <div className="container">
                        <div className="row">
                          <Content type={'region'} />
                        </div>
                      </div>
                    </Route>
                    <Route path="/">
                      <div className="container">
                        <div className="row">
                          <Content type={'all'} />
                        </div>
                      </div>
                    </Route>
              </Switch>
            </main>
    
        </Router>
        </>
  );
}
export default App;
