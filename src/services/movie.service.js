import axios from "axios";

export const getMovies = (callback, search) => {
    axios.get(`http://www.omdbapi.com/?s=${search}&apikey=d592fe1a`)
    .then((res) => {
        callback(res.data.Search)
    })
    .catch((err) =>{
        console.log(err)
    })
}