
import { RiCalendarEventLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineUser } from "react-icons/ai";
import { Sidebar } from "../../components/Sidebar";

export const AdminSidebar = () => {
    const items = [
        { itemName: "Dashboard", link: "/admin-dashboard", icon: <RxDashboard /> },
        {
            itemName: "Events",
            subItems: [
                {
                    subItemName: "Add Event",
                    link: "/admin-dashboard/add-event",
                },
                {
                    subItemName: "Manage Event",
                    link: "/admin-dashboard/events",
                },
            ],
            icon: <RiCalendarEventLine />,
            link: "/admin-dashboard/events",
        },
        {
            itemName: "Artists",
            subItems: [
                {
                    subItemName: "Manage Artists",
                    link: "/admin-dashboard/artists",
                },
            ],
            link: "/admin-dashboard/artists",
            icon: <AiOutlineUser />,
        },
        {
            itemName: "Users",
            subItems: [
                {
                    subItemName: "Manage Users",
                    link: "/admin-dashboard/users",
                },
            ],
            link: "/admin-dashboard/users",
            icon: <AiOutlineUser />,
        },     
    ];

    return (
        <Sidebar items={items}/>
    );
};
