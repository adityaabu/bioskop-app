import { FC } from "react"

interface IPropsButton {
  children?: string
  btnColor?: string
  id?: string
  name?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  type?: 'button'|'submit'|'reset'|undefined
}

const Button : FC<IPropsButton> = (props) => {
    const {
      children = 'Button',
      btnColor, 
      onClick , 
      type = 'button'
    } = props
    return(
      <button  
        id={`btn-${children}`} 
        name={`btn-${children}`} 
        className={`px-4 py-1.5 ml-2 rounded-md shadow-lg ${btnColor} font-medium text-gray-100 block transition duration-300`} 
        onClick={onClick} 
        type={type}> 
        {children}
      </button>
    );
  };

  export default Button