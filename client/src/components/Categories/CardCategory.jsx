import React from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

export default function CardCategory({ name, idCat }) {
    // console.log(name)
    const { t } = useTranslation();

    return (
        <div>
            {name}
            <div>

                <Link to={"/admin/categorias/" + idCat}>
                    <button>{t('cardCategory.edit')}</button>
                </Link>
            </div>


        </div>
    )
}
