"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { UserRegisterInput, userRegisterSchema } from "~/schema/user-schema";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { User } from "lucia";
import { updateUser } from "~/server/service/user-service";

export function UpdateDataForm(defaultValues: User) {
  const form = useForm<UserRegisterInput>({
    mode: "onChange",
    resolver: zodResolver(userRegisterSchema),
    defaultValues: { ...defaultValues, password: "" },
  });
  const { isSubmitting, errors, isValid } = form.formState;
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (data: UserRegisterInput) => {
    try {
      await updateUser(defaultValues.id, data);
      toast.success("Logging you in..", { autoClose: 1000 });
    } catch (e) {
      toast.error(String(e));
    }
  };

  return (
    <div className={"flex flex-col gap-2"}>
      <Input
        {...form.register("email")}
        label={"Email"}
        size={"sm"}
        type={"email"}
        isDisabled={isSubmitting}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
      />
      <Input
        {...form.register("username")}
        label={"Username"}
        size={"sm"}
        isDisabled={isSubmitting}
        isInvalid={!!errors.username}
        errorMessage={errors.username?.message}
      />
      <Input
        {...form.register("password")}
        label={"Password"}
        size={"sm"}
        type={showPassword ? "text" : "password"}
        isDisabled={isSubmitting}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        endContent={
          <Button
            isIconOnly
            variant={"light"}
            className={"-right-2 top-1"}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </Button>
        }
      />
      <Button
        isDisabled={!isValid || isSubmitting}
        color={"secondary"}
        isLoading={isSubmitting}
        onPress={() => form.handleSubmit(handleSubmit)()}
      >
        Save
      </Button>{" "}
    </div>
  );
}
