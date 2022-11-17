import React from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const AlreadyLoggedIn: React.FC = () => {
  const router = useRouter();

  const onSignOut = () => {
    toast.success("Signed out successfully!");

    sessionStorage.removeItem("userInfo");

    router.push("/");
  };

  return (
    <section className="flex flex-col gap-3">
      <h1>You are already logged in!</h1>
      <Link className="link link-accent" href="/">
        Back to home
      </Link>
      <button className="btn btn-error" onClick={onSignOut}>
        Sign out
      </button>
    </section>
  );
};

export default AlreadyLoggedIn;
