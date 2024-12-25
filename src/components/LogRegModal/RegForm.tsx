import { FC, useState } from "react";
import { AuthForm } from "./AuthForm";
import { Auth, userCreate } from "../../api/api";

export const RegForm: FC<Auth> = ({ changeAuthType, changeUserData, changeModalActive }) => {

    const [emailValue, setEmailValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [surnameValue, setSurnameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [repPasswordValue, setRepPasswordValue] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(event.target.value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value);
    };

    const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurnameValue(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(event.target.value);
    };

    const handleRepPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepPasswordValue(event.target.value);
    };

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (emailValue && nameValue && surnameValue && passwordValue && repPasswordValue) {
                    if (passwordValue === repPasswordValue) {
                        userCreate(
                            emailValue,
                            passwordValue,
                            nameValue,
                            surnameValue
                        ).then((res) => {
                            console.log(res)
                        })
                    }
                }
                changeAuthType('goToLog');
                return (
                    <AuthForm changeUserData={changeUserData} changeModalActive={changeModalActive} />
                )
            }}>
                <input type='email' value={emailValue} onChange={handleEmailChange} placeholder='Электронная почта' />
                <input type='text' value={nameValue} onChange={handleNameChange} placeholder='Имя' />
                <input type='text' value={surnameValue} onChange={handleSurnameChange} placeholder='Фамилия' />
                <input type='password' value={passwordValue} onChange={handlePasswordChange} placeholder='Пароль' />
                <input type='password' value={repPasswordValue} onChange={handleRepPasswordChange} placeholder='Подтвердите пароль' />
                <button type="submit" value='Создать аккаунт' />
            </form>
            <button onClick={() => {
                changeAuthType("auth");
                return (
                    <AuthForm changeUserData={changeUserData} changeModalActive={changeModalActive} />
                )
            }}>У меня есть пароль</button>
        </div>
    )
}