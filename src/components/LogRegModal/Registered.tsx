import { FC } from "react";
import { AuthForm } from "./AuthForm";
import { Auth } from "../../api/api";

export const Registered: FC<Auth> = ({ changeAuthType, changeUserData, changeModalActive }) => {
    return (
        <div>
            <div>
                <h4>Регистрация завершена</h4>
                <span>Используйте вашу электронную почту для входа</span>
            </div>
            <button onClick={() => {
                changeAuthType("auth");
                return (
                    <AuthForm changeUserData={changeUserData} changeModalActive={changeModalActive} />
                )
            }}>Войти</button>
        </div>
    )
}