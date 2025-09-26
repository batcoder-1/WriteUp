import React,{useId} from "react";
const Input=React.forwardRef(function Input({
    label,
    type = "text",
    placeholder = "",
    className = "",
    ...props
}, ref)// refernce is passed to input component so that we can use it in form
 {
    const id=useId();
    return(
        <>
        <div className="w-full">
        {label && (
            <label htmlFor={id} className="block text-sm font-medium text-gray700 mb-1">
                {label}
            </label>
        )}
        <input
            ref={ref}
            type={type}
            id={id}
            placeholder={placeholder}
            className={`border border-gray300 rounded-md p-2 w-full ${className}`}
            {...props}
        />
        </div>
        </>
    )
})
export default Input;