import { FormField } from "../../components/FormField/FormField";
import { type FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser, fetchUserProfile } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/authSlice";
import EmailSvg from "../../assets/svg/email.svg?react";
import NameSvg from "../../assets/svg/name.svg?react";
import PasswordSvg from "../../assets/svg/password.svg?react";
import "./RegisterForm.css";

const registerFormSchema = z
  .object({
    email: z.string().email("Пароль обязателен для заполнения"),
    password: z.string().min(8, "Пароль должен содержать не менее 8 символов"),
    name: z.string().min(1, "Имя обязательно для заполнения"),
    surname: z.string().min(1, "Фамилия обязательна для заполнения"),
    confirmPassword: z.string().min(1, "Подтверждение пароля обязательно"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerFormSchema>;

interface RegisterFormProps {
  onRegistrationSuccess?: () => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onRegistrationSuccess }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    mode: "onBlur",
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormData) =>
      registerUser(data.email, data.password, data.name, data.surname),
    onSuccess: async () => {
      try {
        const user = await fetchUserProfile();
        dispatch(setUser(user));
        queryClient.setQueryData(["profile"], user);
        onRegistrationSuccess?.();
      } catch (err) {
        console.error(
          "Не удалось получить пользователя после регистрации",
          err
        );
        onRegistrationSuccess?.();
      }
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <form
      className="register-form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField errorMessage={errors.email?.message}>
        <EmailSvg className="register-form__icon" width={24} height={24} />
        <input
          type="email"
          autoComplete="off"
          placeholder="Электронная почта"
          {...register("email")}
        />
      </FormField>

      <FormField errorMessage={errors.name?.message}>
        <NameSvg className="register-form__icon" width={24} height={24} />
        <input
          type="text"
          autoComplete="off"
          placeholder="Имя"
          {...register("name")}
        />
      </FormField>

      <FormField errorMessage={errors.surname?.message}>
        <EmailSvg className="register-form__icon" width={24} height={24} />
        <input
          type="text"
          autoComplete="off"
          placeholder="Фамилия"
          {...register("surname")}
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

      <FormField errorMessage={errors.confirmPassword?.message}>
        <PasswordSvg className="register-form__icon" width={24} height={24} />
        <input
          type="password"
          autoComplete="off"
          placeholder="Подтвердите пароль"
          {...register("confirmPassword")}
        />
      </FormField>

      <button
        className="register-form__button"
        type="submit"
        title="Создать аккаунт"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? "Загрузка..." : " "}
        Создать аккаунт
      </button>
    </form>
  );
};

export default RegisterForm;
