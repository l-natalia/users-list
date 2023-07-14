import { User } from "@/utils/interfaces";
import { rest, RestContext } from "msw";

let users: User[] = [
  {
    id: "1",
    name: "Jon Snow",
    username: "Wolf",
    email: "jon@snow.com",
    city: "Winterfell",
  },
  {
    id: "2",
    name: "Darth Vader",
    username: "Vader",
    email: "darth@vader.com",
    city: "Death Star",
  },
  {
    id: "3",
    name: "Frodo Baggins",
    username: "Frodo",
    email: "frodo@baggins.com",
    city: "Shire",
  },
  {
    id: "4",
    name: "Indiana Jones",
    username: "Indy",
    email: "indiana@jones.com",
    city: "Venice",
  },
  {
    id: "5",
    name: "Luke Skywalker",
    username: "Luke",
    email: "luke@skywalker.com",
    city: "Tatooine",
  },
];

const handlers = [
  rest.get("/api/users", (req, res, ctx) => {
    return res(ctx.json(users));
  }),

  rest.get("/api/users/:id", (req, res, ctx) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === id);
    return res(ctx.json(user));
  }),

  rest.post("/api/users", (req, res, ctx) => {
    const newUser = req.body as User;
    users.push({
      ...newUser,
      id: Math.floor(Math.random() * 100000).toString(),
    });
    return res(ctx.json(newUser));
  }),

  rest.put("/api/users/:id", (req, res, ctx) => {
    const { id } = req.params;
    const updatedUser = req.body as User;
    users = users.map((user) => (user.id === id ? updatedUser : user));
    return res(ctx.json(updatedUser));
  }),

  rest.delete("/api/users/:id", (req, res, ctx) => {
    const { id } = req.params;
    users = users.filter((user) => user.id !== id);
    return res(ctx.status(200));
  }),
];

export { handlers };
