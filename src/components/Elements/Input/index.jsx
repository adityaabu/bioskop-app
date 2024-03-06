import Label from "./Label"
import Input from "./Input"
import Button from "../Button"


const InputForm = (props) => {
    const {
        label, 
        name, 
        type, 
        placeholder, 
        fieldSize="w-full", 
        withButton=true, 
        buttonName, 
        buttontype,
        btnColor= 'bg-gradient-to-r from-pink-600 to-red-600',
        onClick,
        movieList,
        defValueNum
    } = props
    
    if (withButton == false) {
        if (type == "HTM"){
            return(
                <div name={`divInputHTM-${name}`} className="flex justify-between items-center mb-3">      
                    <Label htmlFor={name}>{label}</Label>
                    <Input id={`inputHTM-${name}`} name={name} type="number" placeholder={placeholder} fieldSize={fieldSize} defValueNum={defValueNum}/>
                </div>
                
            )
        }
        return (
            <div name={`divInput-${name}`}>
                <Label htmlFor={name}>{label}</Label>
                <div className="flex justify-between items-center mb-3">      
                    <Input id={`input-${name}`} name={name} type={type} movieList={movieList} placeholder={placeholder} fieldSize={fieldSize} defValueNum={defValueNum}/>
                </div>
            </div>
        )
    }

    return (
        <div name={`divInput-${name}`}>
            <Label htmlFor={name}>{label}</Label>
            <div className="flex justify-between items-center mb-3">      
                <Input id={`input-${name}`} name={name} type={type} placeholder={placeholder} fieldSize={fieldSize} defValueNum={defValueNum}/>
                <Button type={buttontype} onClick={onClick} btnColor={btnColor}>{buttonName}</Button>
            </div>
        </div>
    )
}

export default InputForm