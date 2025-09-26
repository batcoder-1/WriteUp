import React from "react";
function Button({
    children,
    bgcolor="bg-blue-500",
    textcolor="text-white",
    className = "",
    ...props// this is done so that if user pass any other props it will be passed to button component
}){
return (
    <>
      <button className={`px-4 py-2 rounded-lg ${bgcolor} ${textcolor} ${className}`} {...props}>{children}</button>
    </>
)
}
export default Button;
