import { useUser, useSignOut } from "@gadgetinc/react";
import { api } from "../api";
import { Link } from "react-router";

export default function () {
  const user = useUser(api);
  const signOut = useSignOut();

  return user ? (
    <>
      <h1>ERROR</h1>
    </>
  ) : null;
}
