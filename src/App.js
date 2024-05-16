import './App.css';
import { Provider } from 'react-redux';
import PressReleaseComponent from './components/PressRelease';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PressReleaseComponent />
      </div>
    </Provider>
  );
}

export default App;
