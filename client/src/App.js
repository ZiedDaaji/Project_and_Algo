
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Main from './component/Main';
import Dashboard from './component/Dashboard';
import AddJob from './component/job/AddJob';
import EditJob from './component/job/EditJob';
import ViewJob from './component/job/ViewJob';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/addJob" element={<AddJob/>} />
        <Route path="/edit/:id" element={<EditJob/>} />
        <Route path="/view/:id" element={<ViewJob/>} />
      </Routes>
    </div>
  );
}

export default App;
