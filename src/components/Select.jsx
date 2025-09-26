import React ,{useId}from "react";
function Select({
    options=[],// we have taken default as an empty array so that it will not throw an error of reading value of null
    label,
    className="",// if we dont pass any classname then it will be an empty string otherwise it will be null which is also correct
    ...props
},ref){
    const id=useId();
return(
    <>
    <div className="w-full">
     {label&&<label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
    <select id={id} ref={ref} {...props} className={`${className} block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}>
        {options.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
    </select>
    </div>
    </>
)
}
export default React.forwardRef(Select);// This will allow us to use ref in the parent component