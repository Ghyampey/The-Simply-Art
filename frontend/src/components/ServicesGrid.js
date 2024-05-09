import { Heading2 } from "./Heading";
import { ViewAllButton } from "./Button";
export const Services = ({ heading, para, img,button }) => {
    return (
        <div className="grid lg:grid-cols-2  items-center border-black border-y-[1px] divide-black divide-x-[1px] pb-10 lg:pb-0">
            <div className="flex flex-col order-2   justify-center items-center max-w-[570px] w-[80%] lg:w-[60%] m-auto text-center ">
                <Heading2>{heading}</Heading2>
                <p className="text-[14px] sm:text-[16px] font-montserrat mb-5">{para}</p>
                <ViewAllButton border="black" link="/register">
                  {button}
                </ViewAllButton>
            </div>
            <div className="h-full flex order-1 lg:order-3 items-center pb-5 lg:py-11">
                <img className="w-[95%] max-h-[95%] object-cover lg:max-h-[none] m-auto" src={img} alt="" />
            </div>
        </div>
    );
};
