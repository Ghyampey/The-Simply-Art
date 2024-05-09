
import {
    
    Heading2,
} from "../../components/Heading";
import { UserTable } from "../../components/UserTable";
import { useEffect } from "react";


const UserList = () => {
    useEffect(()=>{
        document.title = "Add Events | Admin Dashboard"; 

    },[])
    return (
        <div className="flex flex-col gap-[40px] h-[100%] font-slab">
            <Heading2>Users</Heading2>
            <div className="flex flex-col  h-[90%] py-[30px] px-[20px]">
                <div className="overflow-hidden">
                   <UserTable userType="user"/>
                </div>
            </div>
        </div>
    );
};

export default UserList;
