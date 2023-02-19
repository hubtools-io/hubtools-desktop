import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { TerminalContextProvider } from 'react-terminal';
import { HotkeysProvider } from 'react-hotkeys-hook';
import { Dashboard } from './Dashboard/Dashboard';
import './App.css';
import { FrameContextProvider } from './components/FrameContext';

export default function App() {
    return (
        <Router>
            <TerminalContextProvider>
                <HotkeysProvider initiallyActiveScopes={['files']}>
                    <FrameContextProvider>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                        </Routes>
                    </FrameContextProvider>
                </HotkeysProvider>
            </TerminalContextProvider>
        </Router>
    );
}
