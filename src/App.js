import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/login/Login';
import PressReleaseComponent from './components/PressRelease';
import ProtectedRoute from './utils/ProtectedRoute';
import store from './store/store';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route
              path="/pressrelease"
              element={
                <ProtectedRoute>
                  <PressReleaseComponent />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound /> } />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
