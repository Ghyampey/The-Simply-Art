import { RiArrowRightSLine, RiCalendarEventLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineUser } from "react-icons/ai";
import { AdminHeading } from "../../components/Heading";
import { Sidebar } from "../../components/Sidebar";

export const ArtistSidebar = () => {
    const items = [
        { itemName: "Dashboard", link: "/artist-dashboard", icon: <RxDashboard /> },
        {
            itemName: "Products",
            subItems: [
                {
                    subItemName: "Add Product",
                    link: "/artist-dashboard/add-product",
                },
                {
                    subItemName: "Manage Products",
                    link: "/artist-dashboard/manage-products",
                },
            ],
            icon: <RiCalendarEventLine />,
            link: "/artist-dashboard/manage-products",
        },
        {
            itemName: "About Artist",
            subItems: [
                {
                    subItemName: "Biography",
                    link: "/artist-dashboard/biography",
                },
                
            ],
            link: "/artist-dashboard/biography",
            icon: <AiOutlineUser />,
        },
        {
            itemName: "Featured Events",
            subItems: [
                {
                    subItemName: "Add Event",
                    link: "/artist-dashboard/add-event",
                },
                {
                    subItemName: "Manage Events",
                    link: "/artist-dashboard/manage-events",
                },
            ],
            link: "/artist-dashboard/manage-events",
            icon: <AiOutlineUser />,
        },
        {
            itemName: "Orders",
            subItems: [
                {
                    subItemName: "View Orders",
                    link: "/artist-dashboard/orders",
                },
            ],
            link: "/artist-dashboard/orders",
            icon: <AiOutlineUser />,
        },
    ];

    return(
        <Sidebar items={items}/>
    )
};
