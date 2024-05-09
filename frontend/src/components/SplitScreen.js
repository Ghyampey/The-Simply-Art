import { useLocation } from "react-router-dom";
const SplitScreen = ({ children }) => {
    const [left, right] = children;

    const location = useLocation();

 

    const includedPaths = ["/artist-dashboard/*","/admin-dashboard/*"];

    const shouldDisplayScreen = includedPaths.some(
        (path) =>
            typeof location.pathname === "string" &&
            location.pathname.match(path)
    );

    return (
        <>
            {shouldDisplayScreen ? (
                <div className="flex  bg-[#FAF9F6]  h-[100vh]">
                    <div className="flex-initial w-[250px]  bg-[#23282c] shadow-in">
                        {left}
                    </div>
                    <div className="grow px-[30px] overflow-y-scroll">
                        {right}
                    </div>
                </div>
            ) : (
                <>{right}</>
            )}
        </>
    );
};

export default SplitScreen;
