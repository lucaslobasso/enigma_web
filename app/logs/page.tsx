"use client";

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRequest, JwtObject } from '../../pages/api/requests';

export default function LogsPage() {
  const { data: session } = useSession();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const user  = session?.user as JwtObject;
    const token = user?.accessToken;

    if(token) {
      getRequest("Log/GetAll", token, false)
        .then(value => {setLogs(value)});
    }
  }, [session])


  return(
    <div>
      <h1>Logs</h1>
      <div>
        {logs?.map((log) => {
          return <Log key={log.id} log={log} />;
        })}
      </div>
    </div>
  );
}

function Log({ log }: any) {
  const { id, level, message } = log || {};

  return (
    <Link href={`/logs/${id}`}>
      <div>
        <h2>{level}</h2>
        <h5>{message}</h5>
      </div>
    </Link>
  );
}