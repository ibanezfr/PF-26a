import React from "react";
import './ProductItem.scss'
import trash from '../../images/trash.png'
import { formatNumber } from "../../Utils";
import { useTranslation } from 'react-i18next';

export default function ProductItem({ data, changeQuantity, deleteAllFromCart }) {
    let { name, price, img, quantity, stock, size } = data;
    const { t } = useTranslation();
    return (
        <div className="fatherContainer">
            <div className="buttonContainer">
                <button className="deleteAllButton" onClick={(e) => deleteAllFromCart(e, data)}><img className="deleteBtnImg" src={trash} alt='X' /></button>
            </div>
            <img className="itemImage" src={img} alt="" />
            <div className="textContainer">
                <h4>{name}</h4>
                <h5>${formatNumber(price)} x {quantity} = ${formatNumber(price * quantity)}</h5>
                <span>{t('productItem.size')}{size} <br /> {t('productItem.stock')}{stock}</span>
            </div>
            <div className="buttonContainer">
                <button className="actionBtn" onClick={(e) => changeQuantity(e, data, true)}>{t('productItem.add')}</button>
                <button className="actionBtn" onClick={(e) => changeQuantity(e, data, false)}>{t('productItem.remove')}</button>
            </div>
        </div>
    )
}
