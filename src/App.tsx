import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login/Login';
import Register from './pages/auth/Register/Register';
import ForgotPassword from './pages/auth/ForgotPassword/ForgotPassword';
import AdminHome from './pages/admin/Home/AdminHome';
import UserHome from './pages/user/Home/UserHome';
import UserEntry from './pages/user/Entry/UserEntry';
import UserCalendar from './pages/user/Calendar/UserCalendar';
import UserReport from './pages/user/Report/UserReport';
import UserBudget from './pages/user/Budget/UserBudget';
import SmartEntry from './pages/user/SmartEntry/SmartEntry';
import AiAdvisor from './pages/user/Advisor/AiAdvisor';
import GoalSaving from './pages/user/Goals/GoalSaving';
import UserExport from './pages/user/Export/UserExport';
import './App.css';

import { ToastProvider } from './components/ui/Toast';

function App() {
    return (
        <ToastProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Auth routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Admin routes */}
                <Route path="/admin/home" element={<AdminHome />} />

                {/* User routes */}
                <Route path="/user/home" element={<UserHome />} />
                <Route path="/user/entry" element={<Navigate to="/user/entry/expense" replace />} />
                <Route path="/user/entry/expense" element={<UserEntry key="expense" defaultType="Tiền chi" />} />
                <Route path="/user/entry/income" element={<UserEntry key="income" defaultType="Tiền thu" />} />
                <Route path="/user/calendar" element={<UserCalendar />} />
                <Route path="/user/report" element={<Navigate to="/user/report/monthly" replace />} />
                <Route path="/user/report/monthly" element={<UserReport defaultPeriod="Monthly" />} />
                <Route path="/user/report/yearly" element={<UserReport defaultPeriod="Yearly" />} />
                <Route path="/user/budget" element={<UserBudget />} />
                <Route path="/user/goals" element={<GoalSaving />} />
                <Route path="/user/advisor" element={<AiAdvisor />} />
                <Route path="/user/smart-entry" element={<SmartEntry />} />
                <Route path="/user/export" element={<UserExport />} />
            </Routes>
            </Router>
        </ToastProvider>
    );
}

export default App;
