import React from "react";
import Button from "@/components/Button";
import Title from "@/components/Title";
import styled from "styled-components";
import UsersList from "@/components/UsersList";
import Container from "@/components/Container";
import Link from "next/link";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Home = () => {
  return (
    <Container>
      <Header>
        <Title text="User List" />
        <Link href={"/add"}>
          <Button variant="blue" text="Add new" />
        </Link>
      </Header>
      <UsersList />
    </Container>
  );
};

export default Home;
