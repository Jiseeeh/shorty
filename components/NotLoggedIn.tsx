import React from "react";
import Link from "next/link";

const NotLoggedIn: React.FC = () => {
  return (
    <section className="flex flex-col gap-3 text-center">
      <h1 className="font-bold text-2xl">❗Please sign up or login first❗</h1>
      <Link className="link link-accent" href="/signUp">
        Sign up
      </Link>
      <Link className="link link-accent" href="/login">
        Login
      </Link>
    </section>
  );
};

export default NotLoggedIn;
