"use client"

import { useState } from "react";
import { Button, message } from "antd";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple, FaGoogle } from "react-icons/fa";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ShadcnButton } from "./ui/button";
import { ChangeEvent, FocusEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


//Authentication
import GoogleLogin from './GoogleLogin'
import SignUp from "./SignUp";
import SignIn from './SignIn'


const Landing = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    username: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [id]: value }));
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setTouched((prevState) => ({ ...prevState, [id]: true }));
  };

  const isInputInvalid = (field: keyof typeof formState) =>
    touched[field] && !formState[field];


  //function for SignUp
  const handleSignup = () => {
    const signUpData = {email: formState.email, password: formState.password , username:formState.username}
    SignUp(signUpData);
  }
  const handleSignin = () => {
    const signInData = {email: formState.email, password: formState.password}
    SignIn(signInData);
  }

  return (
    <>
      <div className="container gap-20 md:flex-row flex-col mb-20 md:mb-2">
        <div className="mt-[100px]">
          <div className="title">
            <h1 className="text-5xl max-w-[500px]">Connect to people with</h1>
            <h2 className="text-[70px]">
              Nexter
              <span className="text-light-accent dark:text-dark-accent">.</span>
            </h2>
          </div>
          <div className="flex md:gap-3 mt-5 gap-1">
            <ShadcnButton className="gap-1 flex-col md:flex-row h-[60px] md:h-auto w-[50%] md:w-auto">
              <IoLogoGooglePlaystore className="w-5 h-5" /> Google Play Store
            </ShadcnButton>
            <ShadcnButton className="gap-1 flex-col md:flex-row h-[60px] md:h-auto w-[50%] md:w-auto">
              <FaApple className="w-5 h-5" /> App Store
            </ShadcnButton>
          </div>
        </div>

        <div className="md:w-[50%] mt-[30px] w-full">
          <Tabs
            className="w-full flex items-center flex-col"
            defaultValue="sign-in"
          >
            <TabsList>
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
              <Card className="w-full h-[460px] mt-5">
                <CardHeader className="mt-10">
                  <CardTitle className="text-center">Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="email" className="mb-3 mt-6">
                    Email
                  </Label>
                  <Input
                    className={`md:w-[80%] ${
                      isInputInvalid("email") ? "border-red-500" : ""
                    }`}
                    type="email"
                    required
                    placeholder="Enter your Email"
                    id="email"
                    value={formState.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Label htmlFor="password" className="mb-3 mt-6">
                    Password
                  </Label>
                  <Input
                    className={`md:w-[80%] ${
                      isInputInvalid("password") ? "border-red-500" : ""
                    }`}
                    type="password"
                    required
                    placeholder="Enter your Password"
                    id="password"
                    value={formState.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Button
                    className="mt-4"
                    disabled={!formState.email || !formState.password}
                    onClick={handleSignin}
                  >
                    Login
                  </Button>
                  <div className="flex gap-2 mt-3">
                    <ShadcnButton
                      className="mt-2 flex gap-2"
                      onClick={GoogleLogin}
                    >
                      <FaGoogle /> Login with Google
                    </ShadcnButton>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sign-up">
              <Card className="w-full h-[460px] mt-5">
                <CardHeader className="mt-2">
                  <CardTitle className="text-center">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="username" className="mb-3">
                    Username
                  </Label>
                  <Input
                    className={`md:w-[80%] ${
                      isInputInvalid("username") ? "border-red-500" : ""
                    }`}
                    type="text"
                    required
                    placeholder="username123"
                    id="username"
                    value={formState.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Label htmlFor="email" className="mb-3 mt-6">
                    Email
                  </Label>
                  <Input
                    className={`md:w-[80%] ${
                      isInputInvalid("email") ? "border-red-500" : ""
                    }`}
                    type="email"
                    required
                    placeholder="mail@example.com"
                    id="email"
                    value={formState.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Label htmlFor="password" className="mb-3 mt-6">
                    Password
                  </Label>
                  <Input
                    className={`md:w-[80%] ${
                      isInputInvalid("password") ? "border-red-500" : ""
                    }`}
                    type="password"
                    required
                    placeholder="•••••••••••"
                    id="password"
                    value={formState.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Button
                    className="mt-4"
                    disabled={
                      !formState.username ||
                      !formState.email ||
                      !formState.password
                    }
                    onClick={handleSignup}
                  >
                    Sign Up
                  </Button>
                  <div className="flex gap-2 mt-3">
                    <ShadcnButton
                      className="mt-2 flex gap-2"
                      onClick={GoogleLogin}
                    >
                      <FaGoogle /> Sign Up with Google
                    </ShadcnButton>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Landing;
