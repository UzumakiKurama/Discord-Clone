import ServerSideBar from '@/components/server/server-sidebar';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const ServerIdLayout = async ({
    children,
    params,
}:{ 
    children: React.ReactNode;
    params: { serverId:string }; 
}) => {
    const profile = await currentProfile();

    if(!profile){
        return redirectToSignIn();
    }

    const server = await db.server.findUnique({
        where:{
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if(!server){
        return redirect("/");
    }

  return (
    <div className='h-full'>
        <div className='hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0'>
            <ServerSideBar serverId={params.serverId} /> 
        </div>
        <div className='h-full md:pl-60'>
            {children}
        </div>
    </div>
  );
}

export default ServerIdLayout
