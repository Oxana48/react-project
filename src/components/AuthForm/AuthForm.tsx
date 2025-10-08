import { useState } from "react";
import RegistrationSuccess from "../RegistrationSuccess/RegistrationSuccess";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import LogoBlack from "../../assets/png/logo-black.png";
import CrossAuthSvg from "../../assets/svg/auth-cross.svg?react";
import "./AuthForm.css";

interface AuthFormProps {
  onClose?: () => void;
}

const AuthForm = ({ onClose }: AuthFormProps) => {
  const [authType, setAuthType] = useState<"auth" | "register" | "success">(
    "auth"
  );

  const handleClick = () => {
    setAuthType((prevState) => (prevState === "auth" ? "register" : "auth"));
  };

  const handleSwitchToLogin = () => {
    setAuthType("auth");
  };

  const handleRegistrationSuccess = () => {
    setAuthType("success"); 
  };

  return (
    <div className="auth-form">
      {onClose && (
        <button
          className="auth-form__close"
          onClick={onClose}
          aria-label="Закрыть форму регистрации"
        >
          <CrossAuthSvg
            className="auth-form__close-icon"
            width={24}
            height={24}
          />
        </button>
      )}
      <img className="auth-form__logo" src={LogoBlack} alt="Маруся" />

      <p className="auth-form__title">
        {authType === "auth" ? "" : authType === "register" ? "Регистрация" : " "}
      </p>

      {authType === "success" ? (<RegistrationSuccess onLoginRedirect={handleSwitchToLogin} />
      ) : authType === "register" ? (<RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
      ) : (<LoginForm onClose={onClose}/>)}

      {authType !== "success" && (
        <div className="auth-form__info">
          <button className="auth-form__button" onClick={handleClick}>
            {authType === "auth" ? "Создать аккаунт" : "У меня есть пароль"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
