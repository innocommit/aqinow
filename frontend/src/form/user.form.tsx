"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Role, UserResponse } from "@/lib/api";
import { createUserMutation } from "@/lib/api/@tanstack/react-query.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const userSchema = z.object({
  email: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
  name: z.string().min(1).max(255),
  isAdmin: z.boolean(),
});

export interface IUserForm {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: 'edit' | 'create';
  user?: UserResponse;
  refetch: () => Promise<any>;
}

function UserForm({
  open,
  setOpen,
  type,
  user,
  refetch
}: IUserForm) {
  const isCreateType = type === "create";
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      isAdmin: false,
    }
  });

  const createUser = useMutation({
    ...createUserMutation(),
    onSuccess: () => {
      setOpen(false);
      refetch();
    }
  });

  useEffect(() => {
    if (!isCreateType && user) {
      form.reset({
        isAdmin: user.role === Role.ADMIN,
        email: user.email,
        name: user.name,
        password: "",
      });
    }
  }, [user, type, form]);

  const onSubmit = (data: z.infer<typeof userSchema>) => {
    if (isCreateType) {
      createUser.mutate({
        body: {
          email: data.email,
          password: data.password,
          name: data.name,
          role: data.isAdmin ? Role.ADMIN : Role.USER
        }
      });
    }
  }

  const handleOnOpenChange = (open: boolean) => {
    form.reset();
    setOpen(open);
  }

  return <Dialog open={open} onOpenChange={handleOnOpenChange}>
    {isCreateType && (
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon />
          Tạo người dùng mới
        </Button>
      </DialogTrigger>
    )}
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {isCreateType ? "Tạo người dùng" : "Chỉnh sửa người dùng"}
        </DialogTitle>
        <DialogDescription>
          {
            isCreateType
              ? "Thêm người dùng mới vào hệ thống"
              : "Chỉnh sửa thông tin người dùng"
          }
        </DialogDescription>
      </DialogHeader>
      <div>
        <Form {...form}>
          <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên người dùng</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isAdmin"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Tài khoản dành cho quản trị viên
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit"> {isCreateType ? "Tạo" : "Lưu"}</Button>
          </form>
        </Form>
      </div>
    </DialogContent>
  </Dialog>
}

export default UserForm;