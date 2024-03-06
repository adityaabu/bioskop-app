import { useState } from "react";


const Input = (props) => {
    const {type, placeholder, name, fieldSize="w-full", movieList, defValueNum} = props;

    const [getNum,setNum] = useState(defValueNum)    
    if (type == "dropdown") {
        return (
            <select
                id={name} className={`block px-2 py-1.5 ${fieldSize} border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400`}
                placeholder={placeholder}
                name={name}>
                {movieList.length > 0 && movieList.map((movie) => (
                    <option key={movie.imdbID} value={movie.Title}>{movie.Title}</option>
                ))}
            </select>
        )
    } else if (type == "number"){
        return (
            <input
                id={name}
                type={type}
                className={`block px-2 py-1.5 ${fieldSize} border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400`}
                min = "0"
                placeholder={placeholder}
                name={name}
                value={getNum ? 0 || undefined: defValueNum}
                onChange={
                    e => {setNum(parseInt(e.target.value))}
                    
                }/>
        )

    } else if (type == "Date"){
    
        return (
            <input 
                id={name}
                type={type}
                className={`block px-2 py-1.5 ${fieldSize} border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400`}
                min={new Date().toISOString().split('T')[0]}
                placeholder={placeholder}
                name={name}/>
        )

    }
    
    return (
        <input 
            type={type}
            className={`block px-2 py-1.5 ${fieldSize} border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400`}
            placeholder={placeholder}
            name={name}
            id={name}
            itemID={name}/>
    )
}

export default Input