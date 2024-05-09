export const Select = ({ text, options, register, defaultValue, onChange }) => {
    return (
        <select
            className="w-[150px] xl:w-[180px] rounded-[50px] xl:rounded-none  h-[50px] xl:h-[70px] px-3 border-2  focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
            {...register}
            onChange={onChange}
        >
            <option value="">{text}</option>
            {options.map((item, i) => (
                <option key={i} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
};
