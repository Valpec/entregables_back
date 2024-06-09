import { ticketsModel  } from "./models/ticket.js";
import { v4 as uuidv4} from 'uuid'

export default class TicketService { 
    constructor() {
        console.log('Working tickets with db persistance in mongdob')
    }

    createTicket = async (sumCart, userEmail) => {
        try{
            let currentDate = new Date()
            let dateTime = currentDate.getDate() + "/"
            + (currentDate.getMonth()+1)  + "/" 
            + currentDate.getFullYear() + " @ "  
            + currentDate.getHours() + ":"  
            + currentDate.getMinutes() + ":" 
            + currentDate.getSeconds();
            let generatedCode = uuidv4()

            let newTicket = new ticketsModel({
                code: generatedCode, 
                purchase_datetime: dateTime, 
                amount: sumCart, 
                purchaser: userEmail
            })

            await ticketsModel.create(newTicket)
            let result = await ticketsModel.findOne({code: generatedCode}).lean()
            console.log('el result desde el ticket servie', result)
            return result
        }catch(error){
            console.error(`Error creando ticket ${error}`)
        }
    }
}