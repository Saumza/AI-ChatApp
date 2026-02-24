import { useId } from "react";
import { Input } from "./ui/input.jsx";

export function InputField({
    label,
    type,
    classname,
    ref,
    placeholder,
    ...props
}) {
    const id = useId()
    return (
        <div className="flex flex-col gap-1">


            {label &&
                <label id={id} className="font-mono">
                    {label}
                </label>}

            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                className={classname}
                {...props}
            />

        </div>
    )
}