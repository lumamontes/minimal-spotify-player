'use client';
import { UserAuthForm } from "@/components/user-auth-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div
      className={`relative flex h-screen w-screen flex-col justify-center`}
    >
      <div className="flex w-full flex-col space-y-6 md:max-w-[350px] md:mx-auto text-center">
        <Image
          src="/hero.png"
          width={300}
          height={300}
          className="mx-auto border-2 border-gray-200 object-cover"
          alt="logo"
        />
        <h1 className="text-2xl">Spotify Player</h1>
        <UserAuthForm />
      </div>
    </div>
  );
}
