import { FC } from "react";

interface IPropsLabel {
    htmlFor: string
    children: string
}

const Label : FC<IPropsLabel> = (props) => {
    const {htmlFor, children} =props;
    return (
        <label id={`lbl${htmlFor}`} htmlFor={htmlFor} className="block text-slate-700 text-sm font-bold mb-2">
              {children}
        </label>
    )
}

export default Label