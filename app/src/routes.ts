import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),

  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),

  route("managedb", "routes/managedb.tsx"),

  route("practice", "routes/practice/index.tsx"),
] satisfies RouteConfig;
