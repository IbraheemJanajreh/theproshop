import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin"),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("aaa"),
  },
  {
    name: "Jane Doe",
    email: "Jane@example.com",
    password: bcrypt.hashSync("aaa"),
  },
];
export default users;