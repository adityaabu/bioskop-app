import { useState } from "react";
import InputForm from "../Elements/Input";
import { getMovies } from "../../services/movie.service";

const FormInput = () => {
    const [movieList, setMovieList] = useState([])

    const initialHTM = [
        { id: 'sun', price: 0},
        { id: 'monthu', price: 0 },
        { id: 'frisat', price: 0},
    ];

    const [getHtm, setHtm] = useState(initialHTM)
    const handleGetMovie: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        getMovies((data) => {
            if (data !== undefined ){
                setMovieList(data)
            }
        }
            ,event.currentTarget.previousSibling!.value
        );
      };

    const validateForm = (prop: { target: { totalTicket: { value: any; }; selectMovie: { value: any; }; movieDate: { value: any; }; htmSunday: { value: string; }; htmFriSat: { value: string; }; htmMonThu: { value: string; }; }; preventDefault: () => void; }) =>{
        const totalTicket = prop.target.totalTicket.value
        const movieName = prop.target.selectMovie.value
        const movieDate = prop.target.movieDate.value
        const htmSunday = parseInt(prop.target.htmSunday.value)
        const htmFriSat = parseInt(prop.target.htmFriSat.value)
        const htmMonThu = parseInt(prop.target.htmMonThu.value)
        var errorMessage = ''
        if (totalTicket<=0){
            errorMessage= 'Silahkan Masukan Jumlah Tiket Terlebih Dahulu'
        } else if (!movieDate){
            errorMessage= 'Silahkan Masukan Jumlah Tiket Terlebih Dahulu'
        } else if (!movieName){
            errorMessage= 'Silahkan Pilih Film Terlebih Dahulu'
        } else if (htmSunday == 0 || htmFriSat == 0 || htmMonThu == 0){
            errorMessage= 'Silahkan Klik Tombol Pilih Pada Pilih Tanggal. HTM Tidak Boleh 0'
        }
        if (errorMessage){
            alert(errorMessage)
            return false
        } else {
            return true
        }
    }


    const handlesubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {

        const historyItem = localStorage.getItem('Transaction');
        const history = historyItem ? JSON.parse(historyItem) : [];
        const totalTicket = parseInt(event.target.totalTicket.value)
        const movieName = event.target.selectMovie.value
        const movieDate = event.target.movieDate.value
        const htmSunday = parseInt(event.target.htmSunday.value)
        const htmFriSat = parseInt(event.target.htmFriSat.value)
        const htmMonThu = parseInt(event.target.htmMonThu.value)

        var errorMessage = ''
        var validate= true
        if (totalTicket<=0 || totalTicket == null || totalTicket == undefined){
            errorMessage= 'Silahkan Masukan Jumlah Tiket Terlebih Dahulu'
            validate = false;
        }
        else if (!movieName){
            errorMessage= 'Silahkan Pilih Film Terlebih Dahulu'
            validate = false;
        }
        else if (!movieDate){
            errorMessage= 'Silahkan Pilih Tanggal Terlebih Dahulu'
            validate = false;
        }
        else if (htmSunday == 0 || htmFriSat == 0 || htmMonThu == 0){
            errorMessage= 'Silahkan Klik Tombol Pilih Pada Pilih Tanggal. HTM Tidak Boleh 0'
            validate = false;
        }

        if (validate){
            const date = new Date(event.target.movieDate.value);
            const day = date.getDay();
            var htm = 0

            const listData = [];
            switch(day) {
                case 0:
                    htm = parseInt(event.target.htmSunday.value)
                break;
                case 5:
                case 6:
                    htm = parseInt(event.target.htmFriSat.value)
                break;
                default:
                    htm = parseInt(event.target.htmMonThu.value)
            }

            if(history.length>0){
                var i = history.findIndex((e: { movieDate: any; }) => e.movieDate==event.target.movieDate.value)
                const film = {
                    totalTicket: totalTicket,
                    movieName: event.target.selectMovie.value,
                    priceTicket: htm,
                }
                if (i >=0){
                    var j =history[i].movieList.findIndex((e: { movieName: any; })=> e.movieName==event.target.selectMovie.value)

                    history[i].totalTicketAll = history[i].totalTicketAll + totalTicket
                    history[i].totalTransaction = history[i].totalTransaction + (totalTicket * film.priceTicket)
                    if (j>=0){
                        history[i].movieList[j].totalTicket= history[i].movieList[j].totalTicket + film.totalTicket;
                    } else (history[i].movieList.push(film))
                } else{
                    const data = {
                        movieDate: event.target.movieDate.value,
                        movieList:[film],
                        totalTicketAll:film.totalTicket,
                        totalTransaction:(totalTicket * film.priceTicket)
                    }
                    history.push(data)     
                }
                    
    
                localStorage.setItem('Transaction', JSON.stringify(history))
            } else{
                const film = {
                    totalTicket: totalTicket,
                    movieName: event.target.selectMovie.value,
                    priceTicket: htm,
                }

                const data = {
                    movieDate: event.target.movieDate.value,
                    movieList:[film],
                    totalTicketAll:film.totalTicket,
                    totalTransaction:(totalTicket * film.priceTicket)
                }
                listData.push(data)
    
                localStorage.setItem('Transaction', JSON.stringify(listData))}

        } else {
            event.preventDefault();
            alert(errorMessage)
        }
    };

    const handleGetPrice : React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        const selectedMovie = event.currentTarget.form?.selectMovie.value;
        const date = new Date(event.currentTarget.previousSibling?.value);

        if (!selectedMovie){
            alert("Silahkan Pilih Film Terlebih Dahulu.")
        }

        if (!date){
            alert("Silahkan Pilih Tanggal Terlebih Dahulu.")
        } else {
            const htm = getHtm
            if (htm.find((o) => o.id == 'monthu')?.price == 0){
                htm.find((o) => o.id == 'monthu')!.price = 35000
            }
            if (htm.find((o) => o.id == 'frisat')?.price == 0){
                htm.find((o) => o.id == 'frisat')!.price = 40000
            }
            if (htm.find((o) => o.id == 'sun')?.price == 0){
                htm.find((o) => o.id == 'sun')!.price = 45000
            }
            setHtm(htm)
            console.log(htm)
        }
    };

    return(
        <div className="p-6 bg-sky-100 rounded">
            <form id="form"className="flex flex-col justify-center" onSubmit={handlesubmit}>
            <InputForm 
                label="Jumlah Tiket" 
                name="totalTicket" 
                type="number" 
                placeholder="0" 
                fieldSize="w-1/5" 
                withButton={true} 
                buttonName="Simpan" 
                buttontype="submit"
                onClick={() => {}}
                btnColor="bg-gradient-to-r from-green-600 to-green-800"/>
            <InputForm 
                label="Cari Film" 
                name="findFilm" 
                type="text" 
                placeholder="Masukan keyword yang di cari" 
                fieldSize="w-4/5" 
                withButton={true} 
                buttonName="Cari"
                onClick={handleGetMovie}/>
            <InputForm 
                label="Pilih Film" 
                name="selectMovie" 
                type="dropdown" 
                onClick={() => {}}
                placeholder="Silahkan Pilih Film" 
                movieList={movieList}
                withButton={false}/>
            <InputForm 
                label="Pilih Tanggal" 
                name="movieDate" 
                type="Date" 
                placeholder="dd/mm/yyyy" 
                fieldSize="w-4/5" 
                withButton={true} 
                buttonName="Pilih"
                onClick={handleGetPrice}/>
            
            <div className="mt-10">
                <a 
                    className="text-sm font-medium"><b>HTM</b>
                </a>
                <InputForm 
                    label="Senin - Kamis" 
                    name="htmMonThu" 
                    type="HTM" 
                    placeholder="0" 
                    withButton={false} 
                    fieldSize="w-2/5"
                    onClick={() => {}}
                    defValueNum={getHtm.find((o) => o.id == 'monthu')?.price}/>
                <InputForm 
                    label="Jumat - Sabtu" 
                    name="htmFriSat" 
                    type="HTM" 
                    placeholder="0" 
                    withButton={false} 
                    fieldSize="w-2/5"
                    onClick={() => {}}
                    defValueNum={getHtm.find((o) => o.id == 'frisat')?.price}/>
                <InputForm 
                    label="Minggu" 
                    name="htmSunday" 
                    type="HTM" 
                    placeholder="0" 
                    withButton={false} 
                    fieldSize="w-2/5"
                    onClick={() => {}}
                    defValueNum={getHtm.find((o) => o.id == 'sun')?.price}/>
            </div>
            
            </form>
        </div>    
    )
}

export default FormInput