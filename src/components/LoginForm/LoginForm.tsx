import { FormField } from "../../components/FormField/FormField";
import { type FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchUserProfile, loginUser } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/authSlice";
import EmailSvg from "../../assets/svg/email.svg?react";
import PasswordSvg from "../../assets/svg/password.svg?react";
import "./LoginForm.css";

const loginFormSchema = z.object({
  email: z.string().min(5, "Почта должна содержать не менее 5 символов"),
  password: z.string().min(8, "Пароль должен содержать не менее 8 символов"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  onClose?: () => void; // 👈 Добавь пропс
}

const LoginForm: FC<LoginFormProps> = ({onClose}) => {
  const dispatch = useAppDispatch();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => loginUser(data.email, data.password),
    onSuccess: async () => {
      try {
        const user = await fetchUserProfile();
        dispatch(setUser(user));
         queryClient.setQueryData(["profile"], user);
         onClose?.();
      } catch (err) {
        console.error(
          "Не удалось получить пользователя после регистрации",
          err
        );
      }
    },
    onError: (err: Error) => {
        try {
          const mes = JSON.parse(err.message) as Array<{
            validation: string;
            code: string;
            message: string;
            path: Array<string>;
          }>;
          const str = mes.map((x) => x.message).join("; ");
          console.log(str);
          console.log(mes);
          setServerError(str);
        } catch (e) {
          setServerError("Неверная почта или пароль");
        }
      },
  });

  const onSubmit = (data: LoginFormData) => {
    setServerError(null);
    loginMutation.mutate(data);
  };

  return (
    <form className="login-form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {serverError && <div className="error-message">{serverError}</div>}

      <FormField errorMessage={errors.email?.message}>
        <EmailSvg className="register-form__icon" width={24} height={24} />
        <input
          type="email"
          autoComplete="off"
          placeholder="Электронная почта"
          {...register("email")}
        />
      </FormField>

      <FormField errorMessage={errors.password?.message}>
        <PasswordSvg className="register-form__icon" width={24} height={24} />
        <input
          type="password"
          autoComplete="off"
          placeholder="Пароль"
          {...register("password")}
        />
      </FormField>

      <button
        className="login-form__button"
        title="Войти в аккаунт"
        type="submit"
       
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Загрузка..." : "Войти"}
      </button>
    </form>
  );
};

export default LoginForm;
