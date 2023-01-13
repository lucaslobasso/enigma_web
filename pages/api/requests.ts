import jwt_decode, { JwtPayload } from "jwt-decode";
import { signIn } from "next-auth/react";

export type JwtObject = JwtPayload & {
  email?: string;
  accessToken?: string;
}

type AuthorizationUser = {
  email   : string, 
  password: string
}

export async function authorizeRequest(user : AuthorizationUser, isNewUser : boolean = false) : Promise<JwtObject | null> {
  const url = process.env.ENIGMA_API_URL + (isNewUser ? "Register" : "Login");
  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const token = await request.text();

  if (request.ok && token) {
    const jwt = jwt_decode<JwtObject>(token);
    jwt.accessToken = token;

    return jwt;
  } 
  else {
    return null;
  }
}

export async function login(email : string, password : string) {
  const url = new URL(location.href);
  const callbackUrl = url.searchParams.get("callbackUrl");
  
  await signIn("credentials", {
    email: email,
    password: password,
    redirect: true,
    callbackUrl: callbackUrl ? callbackUrl : "/",
  });
}

export async function register(email : string, password : string) {
  const url = new URL(location.href);
  const callbackUrl = url.searchParams.get("callbackUrl");
  const user : AuthorizationUser = {
    email,
    password
  }

  await authorizeRequest(user, true);
  await signIn("credentials", {
    email: email,
    password: password,
    redirect: true,
    callbackUrl: callbackUrl ? callbackUrl : "/",
  });
}

export async function getRequest(endpoint : string, token: string, useCache : boolean = true) {
  const url = "http://localhost:5000/";
  const res = await fetch(url + endpoint, { 
    cache: useCache ? null : 'no-store',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });
  const data = await res.json();

  return data;
}

export async function postRequest(endpoint : string, token: string, json: string) {
  const url = "http://localhost:5000/";
  const res = await fetch(url + endpoint, { 
    method: 'GET',
    headers: {
      'Accept': 'text/plain',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: json
  });
  const data = await res.text();

  return data;
}