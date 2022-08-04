import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

export default function Order({ onSelectChange }) {
    let orderedBy = useSelector(state => state.orderBy)
    const { t } = useTranslation();

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(orderedBy));
    }, [orderedBy]);//para mantener la seleccion de ordenamiento

    return (
        <select name='order-by' onChange={(e) => onSelectChange(e)}>
            <option>{t('order.orderBy')}</option>
            <option value='Name-Asc'>{t('order.orderBy')}</option>
            <option value='Name-Des'>{t('order.ascName')}</option>
            <option value='Price-Asc'>{t('order.ascPrice')}</option>
            <option value='Price-Des'>{t('order.descPrice')}</option>
        </select>
    )
}
