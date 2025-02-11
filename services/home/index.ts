import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchAdminRole(){
    const isAdminRole = await prisma.user.findMany({
        include:{
            role: true
        }
    })
    if(isAdminRole.length != 0){
        return true;
    }
    return false;
}

export async function registerAdmin(details:any){
    try{

        const company = await prisma.company.create({
            data:{
                companyName:details.companyName,
                companyAbbreviation:details.companyAbbreviation
            }
        })
        if(company){
            const role = await prisma.role.create({
                data:{
                    role: "ADMIN",
                    description:"Can acess all the features of the application",
                    status:"ACTIVE"
                }
            })
            if(role){
                const admin = await prisma.user.create({
                    data:{
                        username: details.username,
                        email: details.email,
                        password: details.password,
                        roleId: role.roleId,
                        status:"ACTIVE"
                    }
                })
                if(admin){
                    return admin.userId;
                }
                return -1;
            }
            return -1;
        }
        
        return -1;
    }catch(error){
        console.log(error);
    }
}

export async function login(details:any){

    try{
        const user = await prisma.user.findMany({
            where:{
                username: details.username,
                email: details.email,
                password: details.password
            }
        })
        if(user.length!=0){
            return user[0].userId;
        }
        return -1;
    }catch(error){
        console.log(error);
    }

}

