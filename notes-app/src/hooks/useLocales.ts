import { useTranslation } from "react-i18next";
// @mui
import { enUS, skSK } from "@mui/material/locale";

// ----------------------------------------------------------------------

const LANGS = [
    {
        label: "English",
        value: "en",
        systemValue: enUS,
    },
    {
        label: "Slovak",
        value: "sk",
        systemValue: skSK,
    },
];

export default function useLocales() {
    const { i18n, t: translate } = useTranslation();
    const langStorage = localStorage.getItem("i18nextLng");
    const currentLang =
        LANGS.find((_lang) => _lang.value === langStorage) || LANGS[1];

    const handleChangeLanguage = (newLang: string) => {
        i18n.changeLanguage(newLang);
    };

    return {
        onChangeLang: handleChangeLanguage,
        translate,
        currentLang,
        allLang: LANGS,
    };
}
