import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { UserLoginInput, userLoginSchema } from "~/schema/user-schema";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "~/server/service/auth-service";

export function LoginForm() {
  const form = useForm<UserLoginInput>({
    mode: "onChange",
    resolver: zodResolver(userLoginSchema),
  });
  const { isSubmitting, errors, isValid } = form.formState;
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (data: UserLoginInput) => {
    try {
      await signIn(data);
      toast.success("Logging you in..", { autoClose: 1000 });
    } catch (e) {
      toast.error(String(e));
    }
  };

  return (
    <div className={"flex flex-col gap-3"}>
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
        Sign In
      </Button>
    </div>
  );
}
