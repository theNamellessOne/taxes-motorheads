"use client";

import { Tab, Tabs } from "@nextui-org/tabs";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Logo } from "~/components/logo";
import { Yeon_Sung } from "next/font/google";

const font = Yeon_Sung({ subsets: ["latin"], weight: "400" });

export function AuthTabs() {
  return (
    <Card className={"mt-32 w-full max-w-[600px]"}>
      <CardHeader className={"bg-primary items-center justify-center gap-4"}>
        <Logo className={"fill-primary-foreground"} />
        <h1
          className={`text-primary-foreground text-2xl font-semibold ${font.className}`}
        >
          Texas Motorheads
        </h1>
      </CardHeader>
      <CardBody>
        <Tabs
          aria-label="Authorization"
          size={"lg"}
          radius={"sm"}
          classNames={{
            base: "flex flex-col items-center",
            tabList: "w-full",
            panel: "px-0",
          }}
        >
          <Tab key="login" title="Sign In">
            <LoginForm />
          </Tab>
          <Tab key="register" title="Sign Up">
            <RegisterForm />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
