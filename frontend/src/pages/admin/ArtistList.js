import { useEffect } from "react";
import { Heading2 } from "../../components/Heading";

import { UserTable } from "../../components/UserTable";

const ArtistList = () => {
    useEffect(() => {
        document.title = "View Artists | Admin Dashboard";
    }, []);
    return (
        <div className="flex flex-col gap-[40px] h-[100%] font-slab">
            <Heading2>Artists</Heading2>
            <div className="flex flex-col h-[90%] py-[30px] px-[20px] ">
                <div className="overflow-hidden">
                    <UserTable userType="artist" />
                </div>
            </div>
        </div>
    );
};

export default ArtistList;
