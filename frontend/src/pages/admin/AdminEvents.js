import { useState, useEffect } from "react";
import axios from "axios";
import { AdminEvent } from "./AdminEventsList";
import { AdminSidebar } from "../../components/Sidebar";
import SplitScreen from "../../components/SplitScreen";

const AdminEventPage = () => {
    return <AdminEvent />;
};

export default AdminEventPage;
