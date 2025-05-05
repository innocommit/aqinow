"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllUsersOptions,
  createUserMutation,
  deleteUserMutation,
} from "@/lib/api/@tanstack/react-query.gen";
import { useState } from "react";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Role, UserResponse } from "@/lib/api";
import { handleToast } from "@/utils/toast.util";
import UserForm from "@/form/user.form";
import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";

function AllUsersView() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [createUserDialog, setCreateUserDialog] = useState<boolean>(false);

  const { data, refetch, isLoading } = useQuery({
    ...getAllUsersOptions({
      query: {
        page: currentPage,
        pageSize: 10,
      },
    }),
  }) as any;

  const createUser = useMutation({
    ...createUserMutation(),
    onSuccess: (response) => {
      handleToast(response.message ?? "Thành công")
      refetch();
    }
  });

  const deleteUser = useMutation({
    ...deleteUserMutation(),
    onSuccess: (response) => {
      handleToast(response.message ?? "Thành công")
      refetch();
    }
  })

  return (
    <div>
      <div className="flex items-center p-2 mb-4 justify-between">
        <h2>Quản lý người dùng</h2>
        <UserForm
          type="create"
          refetch={refetch}
          open={createUserDialog}
          setOpen={setCreateUserDialog}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Email
            </TableHead>
            <TableHead>
              Tên
            </TableHead>
            <TableHead>
              Vai trò
            </TableHead>
            <TableHead>
              Hành động
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((user: UserResponse) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role === Role.ADMIN ? "Quản trị viên" : "Người dùng"}</TableCell>
              <TableCell className="flex gap-2 items-center">
                <Button variant="outline">
                  <EditIcon />
                  Chỉnh sửa
                </Button>
                <Button variant="outline">
                  <TrashIcon />
                  Xoá
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AllUsersView;