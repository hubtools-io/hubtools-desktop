import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { TerminalContextProvider } from 'react-terminal';
import { HotkeysProvider } from 'react-hotkeys-hook';
import { Dashboard } from './Dashboard/Dashboard';
import './App.css';
import { FrameContextProvider } from './components/FrameContext';

export default function App() {
    return (
        <Router>
            <HotkeysProvider initiallyActiveScopes={['files']}>
                <TerminalContextProvider>
                    <FrameContextProvider>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                        </Routes>
                    </FrameContextProvider>
                </TerminalContextProvider>
            </HotkeysProvider>
        </Router>
    );
}
