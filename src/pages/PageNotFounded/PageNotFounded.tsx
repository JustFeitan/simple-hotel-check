import { FC } from "react";
import { Link } from "react-router-dom";

import PaperWrapper from "../../components/UI/PaperWrapper/PaperWrapper";

import "./PageNotFounded.scss";

const PageNotFounded: FC = () => {
    return (
        <PaperWrapper className="page-not-found">
            <h2>Упс... Данная страница не найдена:(</h2>
            <Link to="/">Вернуться на главную</Link>
        </PaperWrapper>
    );
};

export default PageNotFounded;
