import React from "react";
import { useDispatch } from "react-redux";
import { UpdatePost } from "../redux/userSlice";

const TextInput = React.forwardRef(
  (
    {
      type,
      placeholder,
      styles,
      label,
      labelStyles,
      register,
      name,
      error,
      onclick,
    },
    ref
  ) => {
    //console.log(placeholder);

    const dispatch = useDispatch();

    return (
      <div className="w-full flex flex-col mt-2">
        {label && (
          <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
        )}

        <div>
          {/* <div
            className={`bg-secondary rounded border border-[#66666690] 
            outline-none text-sm text-ascent-1 
            px-4 py-3 placeholder:text-ascent-2 ${styles}`}
            onClick={onclick}
          ></div> */}
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={`bg-secondary rounded border border-[#66666690] 
            outline-none text-sm text-ascent-1 
            px-4 py-3 placeholder:text-ascent-2 ${styles}`}
            {...register}
            aria-invalid={error ? "true" : "false"}
            // onClick={onclick}
            onFocus={onclick}
          />
        </div>
        {error && (
          <span className="text-xs text-[#f64949fe] mt-0.5 ">{error}</span>
        )}
      </div>
    );
  }
);

export default TextInput;
