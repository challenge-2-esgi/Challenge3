import { useTranslation } from "react-i18next";

const ErrorRequest = () => {

    const { t } = useTranslation(); 

    return (
        <main className="m-auto flex h-60 items-center justify-center text-base">
            <p>
                <strong>{ t('error.title') }</strong> <br />
                { t('error.description') }
            </p>
        </main>
    )

};

export default ErrorRequest;