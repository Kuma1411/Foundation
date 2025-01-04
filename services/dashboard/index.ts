import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchUserById(userId: string){
    
    try{
        const userDetails = await prisma.user.findUnique({
            where:{
                userId: userId
            }
        })
        if(userDetails){
            return userDetails
        }
        return -1;
    }catch(error){
        console.log(error);
    }
}

export async function fetchAllUsers(){
    try{
        const allUsers = await prisma.user.findMany()
        return allUsers;
    }catch(error){
        console.log(error)
    }
}