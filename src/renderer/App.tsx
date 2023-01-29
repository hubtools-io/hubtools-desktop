import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { TerminalContextProvider } from 'react-terminal';
import { Dashboard } from './Dashboard/Dashboard';
import './App.css';
import { FrameContextProvider } from './components/FrameContext';

export default function App() {
  return (
    <Router>
      <TerminalContextProvider>
        <FrameContextProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </FrameContextProvider>
      </TerminalContextProvider>
    </Router>
  );
}
