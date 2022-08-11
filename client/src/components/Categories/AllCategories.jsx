import { React, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategory } from "../../redux/actions/index.js"
import { Link } from "react-router-dom"
import CardCategory from "./CardCategory.jsx";
import { useTranslation } from 'react-i18next';
import './Categories.scss'

export default function AllCategories() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const allCategories = useSelector((state) => state.category)
    // console.log("hola", allCategories)
    useEffect(() => {
        dispatch(fetchCategory())
    }, [])

    return (
        <div className="allCategoriesContainer">
            <div className="categoryTitleContainer">
                <h3>{t('allCategories.myCategories')}</h3>
            </div>

            <div className="CreateNewCategoryContainer">
                <Link to={"/admin/categoria/nueva"}>
                    <button>{t('allCategories.create')}</button>
                </Link>
            </div>

            <div className="cardCategories">

                {
                    allCategories?.map((cat) => {
                        return (
                            <section>

                                <CardCategory
                                    name={cat.name}
                                    idCat={cat.id}
                                />


                            </section>
                        )
                    })
                }
            </div>
        </div>
    )
}
