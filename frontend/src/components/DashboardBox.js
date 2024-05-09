
export const Box = ({children,number}) => {
    return (
        <div
            className="h-[300px] w-[350px] shadow-xl bg-white text-center font-slab rounded-[10px] m-auto"
           
        >
           <h3 className="text-[30px] mt-7">{children}</h3> 
           <p className="text-[80px] mt-5">{number}</p>
        </div>
    );
};