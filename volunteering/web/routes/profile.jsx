import { useUser, useSignOut } from "@gadgetinc/react";
import { api } from "../api";
import { Link } from "react-router";
import "../components/Profile.css";

export default function () {
  const user = useUser(api);

  const stylistButton = {
    backgroundColor: "#4285F4", /* Google Blue */
    color: "white",
    border: "1px solid #4285F4",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  }
  return (
    <>
      <div className="whole-card">
          <div className="card-stack">
            <div className="card user-card">
              <div className="card-content">
                <img className="icon" src={user.googleImageUrl ?? "https://assets.gadget.dev/assets/default-app-assets/default-user-icon.svg"} />
                <div className="userData">
                  <p>
                    <strong>Name: </strong> {user.firstName} {user.lastName}
                  </p>
                  <p>
                    <strong>Email</strong>: <a href={`mailto:${user.email}`}>{user.email}</a>
                  </p>
                  <p><strong>Created</strong>: {user.createdAt.toString()}</p>
                </div>
              <div className="flex-vertical gap-4px">
              <strong>Actions:</strong>
              <button style={stylistButton}><Link to="/change-password" style={{textDecoration: "none", color: "#fff"}}>Change password</Link></button>
            </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}