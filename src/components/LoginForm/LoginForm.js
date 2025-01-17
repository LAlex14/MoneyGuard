import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/authorisation/operations';
import { Formik, Field, ErrorMessage } from 'formik';
import styles from './LoginForm.module.css';
import * as Yup from 'yup';
import logo from '../../assets/icons/logo.svg';
import CustomButton from '../CustomElements/CustomButton/CustomButton';
import mail from '../../assets/icons/mail.svg';
import lock from '../../assets/icons/lock.svg';

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(logIn(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      {(
        { handleSubmit } // Destructure handleSubmit from Formik
      ) => (
        <div className={styles.FormWrapper}>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className={styles.Form}
          >
            <div className={styles.Logo}>
              <img
                src={logo}
                alt="Logo MoneyGuard"
                width="25.461px"
                height="25.461px"
                draggable="false"
              />
              <h3 className={styles.LogoText}>MoneyGuard</h3>
            </div>
            <label className={styles.Input}>
              <img
                src={mail}
                alt="mail"
                width="24px"
                height="24px"
                draggable="false"
                className={styles.InputSvg}
              />
              <Field
                type="email"
                name="email"
                placeholder="E-mail"
                className={styles.InputField}
              />
              <div className={styles.error}>
                <ErrorMessage name="email" component="div" />
              </div>
            </label>
            <label className={styles.Input}>
              <img
                src={lock}
                alt="lock"
                width="24px"
                height="24px"
                draggable="false"
                className={styles.InputSvg}
              />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={styles.InputField}
              />
              <div className={styles.error}>
                <ErrorMessage name="password" component="div" />
              </div>
            </label>
            <CustomButton type="submit">Log In</CustomButton>
            <CustomButton isNavLink to="/register">
              Register
            </CustomButton>
          </form>
        </div>
      )}
    </Formik>
  );
};
