import {HashRouter} from "react-router-dom";
import Router from "@/routers/index";
import {RootState, useDispatch, useSelector} from "@/redux";
import {setAuthRouter, setMenuList} from "@/redux/modules/menu";
import {routeModel} from "../mock/menu";
import {useEffect, useState} from "react";
import {ConfigProvider} from "antd";
import {getBrowserLang, handleRouter} from "@/utils";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";
import "moment/dist/locale/zh-cn";
import {setLanguage} from "@/redux/modules/global";
import i18n from "i18next";
import AuthRouter from "@/routers/utils/authRouter";
import {connect} from "react-redux";

function App() {
    const dispatch = useDispatch();
    const {language, assemblySize} = useSelector((state: RootState) => state.global);
    const [i18nLocale, setI18nLocale] = useState(zhCN);

    // 设置 antd 语言国际化
    const setAntdLanguage = () => {
        // 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
        if (language && language == "zh") return setI18nLocale(zhCN);
        if (language && language == "en") return setI18nLocale(enUS);
        if (getBrowserLang() == "zh") return setI18nLocale(zhCN);
        if (getBrowserLang() == "en") return setI18nLocale(enUS);
    };


    useEffect(() => {
        // 全局使用国际化
        i18n.changeLanguage(language || getBrowserLang())
        dispatch(setLanguage(language || getBrowserLang()));
        setAntdLanguage();
    }, [language]);

    function fetchRouteList() {
        const dynamicRouter = handleRouter(routeModel);
        dispatch(setAuthRouter(dynamicRouter));
        dispatch(setMenuList(routeModel))
    }

    useEffect(()=> {
        fetchRouteList()
    }, [])

  return (
   <HashRouter>
       <ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
           <AuthRouter>
             <Router />
           </AuthRouter>
       </ConfigProvider>
   </HashRouter>
  )
}

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setLanguage };
export default connect(mapStateToProps, mapDispatchToProps)(App);
