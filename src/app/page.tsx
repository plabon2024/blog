
import Home from '@/components/Home/Home'
import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'


export default async function page({ children }: { children: React.ReactNode }) {
  const user=await currentUser()
  if(!user)return null
  const loggedInUser=await prisma.user.findUnique({where:{clarkuserId:user.id}})
  if(!loggedInUser){
    await prisma.user.create({
      data:{
        name:user.fullName as string,
        clarkuserId:user.id,
        email:user.emailAddresses[0].emailAddress,
        imageUrl:user.imageUrl

      }
    }

    )
  }
  return (
    <div>

      <Home></Home>
      {children}
    </div>
  )
}
