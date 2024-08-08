"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/checkbox";
import ship from "../public/ship.png";
import logo from "../public/logo.svg";
import continueWithGoogle from "../public/continue-with-google.svg";
import singInWithGoogle from "../public/sing-in-with-google.svg";

const SignUpForm = () => (
  <form>
    <div className="mb-4">
      <label
        htmlFor="username"
        className="block text-sm font-medium text-gray-700"
      >
        Username
      </label>
      <input
        type="text"
        id="username"
        className="mt-1 p-3 block w-full border border-gray-300 rounded-md"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email
      </label>
      <input
        type="email"
        id="email"
        className="mt-1 p-3 block w-full border border-gray-300 rounded-md"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        className="mt-1 p-3 block w-full border border-gray-300 rounded-md"
      />
    </div>
    <Button
      type="submit"
      className="w-full bg-green-500 text-white py-3 px-4 rounded-md text-lg"
    >
      Join
    </Button>
  </form>
);

const LoginForm = () => (
  <form>
    <div className="mb-4">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email
      </label>
      <input
        type="email"
        id="email"
        className="mt-1 p-3 block w-full border border-gray-300 rounded-md"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        className="mt-1 p-3 block w-full border border-gray-300 rounded-md"
      />
    </div>
    <div className="flex my-2 text-black">
      <Checkbox radius="sm" color="primary"></Checkbox>
      <p>Remember me</p>
    </div>
    <div className="flex my-2">
      <p className="text-gray-400">
        This site is protected by reCAPTCHA and the Google
        <span className="text-green-500 inline"> Privacy Policy</span> and
        <span className="text-green-500 inline"> Terms of Service </span>
        apply.
      </p>
    </div>

    <Button
      type="submit"
      className="w-full bg-green-500 text-white py-3 px-4 rounded-md text-lg"
    >
      Log in
    </Button>
  </form>
);

export default function Register() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 z-0">
        <Image
          src={ship}
          layout="fill"
          objectFit="cover"
          alt="Background Image"
          priority
        />
        <div className="absolute inset-0 bg-[#232323B2]"></div>
      </div>
      <div className="relative z-10 flex items-center justify-center h-full ">
        <div className="w-4/5 h-4/5 flex bg-white bg-opacity-80 rounded-xl overflow-hidden shadow-lg">
          <Card className="w-full md:w-1/3 p-8 flex flex-col justify-center bg-white">
            <CardHeader className="flex justify-center mb-4">
              <Image src={logo} alt="Logo" width={150} height={150} />
            </CardHeader>
            <CardBody className="bg-white">
              <div className="flex justify-center mb-4">
                <h2
                  className={`text-2xl font-bold cursor-pointer ${
                    isSignUp ? "text-green-500" : "text-gray-500"
                  }`}
                  onClick={() => setIsSignUp(true)}
                >
                  Sign up
                </h2>
                <h2 className="mx-4 hidden md:inline">|</h2>
                <h2
                  className={`text-2xl font-bold cursor-pointer ${
                    !isSignUp ? "text-green-500" : "text-gray-500"
                  } hidden md:inline`}
                  onClick={() => setIsSignUp(false)}
                >
                  Log in
                </h2>
              </div>
              <div>
                <button
                  type="button"
                  className="w-full h-20 flex items-center justify-center p-0 rounded-md overflow-hidden border-none"
                >
                  <Image
                    src={isSignUp ? singInWithGoogle : continueWithGoogle}
                    alt="Google"
                    className="w-90% h-90%"
                    style={{ objectFit: "cover" }}
                  />
                </button>
              </div>

              {isSignUp ? (
                <SignUpForm />
              ) : (
                <div className="hidden md:block">
                  <LoginForm />
                </div>
              )}
              <div className="text-center mt-1 ">
                {isSignUp ? (
                  ""
                ) : (
                  <Button className="text-green-500 bg-white hidden md:inline">
                    Forgot password?
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
          <div className="w-2/3 relative hidden md:block">
            <Image
              src={ship}
              alt="Ship Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
