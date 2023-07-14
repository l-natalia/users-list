import React from "react";
import Button from "@/components/common/Button";
import Title from "@/components/common/Title";
import styled from "styled-components";
import UsersList from "@/components/pages/UsersList";
import Container from "@/components/pages/Container";
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
