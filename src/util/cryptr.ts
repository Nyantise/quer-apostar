import Cryptr from 'cryptr';
const cryptr = new Cryptr(process.env.CRYPTR_SERCRET);

export function cryptrThis(str:string){
    return cryptr.encrypt(str);
}
export function decryptrThis(str:string){
    return cryptr.decrypt(str);
}