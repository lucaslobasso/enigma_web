'use client'

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRequest, JwtObject } from '../../pages/api/requests';
import CreateNote from './create/page';

export default function ApplicationsPage() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const user  = session?.user as JwtObject;
    const token = user?.accessToken;

    if(token) {
      getRequest("Application/GetAll", token, false)
        .then(value => {setApplications(value)});
    }
  }, [session])

  return(
    <div>
      <h1>Applications</h1>
      <div>
        {applications?.map((app) => {
          return <Application key={app.id} app={app} />;
        })}
      </div>
      <CreateNote/>
    </div>
  );
}

function Application({ app }: any) {
  const { id, denomination } = app || {};

  return (
    <Link href={`/applications/${id}`}>
      <div>
        <h2>{denomination}</h2>
      </div>
    </Link>
  );
}