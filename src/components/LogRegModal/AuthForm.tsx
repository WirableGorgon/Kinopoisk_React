import { FC, useState } from "react";
import { RegForm } from "./RegForm";
import { LogForm } from "./LogForm";
import { Registered } from "./Registered";
import { UserData } from "../../api/api";

export const AuthForm: FC<UserData> = ({ changeUserData, changeModalActive }) => {

    const [authType, setAuthType] = useState<string>("auth");
    const changeAuthType = (type: string) => setAuthType(type)

    switch (authType) {
        case 'register':
            return <RegForm changeAuthType={changeAuthType} changeUserData={changeUserData} changeModalActive={changeModalActive} />

        case 'auth':
            return <LogForm changeAuthType={changeAuthType} changeUserData={changeUserData} changeModalActive={changeModalActive} />

        case 'goToLog':
            return <Registered changeAuthType={changeAuthType} changeUserData={changeUserData} changeModalActive={changeModalActive} />
    }
}