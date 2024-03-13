import { FormEvent, useState } from "react";
import InputForm from "../Elements/Input";
import { getMovies } from "../../services/movie.service";
import { addToHistory } from "../../Redux/slices/historySlice";
import { useDispatch } from "react-redux";

const FormInput = () => {
    const [movieList, setMovieList] = useState([])

    const dispatch = useDispatch();
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
        }
            ,(event.currentTarget.previousSibling as HTMLFormElement)!.value
            
        );
      };

    const handlesubmit: (event: FormEvent<HTMLFormElement>) => void = (event) => {
        if (event) {
            event.preventDefault();
            const totalTicket = parseInt(((event.target as HTMLFormElement) as HTMLFormElement).totalTicket.value)
            const movieName = (event.target as HTMLFormElement).selectMovie.value
            const movieDate = (event.target as HTMLFormElement).movieDate.value
            const htmSunday = parseInt((event.target as HTMLFormElement).htmSunday.value)
            const htmFriSat = parseInt((event.target as HTMLFormElement).htmFriSat.value)
            const htmMonThu = parseInt((event.target as HTMLFormElement).htmMonThu.value)
            var errorMessage = ''
            var validate = true
            if (totalTicket <= 0 || totalTicket == null || totalTicket == undefined || Number.isNaN(totalTicket)) {
                errorMessage = 'Silahkan Masukan Jumlah Tiket Terlebih Dahulu'
                validate = false;
            }
            else if (!movieName || movieName == null || movieName == undefined) {
                errorMessage= 'Silahkan Pilih Film Terlebih Dahulu'
                validate = false;
            }
            else if (!movieDate || movieDate == null || movieDate == undefined) {
                errorMessage= 'Silahkan Pilih Tanggal Terlebih Dahulu'
                validate = false;
            }
            else if (htmSunday == 0 || htmFriSat == 0 || htmMonThu == 0 || htmSunday == null || htmFriSat == null || htmMonThu == null || htmSunday == undefined || htmFriSat == undefined || htmMonThu == undefined || Number.isNaN(htmSunday) || Number.isNaN(htmFriSat) || Number.isNaN(htmMonThu)) {
                errorMessage= 'Silahkan Klik Tombol Pilih Pada Pilih Tanggal. HTM Tidak Boleh 0'
                validate = false;
            }
            if (validate){
                const date = new Date((event.target as HTMLFormElement).movieDate.value);
                const day = date.getDay();
                var htm = 0
                switch(day) {
                    case 0:
                        htm = parseInt((event.target as HTMLFormElement).htmSunday.value)
                        break;
                    case 5:
                    case 6:
                        htm = parseInt((event.target as HTMLFormElement).htmFriSat.value)
                        break;
                    default:
                        htm = parseInt((event.target as HTMLFormElement).htmMonThu.value)
                }

                const data = {
                    movieDate: (event.target as HTMLFormElement).movieDate.value,
                    movieList:[{
                        totalTicket: parseInt((event.target as HTMLFormElement).totalTicket.value), 
                        movieName: (event.target as HTMLFormElement).selectMovie.value, 
                        priceTicket: htm
                    }],
                    totalTicketAll: parseInt((event.target as HTMLFormElement).totalTicket.value),
                    totalTransaction: (parseInt((event.target as HTMLFormElement).totalTicket.value) * htm)
                }

                dispatch(addToHistory(data));
                (document.getElementById("form") as HTMLFormElement)?.reset();
                setMovieList([])
            } else {
                alert(errorMessage)
            }
            
        }
    }


    const handleGetPrice : React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        const selectedMovie = event.currentTarget.form?.selectMovie.value;
        const date = new Date((event.currentTarget.previousSibling as HTMLFormElement)!.value);

        if (!selectedMovie){
            alert("Silahkan Pilih Film Terlebih Dahulu.")
        }

        if (!date){
            alert("Silahkan Pilih Tanggal Terlebih Dahulu.")
        } 
    };

    return(
        <div className="p-6 bg-sky-100 rounded">
            <form id="form"className="flex flex-col justify-center" onSubmit={(e) => (handlesubmit(e))}>
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
                onClick={(e) => handleGetMovie((e))}/>
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
                onClick={(e) => handleGetPrice((e))}/>
            
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