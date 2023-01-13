"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { JwtObject, postRequest } from '../../../pages/api/requests';
import { useSession } from 'next-auth/react';

export default function CreateNote() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');

  //const router = useRouter();

  const create = async() => { 
    const user  = session?.user as JwtObject;
    const token = user?.accessToken;
    const data = JSON.stringify({
      Denomination: title,
    });

    await postRequest('Application/Create', token, data);

    setTitle('');

    //router.refresh();
  }

  return (
    <form onSubmit={create}>
      <h3>Create a new Application</h3>
      <input
        type="text"
        placeholder="Denomination"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">
        Create note
      </button>
    </form>
  );
}