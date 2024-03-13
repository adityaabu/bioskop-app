import { useSelector } from "react-redux";

interface ITransactionItem{
    movieDate: any;
    movieList: any[];
    totalTicketAll: number;
    totalTransaction: { toLocaleString: (arg0: string, arg1: { style: string; currency: string; }) => string};
}

interface IMovie{
    movieName: string;
    totalTicket: number;
    priceTicket: number;
}

const History = () => {

    const transaction = useSelector((state : any) => state.history.data)
    const formatDate = (value: string ) => {
        
        let date = new Date(value);
        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        return day + ' ' + month + ' ' + year;
    };
    
    return(
        <div className="flex w-1/2 flex-col p-4 bg-red-100 rounded">
            {
                transaction.length > 0 && 
                transaction.map(
                    (item: ITransactionItem) => (
                <div key={self.crypto.randomUUID()}className="flex w-full flex-col m-1 p-1 bg-yellow-100 rounded">
                    <table className="text-left table-auto border-separate border-spacing-x-5">
                        <thead>
                            <tr>
                                <td><b>{formatDate(item.movieDate)}</b></td>
                            </tr>

                            <tr className="h-5"><td></td></tr>

                            <tr>
                                <th>Judul Film</th>
                                <th>Total Tiket</th>
                                <th>HTM</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.movieList.length > 0 && 
                                item.movieList.map((movie: IMovie) => {
                                return (
                                    <tr key={self.crypto.randomUUID()}>
                                        <td>{movie.movieName}</td>
                                        <td>{movie.totalTicket}</td>
                                        <td>{movie.priceTicket.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</td>
                                        <td>{(movie.totalTicket * movie.priceTicket).toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</td>
                                    </tr>
                                )
                            })}
                            <tr className="h-5"><td></td></tr>
                            <tr>
                                <td><b>Total Pendapatan</b></td>
                            </tr>
                            <tr>
                                <td>Total Tiket Terjual:</td>
                                <td>
                                    {item.totalTicketAll}
                                </td>
                            </tr>
                            <tr>
                                <td>Total Pendapatan:</td>
                                <td>
                                    {item.totalTransaction.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}

export default History