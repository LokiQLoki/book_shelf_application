import React, { Component, lazy, Suspense, setGlobal } from 'reactn';

//css
import './App.css';
//components 
const AppHeader = lazy(() => import('./components/appHeader'));
const AppFrom = lazy(() => import('./components/form'));
const Books = lazy(() => import('./components//books'));
class App extends Component {

  componentDidMount(){
    setGlobal({
      books:[]
    })
  }

  render() {
    return (
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <AppHeader />
        </Suspense>

        <div className="container">
          <div className="row">
            <Suspense fallback={<div>Loading...</div>}>
              <Books />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <AppFrom />
            </Suspense>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
