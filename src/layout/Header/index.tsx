import React from "react";
import {useNavigate} from "react-router-dom";
import UserComp from "../Header/UserComp";
import Logo from "@/layout/Header/Logo";
const HeaderLayout: React.FC = () => {
    const navigate = useNavigate()
    const toHome = () => {
        navigate('/home')
    }
    return (
        <div className={'text-#fff w-100% h-100% bg-#001628'}>
            <div className={'flex justify-between h-100%'}>
                <div onClick={toHome}>
                    <Logo />
                </div>
                 <UserComp />
            </div>
        </div>
    )
}

export default HeaderLayout
