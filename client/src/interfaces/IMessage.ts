import IUser from "./IUser";


export default interface IMessage{
    id:string,
    value:string,
    user:IUser,
    timestamp:string
}