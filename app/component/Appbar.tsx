"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export function Appbar() {
    const session = useSession();


    return <div className="flex justify-between">
      <div>
        BeatNet
      </div>
      <div>
        {session.data?.user && <button className="m-2 p-2 bg-blue-500 text-amber-50" onClick={() => signOut()}>Logout</button>}
        {!session.data?.user && <button className="m-2 p-2 bg-blue-500 text-amber-50" onClick={() => signIn()}>Signin</button>}
      </div>
    </div>
}