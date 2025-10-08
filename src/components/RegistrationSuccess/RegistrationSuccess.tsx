import { type FC } from "react";
import "./RegistrationSuccess.css";

interface RegistrationSuccessProps {
  onLoginRedirect: () => void;
}

const RegistrationSuccess: FC<RegistrationSuccessProps> = ({ 
  onLoginRedirect 
}) => {
  return (
    <div className="register-success">
      <div className="register-success__wrapper">
        <h2 className="register-success__title">Регистрация завершена</h2>
        <p className="register-success__text">
          Используйте вашу электронную почту для входа
        </p>
        <button
          className="register-success__button"
          onClick={onLoginRedirect}
          title="Войти"
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;