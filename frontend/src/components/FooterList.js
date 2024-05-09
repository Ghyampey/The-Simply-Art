import { Link } from "react-router-dom";
const FooterList = ({items}) => {
    return (
        <ul className="flex flex-col text-[11px] gap-[9px] w-[150px]">
            {items.map((items,i)=>(
                <li key={i} className={i===0? "text-sm font-bold" : "hover:cursor-pointer color hover:text-[#9F7E7E]"}><Link to={items.link}>{items.itemName}</Link> </li>
            ))}
        </ul>
    );
};

export default FooterList;
