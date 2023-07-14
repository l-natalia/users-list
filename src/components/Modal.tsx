import React from "react";
import styled from "styled-components";
import Title from "./Title";
import Button from "./Button";
import axios from "axios";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, fetchUsers } from "@/store/userSlice";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  p {
    margin: 30px 0;
    font-size: 17px;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Modal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { name, id } = useSelector((state: RootState) => state.users.modalData);
  const deleteUser = async (userId: string): Promise<void> => {
    try {
      await axios.delete(`/api/users/${userId}`);
      dispatch(fetchUsers());
      dispatch(closeModal());
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div>
      <ModalWrapper>
        <ModalContent>
          <Title text="Delete" />
          <p>Do you want to delete user {name}?</p>
          <Buttons>
            <Button
              variant="gray"
              text="Cancel"
              onClick={() => handleCloseModal()}
            />
            <Button
              variant="red"
              text="Delete"
              onClick={() => deleteUser(id)}
            />
          </Buttons>
        </ModalContent>
      </ModalWrapper>
    </div>
  );
};

export default Modal;
