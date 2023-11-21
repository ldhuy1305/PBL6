import React from 'react'
import style from './Features.module.css'
import { Link } from 'react-router-dom'
function Features() {
    return (
        <div className={style.container}>
            <Link to="/" className={style.item}>
                <img src="./bars-solid.svg" alt="" className={style.img_features} />
                <div  className={style.title}><span>Trang chủ</span></div>
            </Link>
            <Link to='/product' className={style.item}>
                <img src="./cart-shopping-solid.svg" alt="" className={style.img_features} />
                <div  className={style.title}><span>Sản phẩm</span></div>
            </Link>
            <Link to='/custumer' className={style.item}>

                <img src="./user-solid.svg" alt="" className={style.img_features} />
                <div  className={style.title}><span>Đơn Hàng</span></div>
            </Link>
            <Link to className={style.item}>
                <img src="./right-from-bracket-solid.svg" alt="" className={style.img_features} />
                <span className={style.title}>Đăng xuất</span>
            </Link>
        </div>
    )
}

export default Features
