import { yupResolver } from "@hookform/resolvers/yup";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import Form from "../../components/UI/Form/Form";
import FormWrapper from "../../components/UI/FormWrapper/FormWrapper";
import FullScreenImageContainer from "../../components/UI/FullScreenImageContainer/FullScreenImageContainer";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/buttons/Button/Button";

import { useActions, useAppSelector } from "../../hooks/redux";
import { IUser } from "../../models/IUser";
import { authActions, authSelector } from "../../store/reducers/authSlice";
import backgroundLogin from "./../../assets/login-bgi.jpg";
import "./LoginPage.scss";

interface LoginFormState {
    login: string;
    password: string;
}

const loginFormSchema = yup.object().shape({
    login: yup
        .string()
        .required("Введите логин")
        .matches(
            /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Неверный формат почты"
        ),
    password: yup
        .string()
        .required("Введите пароль")
        .min(8, "Пароль должен содержать минимум 8 символов")
        .matches(/^[^а-яё]+$/iu, "Пароль не должен содержать кирилицу"),
});

const LoginPage: FC = () => {
    const { login } = useActions(authActions);
    const { isLoading } = useAppSelector(authSelector);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<LoginFormState>({
        mode: "onBlur",
        resolver: yupResolver(loginFormSchema),
    });

    const onLoginSubmit: SubmitHandler<LoginFormState> = async (loginRequest) => {
        const user: IUser = {
            email: loginRequest.login,
            password: loginRequest.password,
        };
        login(user);
    };

    return (
        <div className="login-page">
            <FullScreenImageContainer backgroundImg={backgroundLogin} />
            <FormWrapper>
                <Form onSubmit={handleSubmit(onLoginSubmit)}>
                    <h2>Simple Hotel Check</h2>
                    <Input
                        error={!!errors.login}
                        helperText={errors.login?.message}
                        label="Логин"
                        {...register("login")}
                    />
                    <Input
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register("password")}
                        label="Пароль"
                    />
                    <Button isLoading={isLoading} fullWidth height={50}>
                        Войти
                    </Button>
                </Form>
            </FormWrapper>
        </div>
    );
};

export default LoginPage;
