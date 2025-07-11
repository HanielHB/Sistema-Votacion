// src/pages/LoginForm.tsx
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { FormField } from "../components/FormField";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { AuthService } from "../services/AuthService";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";
import { GuestMenu } from "../components/GuestMenu";

type Inputs = {
    username: string;
    password: string;
};

export const LoginForm = () => {
    const navigate = useNavigate();
    const { doLogin } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = ({ username, password }) => {
        new AuthService()
        .login(username, password)
        .then((response) => {
            doLogin({
            access_token: response.access,
            refresh_token: response.refresh,
            username,
            });
            navigate(URLS.HOME);
        })
        .catch((err) => {
            console.error("Login error:", err);
            alert("Usuario o contraseña incorrectos");
        });
    };

    return (
        <>
        <GuestMenu />
        <Container>
            <Card title="Iniciar sesión" className="mx-5 my-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField>
                <label htmlFor="username">Username:</label>
                <Input
                    type="text"
                    id="username"
                    {...register("username", { required: true })}
                />
                {errors.username && <span>Este campo es requerido</span>}
                </FormField>

                <FormField>
                <label htmlFor="password">Contraseña:</label>
                <Input
                    type="password"
                    id="password"
                    {...register("password", { required: true })}
                />
                {errors.password && <span>Este campo es requerido</span>}
                </FormField>

                <Button type="submit" title="Ingresar" />
            </form>
            </Card>
        </Container>
        </>
    );
};
