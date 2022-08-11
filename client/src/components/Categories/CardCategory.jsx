import React from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import './Categories.scss'

export default function CardCategory({ name, idCat }) {
    // console.log(name)
    const { t } = useTranslation();

    return (
        <div className="categoryCardContainer">
            <h4>{name}</h4>
            <div className="buttonCategoryContainer">

                <Link to={"/admin/categorias/" + idCat}>
                    <button>{t('cardCategory.edit')}</button>
                </Link>
            </div>


        </div>
    )
}
