import { Button } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { React, useContext } from "react";

export default function Logout() {
  const [, setAuth] = useContext(AuthContext);

  const history = useNavigate();

  const logout = () => {
    setAuth(null);
    history("/");
  };

  return (
    <div>
      <Button variant="primary" type="submit" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

// import { React, useState, useContext } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AuthContext from "../../context/AuthContext";

// export default function Login() {
//   const [submitting, setSubmitting] = useState(false);
//   const [loginError, setLoginError] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const [, setAuth] = useContext(AuthContext);

//   async function onSubmit(data) {
//     setSubmitting(true);
//     setLoginError(null);

//     const postData = {
//       email: data.username,
//       password: data.password,
//     };

//     console.log(postData);

//     try {
//       const response = await axios.post(url, postData);
//       console.log("response", response.data);
//       setAuth(response.data);
//       history("/explore");
//     } catch (error) {
//       console.log("error", error);
//       setLoginError(error.toString());
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <>
//       <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
//         {loginError && <FormError>Wrong username or password</FormError>}

//           <Button variant="primary" type="submit" className={styles.button}>
//             {submitting ? "Loggin in..." : "Login"}

//       </Form>
//     </>
//   );
// }
