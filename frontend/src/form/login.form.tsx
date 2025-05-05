"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { handleToast } from "@/utils/toast.util";
import { getRouter } from "@/utils/router.util";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Bạn cần nhập địa chỉ email"
    })
    .max(255),
  password: z
    .string()
    .min(1, {
      message: "Bạn cần nhập mật khẩu"
    })
    .max(255)
})

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectRoute = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "admin@example.com",
      password: "admin123456"
    }
  });

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    setIsLoading(true);
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((response) => {
      setIsLoading(false);
      if (response?.error) {
        handleToast(response.error);
      } else {
        window.location.href = redirectRoute || getRouter("top");
      }
    });
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)} >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Đăng nhập</h1>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          Đăng nhập
        </Button>
      </form>
    </Form >
  )
}

export default LoginForm