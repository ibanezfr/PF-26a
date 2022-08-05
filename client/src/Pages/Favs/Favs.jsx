import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { getFavsFromUser, removeFavsFromUser } from '../../redux/actions';
import FavItem from './FavItem';
import { useTranslation } from 'react-i18next';

export default function Favs() {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const favs = useSelector(state => state.favs);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(getFavsFromUser(user.uid));
    }, [dispatch]);

    const handleRemoveFav = (e, id) => {
        e.preventDefault();
        dispatch(removeFavsFromUser(user.uid, id));
    };

    return (
        <>
            {
                favs[0] ?
                    favs.map((p, i) => {
                        return (
                            <FavItem
                                key={i}
                                id={p.id}
                                user={user.uid}
                                name={p.name}
                                image={p.image}
                                price={p.price}
                                handleRemoveFav={handleRemoveFav}
                            />
                        )
                    })
                    : <h2>{t('favs.noFavs')}</h2>
            }
        </>
    );
};
