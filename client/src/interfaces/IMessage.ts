import { FieldValue } from "firebase/firestore";
import IUser from "./IUser";


export default interface IMessage{
    id?:string,
    value:string,
    user:IUser,
    createdAt: FieldValue,
    channel?:string
}