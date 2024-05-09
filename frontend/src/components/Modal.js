import { useState, useEffect } from "react";
import { DeleteButton, YesButton, NoButton, ViewButton } from "./Button";
import { VscVerified } from "react-icons/vsc";
export const LogOutModal = ({ children, onClick, message }) => {
    const [modal, setModal] = useState(false);

    const HandleClick = () => {
        setModal(true);
        setTimeout(() => window.location.reload(), 3200);
    };
    return (
        <>
            <button onClick={() => HandleClick()}>LOG OUT</button>
            {modal && (
                <div
                    className="w-[100%] h-[100%] fixed left-0 top-0 z-1 overflow-auto bg-gray-800 bg-opacity-80 flex justify-center items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-white  h-[200px] w-[400px] rounded-[10px] flex flex-col gap-[20px] text-md justify-center items-center">
                        <div className="bg-[#4c8452] h-[130px] w-[100%] rounded-t-[9px] flex justify-center items-center">
                            <VscVerified color="white" size={70} />
                        </div>

                        <div className="text-[#4c8452] mb-5 mt-auto">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export const Modal = ({ children, onClick, message }) => {
    const [modal, setModal] = useState(false);

    const handleYesClick = () => {
        setModal(false);
        onClick();
    };

    return (
        <>
            <DeleteButton onClick={() => setModal(true)} />
            {modal && (
                <div
                    className="w-[100%] h-[100%] fixed left-0 top-0 z-1 overflow-auto bg-gray-800 bg-opacity-80 flex justify-center items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-white h-[170px] w-[400px]  p-[20px] rounded-[10px] flex flex-col gap-[20px]">
                        {children}
                        <div className="ml-auto mr-0">
                            {" "}
                            <YesButton onClick={handleYesClick} />
                            <NoButton onClick={() => setModal(false)}>
                                No
                            </NoButton>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export const LargeModal = ({ children, onClick, message }) => {
    const [modal, setModal] = useState(false);

    useEffect(() => {
        onClick();
    }, []);

    return (
        <>
            <ViewButton onClick={() => setModal(true)} />
            {modal && (
                <div
                    className="w-[100%] h-[100%] fixed left-0 top-0 z-1 overflow-auto bg-gray-800 bg-opacity-80 flex justify-center items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-white h-[600px] w-[1000px]  p-[20px] rounded-[10px] flex flex-col gap-[20px]">
                        <div className="ml-auto mr-0">
                            <NoButton onClick={() => setModal(false)}>
                                Close
                            </NoButton>
                        </div>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};
