import Label from "./Label"
import Input from "./Input"
import Button from "../Button"
import { FC } from "react"

interface IPropsInputForm {
    label: string
    name: string
    type: string
    placeholder: string
    fieldSize?: string
    withButton?: boolean
    buttonName?: string
    buttontype?: "button"|"submit"|"reset"|undefined;
    btnColor?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
    movieList?: any
    defValueNum?: number}

const InputForm : FC<IPropsInputForm> = (props) => {
    const {
        label, 
        name, 
        type, 
        placeholder, 
        fieldSize="w-full", 
        withButton=true, 
        buttonName, 
        buttontype="button",
        btnColor= 'bg-gradient-to-r from-pink-600 to-red-600',
        onClick,
        movieList,
        defValueNum
    } = props
    
    if (withButton == false) {
        if (type == "HTM"){
            return(
                <div id={`divInputHTM-${name}`} className="flex justify-between items-center mb-3">      
                    <Label htmlFor={name}>{label}</Label>
                    <Input name={name} type="number" placeholder={placeholder} fieldSize={fieldSize} defValueNum={defValueNum}/>
                </div>
                
            )
        }
        return (
            <div id={`divInput-${name}`}>
                <Label htmlFor={name}>{label}</Label>
                <div className="flex justify-between items-center mb-3">      
                    <Input name={name} type={type} movieList={movieList} placeholder={placeholder} fieldSize={fieldSize} defValueNum={defValueNum}/>
                </div>
            </div>
        )
    }

    return (
        <div id={`divInput-${name}`}>
            <Label htmlFor={name}>{label}</Label>
            <div className="flex justify-between items-center mb-3">      
                <Input name={name} type={type} placeholder={placeholder} fieldSize={fieldSize} defValueNum={defValueNum}/>
                <Button type={buttontype} onClick={onClick} btnColor={btnColor}>{buttonName}</Button>
            </div>
        </div>
    )
}

export default InputForm