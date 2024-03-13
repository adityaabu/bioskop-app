import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
    name: "history",
    initialState: {
        data: JSON.parse(localStorage.getItem('Transaction') || 'null') || [],
    },
    reducers: {
        addToHistory: (_state, _action) => {
            console.log(JSON.stringify(_action))
            const payload = _action.payload
            const itemInHistoryByDate = _state.data.find(
                (item: { movieDate: string; }) => item.movieDate === payload.movieDate
            )
            if (itemInHistoryByDate){
                const itemInFilmList = itemInHistoryByDate.movieList.find(
                    (item: { movieName: string; }) => item.movieName === payload.movieList[0].movieName
                )
                if (itemInFilmList){
                    itemInFilmList.totalTicket =itemInFilmList.totalTicket + parseInt(payload.movieList[0].totalTicket)
                    itemInHistoryByDate.totalTicketAll = itemInHistoryByDate.totalTicketAll + parseInt(payload.movieList[0].totalTicket)
                    itemInHistoryByDate.totalTransaction = itemInHistoryByDate.totalTicketAll + (payload.movieList[0].totalTicket * payload.movieList[0].priceTicket)
                } else {
                    itemInHistoryByDate.movieList.push({
                        totalTicket: parseInt(payload.movieList[0].totalTicket), 
                        movieName: payload.movieList[0].movieName, 
                        priceTicket: payload.movieList[0].priceTicket}
                    )
                    itemInHistoryByDate.totalTicketAll = itemInHistoryByDate.totalTicketAll + parseInt(payload.movieList[0].totalTicket)
                    itemInHistoryByDate.totalTransaction = itemInHistoryByDate.totalTicketAll  + (parseInt(payload.movieList[0].totalTicket) *  payload.movieList[0].priceTicket)
                }
            } else{
                _state.data.push(payload)
            }

            localStorage.setItem('Transaction', JSON.stringify(_state.data))
        }
    }
})

export const {addToHistory} = historySlice.actions
export default historySlice.reducer
