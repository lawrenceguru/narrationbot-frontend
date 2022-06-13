import React, { useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

const DashboardLayout = ({ children }) => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  return (
    <React.Fragment>
      <Header />
        <Sidebar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
        {children}
      <Footer />
    </React.Fragment>
  );
}

export default DashboardLayout