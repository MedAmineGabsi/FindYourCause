import { useActionForm } from "@gadgetinc/react";
import { api } from "../api";
import { useLocation } from "react-router";

export default function () {

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset 
  } = useActionForm(api.user.signUp);
 
       
  const { search } = useLocation();

  return (
    <form onSubmit={handleSubmit} className="custom-form" style={{marginTop:'calc(477px - 100vh + 10rem)'}}>
      <h1 className="form-title">Create account</h1>
      <div className="custom-form">
        <input 
          id="firstName"
          className="custom-input"
          placeholder="First Name"
          {...register("firstName", { 
            required: "First name is required"
          })}
        />
        {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
      </div>
 

      <div className="form-group">
        <input 
          id="lastName"
          className="custom-input"
          placeholder="Last Name"
          {...register("lastName", { 
            required: "Last name is required"
          })}
        />
        {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
      </div>
 

      <div className="custom-group">
        <input 
          id="email"
          className="custom-input"
          placeholder="Email"
          type="email"
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address"
            }
          })}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>
 

      <div className="custom-group">
        <input 
          id="password"
          className="custom-input"
          placeholder="Password"
          type="password"
          {...register("password", { 
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
              message: "Password must include letters, numbers, and special characters"
            }
          })}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}
        <p className="helper-text" align = "left">
          Password requirements: <br></br>
          • At least 8 characters <br></br>
          • Must include letters, numbers, and special characters
        </p>
      </div>
 

      {errors.root?.serverError && 
        <p className="error-message">{errors.root.serverError.message}</p>
      }
 

      <button className="submit-button" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
      
      {isSubmitSuccessful && (
        <p className="success-message">
          Account created successfully! Please check your email to verify your account before signing in.
        </p>
      )}
      
      <div className="divider"><span>or</span></div>
      
      <a className="google-oauth-button" href={`/auth/google/start${search}`}>
        <img 
          src="https://assets.gadget.dev/assets/default-app-assets/google.svg" 
          width={22} 
          height={22} 
          alt="Google logo"
        />
        Continue with Google
      </a>
    </form>
  );
}