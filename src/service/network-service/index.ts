import { Network } from '@prisma/client';
import { cryptrThis, decryptrThis } from '@/util/cryptr';
import { CreateNetwork } from '@/schema/network-schema';
import networkRepository from '@/repository/network-repository';
import { cantAccessThis, couldntFindAny, notFoundError } from '@/error';


export async function create(body: CreateNetwork): Promise<Network> {
    const hashPass = cryptrThis(body.password)
    body.password = hashPass

    return await networkRepository.create(body)
}


async function gotcha(userId:number, id?:number): Promise<Network | Network[]> {
  let resp:Network[]
  if(!id){
    const query = await networkRepository.findAll(userId)
    if(query.length === 0)throw couldntFindAny("Network")
    resp = query
  }
  if(!resp){  
    const query = await networkRepository.findById(id)
    if(!query)throw couldntFindAny("Network")
    if(query.userId !== userId)throw cantAccessThis("Network")
    resp = [query]
  }
  resp.forEach(item => {
    const unhashPass = decryptrThis(item.password)
    item.password = unhashPass
  })
  if(resp.length === 1) return resp[0]
  return resp
}


export async function deleteById(userId:number, id:number): Promise<Network> {
  const query = await networkRepository.findById(id)
  if(!query)throw notFoundError()
  if(query.userId !== userId)throw cantAccessThis("Credential")
  const resp = await networkRepository.deleteById(userId, id)
 
  return resp
}


const networkService = {
  gotcha,
  create,
  deleteById
};

export default networkService;