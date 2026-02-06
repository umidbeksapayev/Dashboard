import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { loginRequest, registerRequest } from "@/features/auth/api/authApi";
import { useAuthStore } from "@/features/auth/model/authStore";
import { useToastStore } from "@/shared/ui/toast";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  fullName: z.string().min(3).optional()
});

type FormValues = z.infer<typeof schema>;

export function LoginForm(): JSX.Element {
  const [mode, setMode] = useState<"login" | "register">("login");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const showToast = useToastStore((state) => state.show);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", fullName: "" }
  });

  const loginMutation = useMutation({
    mutationFn: (values: FormValues) => loginRequest({ username: values.email, password: values.password }),
    onSuccess: (data) => {
      login(data.token, data.user);
      showToast("Login successful");
      navigate("/");
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const [firstName, ...rest] = (values.fullName ?? "User").split(" ");
      return registerRequest({ firstName, lastName: rest.join(" ") || "New", email: values.email, password: values.password });
    },
    onSuccess: () => {
      showToast("Register successful. Please login.");
      setMode("login");
    }
  });

  const onSubmit = (values: FormValues): void => {
    if (mode === "login") {
      loginMutation.mutate(values);
      return;
    }
    registerMutation.mutate(values);
  };

  return (
    <Card className="mx-auto mt-20 w-full max-w-md space-y-4">
      <div className="flex gap-2">
        <Button variant={mode === "login" ? "default" : "outline"} onClick={() => setMode("login")} type="button">
          Login
        </Button>
        <Button variant={mode === "register" ? "default" : "outline"} onClick={() => setMode("register")} type="button">
          Register
        </Button>
      </div>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        {mode === "register" && (
          <div>
            <Input placeholder="Full name" {...register("fullName")} />
          </div>
        )}
        <div>
          <Input placeholder="Email or username" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div>
          <Input placeholder="Password" type="password" {...register("password")} />
          {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
        </div>
        {(loginMutation.isError || registerMutation.isError) && <p className="text-xs text-destructive">Request failed</p>}
        <Button className="w-full" type="submit" disabled={loginMutation.isPending || registerMutation.isPending}>
          {mode === "login" ? "Sign in" : "Create account"}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground">Use DummyJSON credentials: emilys / emilyspass</p>
    </Card>
  );
}
