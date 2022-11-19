import { React, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL } from "../../constants/Api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import FormError from "../common/FormError";
import styles from "./Login.module.css";

const url = BASE_URL + "social/auth/login";

const schema = yup.object().shape({
  username: yup.string().email().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    const postData = {
      email: data.username,
      password: data.password,
    };

    console.log(postData);

    try {
      const response = await axios.post(url, postData);
      console.log("response", response.data);
      setAuth(response.data);
      history("/explore");
      document.body.style =
        "background: linear-gradient(to left top, #d22f8c, #fc782e)";
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {loginError && <FormError>Wrong username or password</FormError>}
        <fieldset disabled={submitting}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              {...register("username")}
              className={styles.formItem}
            />
            {errors.username && (
              <FormError>{errors.username.message}</FormError>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              {...register("password")}
              type="password"
              className={styles.formItem}
            />
            {errors.password && (
              <FormError>{errors.password.message}</FormError>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" className={styles.button}>
            {submitting ? "Loggin in..." : "Login"}
          </Button>
        </fieldset>
      </Form>
    </>
  );
}
