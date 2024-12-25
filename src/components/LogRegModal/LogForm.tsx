import { FC, useState } from "react";
import { AuthForm } from "./AuthForm";
import { Auth, profile, userLogin } from "../../api/api";

export const LogForm: FC<Auth> = ({ changeAuthType, changeUserData, changeModalActive }) => {

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(event.target.value);
    };

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (emailValue && passwordValue) {
                    userLogin(emailValue, passwordValue).then((res) => {
                        if (res.result === true) {
                            changeModalActive(false);
                        }
                    }).then(() => profile().then((res) => changeUserData(res)))
                }
            }}>
                <input type='email' value={emailValue} onChange={handleEmailChange} placeholder='Электронная почта' />
                <input type='password' value={passwordValue} onChange={handlePasswordChange} placeholder='Пароль' />
                <button type='submit'>Войти</button>
            </form>
            <button onClick={() => {
                changeAuthType("register");
                return (
                    <AuthForm changeUserData={changeUserData} changeModalActive={changeModalActive} />
                )
            }}>Регистрация</button>
        </div>
    )
}