import { TfiSearch } from "react-icons/tfi";
import { useState } from "react";
import axios from "axios";

export const Search = ({ heading, onClick, register }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="KEYWORDS"
                {...register}
                className="w-[98%] sm:w-[450px] rounded-[50px] xl:rounded-none relative h-[60px] xl:h-[70px] font-slab xl:my-8 sm:my-[40px] mr-[0px] ml-auto xl:border-2 border-b-2 outline-none pl-[30px] pr-[80px]"
            />{" "}
            <button className="relative" onClick={onClick}>
                {" "}
                <TfiSearch
                    size={30}
                    color="grey"
                    className="absolute right-[20px] top-[-20px]"
                />
            </button>
        </div>
    );
};
