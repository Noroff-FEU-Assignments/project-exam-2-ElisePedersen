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
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [, setAuth] = useContext(AuthContext);
  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
      setAuth(response.data);
      history("/explore");
    } catch (error) {
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {loginError && <FormError>Wrong email or password</FormError>}
        <fieldset disabled={submitting}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              {...register("email")}
              className={styles.formItem}
            />
            {errors.email && <FormError>{errors.email.message}</FormError>}
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

          <Button
            variant="primary"
            type="submit"
            className={styles.loginButton}
          >
            {submitting ? "Logging in..." : "Login"}
          </Button>
        </fieldset>
      </Form>
    </>
  );
}
