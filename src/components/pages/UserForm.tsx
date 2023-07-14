import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../common/Button";
import Link from "next/link";
import Title from "../common/Title";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { clearCurrentUser, fetchUser } from "@/store/userSlice";
import axios from "axios";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 300px;
  margin-top: 50px;

  form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin-top: 30px;
    p {
      color: green;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  div {
    display: flex;
  }
  label {
    margin-right: 10px;
  }
  input {
    width: 100%;
  }
  span {
    color: red;
    display: block;
    font-size: 13px;
    position: absolute;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function UserForm() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { userId } = router.query;
  const { currentUser } = useSelector((state: RootState) => state.users);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId as string));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser.name,
        username: currentUser.username,
        email: currentUser.email,
        city: currentUser.city,
      });
    }
  }, [currentUser]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentUser());
    };
  }, []);

  const onSubmit = async (data: any) => {
    try {
      if (userId) {
        await axios.put(`/api/users/${userId}`, { ...data, id: userId });
        alert("user detailes saved");
      } else {
        await axios.post(`/api/users`, data);
        alert("new user added");
      }
      router.push("/home");
    } catch (error) {
      console.log("Failed to submit data", error);
    }
  };

  return (
    <FormContainer>
      <Title text={userId ? "Edit Form" : "Add From"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <div>
            <label htmlFor="name">Name*</label>
            <input
              {...register("name", { required: true, maxLength: 30 })}
              id="name"
            />
          </div>
          {errors.name?.type === "required" && (
            <span role="alert">This field is required</span>
          )}
        </FormGroup>
        <FormGroup>
          <div>
            <label htmlFor="username">Username*</label>
            <input
              {...register("username", { required: true, maxLength: 30 })}
              id="username"
            />
          </div>
          {errors.username?.type === "required" && (
            <span role="alert">This field is required</span>
          )}
        </FormGroup>
        <FormGroup>
          <div>
            <label htmlFor="email">Email*</label>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              id="email"
            />
          </div>
          {errors.email?.type === "required" && (
            <span role="alert">This field is required</span>
          )}
          {errors.email?.type === "pattern" && (
            <span role="alert">Incorrect email address</span>
          )}
        </FormGroup>
        <FormGroup>
          <div>
            <label htmlFor="city">City*</label>
            <input {...register("city", { required: true })} id="city" />
          </div>
          {errors.city?.type === "required" && (
            <span role="alert">This field is required</span>
          )}
        </FormGroup>

        <Buttons>
          <Link href="/home">
            <Button variant="red" text="Cancel" />
          </Link>
          <Button type="submit" variant="green" text="Submit" />
        </Buttons>
      </form>
    </FormContainer>
  );
}
