import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { trpc } from "../trpc.ts";

export default function Index() {
  const checklogin = useQuery(trpc.user.checklogin.queryOptions());

  return (
    <div>
      Index!
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      {checklogin.data?.username}
    </div>
  );
}
