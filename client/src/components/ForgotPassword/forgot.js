import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import swal from 'sweetalert'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Modals from "../Modals";
import { useModal } from "../Modals/useModal";
import './forgot.css'
import NavBar from "../NavBar";

const ForgotPassword = () => {

const [send, setSend] = useState(false);
const [isOpenModal, openedModal, closeModal] = useModal(true);
const history = useHistory()


return (
    <div>
        <NavBar />
    <div className="container-forgot">
        <div >
            <section>
                <Formik
                    initialValues={{
                        email: "",
                    }}
                    validate={(values) => {
                        let errors = {};

                        //validacion email 
                        if (!values.email) {
                            errors.email = 'Please write your Email'
                        } else if (values.email.length < 4 || values.email.length > 40) {
                            errors.email = 'Must be a valid email'
                        }

                        return errors;
                    }}
                    onSubmit={(values, { resetForm }) => {

                        resetForm();
                        axios.put('http://localhost:3001/auth/forgot-password', values)
                        swal({
                            title: '',
                            text: 'Please check your inbox ',
                            icon: 'info',
                            button: 'OK'
                        }).then(res => {
                            if (res) {
                                history.push('/reset-password')
                            }
                        })
                        resetForm();
                    }}
                >

                    {({ errors }) => (
                        <Form>
                        <div className="logIn_wrapper">
                        <div className="form_container">
                          <div className="title_container">
                            <h3 className="modal-forgot-title">Password recovery</h3>
                            <h4 className="modal-forgot-text">Inform the email address used to create your account</h4>
                          </div>
                          <Field
                            type='text'
                            id="email"
                            name="email"
                            className="form-control"
                        />
                        <ErrorMessage name="email" component={() => (
                        <div className="modal-forgot-errors">{errors.email}</div>
                        )} />
                        <div>
                                <button type="submit" className="buttonregister">Submit</button>
                                {send && <p>User added succesfully</p>}
                        </div>
                        </div>
                      </div>
                      </Form>
                    )}
                </Formik>
            </section>
        </div>
    </div>
    </div>
);
 }

export default ForgotPassword