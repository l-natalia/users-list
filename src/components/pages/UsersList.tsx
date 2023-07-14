import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../common/Button";
import { User } from "@/utils/interfaces";
import { fetchUsers, openModal } from "@/store/userSlice";
import { RootState } from "@/store";
import { AppDispatch } from "../../store";
import Link from "next/link";
import Modal from "./Modal";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #c9c7c7;

  thead {
    background-color: #ebebeb;

    th {
      padding: 20px 10px;
      text-align: left;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #e8e8e8;
    }

    td {
      padding: 10px;
    }
  }
`;

const UsersList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { users, isLoading, error, showModal } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleOpenModal = ({ id, name }: { id: string; name: string }) => {
    dispatch(openModal({ id, name }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error, try again later</div>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>City</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: User, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.city}</td>
            <td>
              <Link href={`/edit/${user.id}`}>
                <Button variant="orange" text="edit" />
              </Link>
            </td>
            <td>
              <Button
                variant="red"
                text="delete"
                onClick={() =>
                  handleOpenModal({ id: user.id, name: user.name })
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
      {showModal && <Modal />}
    </Table>
  );
};

export default UsersList;
