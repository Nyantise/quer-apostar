import { Credential} from '@prisma/client';
import { CreateCredential } from '@/schema';
import credentialRepository from '@/repository/credential-repository';
import { cryptrThis, decryptrThis } from '@/util/cryptr';
import { cantAccessThis, couldntFindAny, notFoundError } from '@/error';

export async function create(body: CreateCredential): Promise<Credential> {
    const hashPass = cryptrThis(body.password)
    body.password = hashPass

    return await credentialRepository.create(body)
}


async function gotcha(userId:number, id?:number): Promise<Credential[] | Credential> {
  let resp:Credential[]
  if(!id){
    const query = await credentialRepository.findAll(userId)
    if(query.length === 0)throw couldntFindAny("Credential")
    resp = query
  }
  if(!resp){  
    const query = await credentialRepository.findById(id)
    if(!query)throw couldntFindAny("Credential")
    if(query.userId !== userId)throw cantAccessThis("Credential")
    resp = [query]
  }
  resp.forEach(item => {
    const unhashPass = decryptrThis(item.password)
    item.password = unhashPass
  })
  if(resp.length === 1) return resp[0]
  return resp
}

export async function deleteById(userId:number, id:number): Promise<Credential> {
  const query = await credentialRepository.findById(id)
  if(!query)throw notFoundError()
  if(query.userId !== userId)throw cantAccessThis("Credential")
  const resp = await credentialRepository.deleteById(userId, id)
 
  return resp
}


const credentialService = {
  gotcha,
  create,
  deleteById
};

export default credentialService;