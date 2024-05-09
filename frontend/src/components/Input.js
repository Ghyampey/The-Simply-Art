const Input = ({type,placeholder,register,defaultValue,value,disabled}) => {
    return (
        <input
            className="w-[100%] md:w-[440px] shadow-in h-[45px] placeholder-[#9F7E7E] px-[30px]"
            type={type}
           value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            {...register}
        />
    );
};

export const Textarea = ({type,placeholder,register,defaultValue,value}) => {
    return (
        <textarea
            className="w-[440px] shadow-in h-[200px] placeholder-[#9F7E7E] px-[30px]"
            type={type}
           
            defaultValue={defaultValue}
            placeholder={placeholder}
            {...register}
        />
    );
};

export default Input
