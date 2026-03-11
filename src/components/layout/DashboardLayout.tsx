import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Sidebar, { type NavItem } from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { ChatBot } from "../chat";

interface DashboardLayoutProps {
    children: React.ReactNode;
    navItems: NavItem[];
    pageTitle?: string;
    userName?: string;
    brandName?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    navItems,
    pageTitle,
    userName,
    brandName,
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    // Auto-generate breadcrumbs based on current path
    const breadcrumbs = useMemo(() => {
        for (const item of navItems) {
            // Check direct match
            if (item.path === location.pathname) {
                return [{ label: item.label, path: item.path }];
            }
            // Check children
            if (item.children) {
                const childMatch = item.children.find(c => location.pathname === c.path);
                if (childMatch) {
                    return [
                        { label: item.label, path: item.path }, // Parent can just toggle its state or navigate to default
                        { label: childMatch.label }
                    ];
                }
            }
        }
        return pageTitle ? [{ label: pageTitle }] : [];
    }, [location.pathname, navItems, pageTitle]);

    return (
        <div className="flex h-screen bg-[#f5f5f5] overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                navItems={navItems}
                collapsed={collapsed}
                onToggle={() => setCollapsed(!collapsed)}
                brandName={brandName}
            />

            {/* Khu vực phải: Header + nội dung */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header
                    breadcrumbs={breadcrumbs}
                    userName={userName}
                    onToggleSidebar={() => setCollapsed(!collapsed)}
                />

                {/* Main content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>

                {/* Footer */}
                <Footer brandName={brandName} />
            </div>

            {/* Floating AI Chatbox */}
            <ChatBot />
        </div>
    );
};

export default DashboardLayout;
