export const Banner = ({ heading, img }) => {
    return (
        <div
            className={`h-[350px] md:h-[480px] text-[42px] font-cinzel object-cover bg-no-repeat w-[100%] text-center text-white flex justify-center items-center `}
            style={{ backgroundImage: `url(${img})`, backgroundSize: "cover" ,backgroundPosition:"0% 30%" }}
        >
            <h2 className="">{heading}</h2>
        </div>
    );
};
