import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styles from "./Signup.module.css";
import Form from "react-bootstrap/Form";
import { BASE_URL } from "../../constants/Api";
import { useState } from "react";
import axios from "axios";
import FormError from "../common/FormError";

const nameRegex = /^[a-zA-Z0-9_]+$/;
const emailRegex = /^\w+([-+.']\w+)*@?(stud.noroff.no|noroff.no)$/;
const url = BASE_URL + "social/auth/register";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .matches(nameRegex, "No punctuation symbols except underscore (_)"),
  email: yup
    .string()
    .email()
    .required("Please enter your email")
    .matches(
      emailRegex,
      "Must be a stud.noroff.no or noroff.no email address."
    ),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Password must be minimum 8 characters."),
});

export default function Signup(props) {
  const [signupError, setSignupError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSignupError(null);
    setSubmitting(true);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
      return alert("Your signup was successful");
    } catch (error) {
      setSignupError(error.toString());
      return alert("User already exists");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      className={styles.modal}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className={styles.closeButton}>
        <Modal.Title id="contained-modal-title-vcenter">
          Join the family
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {signupError && <FormError>Could not signup</FormError>}
          <fieldset disabled={submitting}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" {...register("name")} />
              {errors.name && <FormError>{errors.name.message}</FormError>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control name="email" type="email" {...register("email")} />
              {errors.email && <FormError>{errors.email.message}</FormError>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <FormError>{errors.password.message}</FormError>
              )}
            </Form.Group>
            <Button
              // onClick={props.onHide}
              variant="primary"
              type="submit"
              className={styles.signupButton}
            >
              {submitting ? "Signing up..." : "Sign up"}
            </Button>
          </fieldset>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
