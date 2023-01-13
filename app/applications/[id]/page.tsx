import Link from 'next/link';

async function getApplication(id: string) {
  const accessToken = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFhN2E5MzhhLTliZTUtNDMxZS1jMjJlLTA4ZGFmMWI1ZTAyNyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InVzZXIxQGV4YW1wbGUuY29tIiwiZXhwIjoxNjczMjk1NjY4fQ.rv5MZtAaV_dCmFXjHWC7r3bk3yo_EFDTBJONHsdnwUkDwBKjc-2bikmcAKU8w1ePFVPHpARaUGPpkcw_v4zrzw";
  // return fetch('http://localhost:59429/Logs/GetAll', 
  // { 
  //   cache: 'no-store' ,
  //   method: 'GET',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + accessToken,
  //   }
  // }).then(res => res.json());
  const res = await fetch('http://localhost:5000/Application/Get?id=' + id, 
  { 
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    }
  });
  const data = await res.json();
  return data as any;
}

export default async function ApplicationPage({params} : any) {
  const application = await getApplication(params.id);
  
  return(
    <div>
      <h1>Application</h1>
      <div>
        <Application key={application.id} app={application} />
      </div>
    </div>
  );
}

function Application({ app }: any) {
  const { id, denomination } = app || {};

  return (
    <div>
      <h5>{id}</h5>
      <h2>{denomination}</h2>
    </div>
  );
}