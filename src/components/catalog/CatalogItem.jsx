import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Price from '../global/Price';
import likedDark from '../../assets/icons/liked_dark.svg';
import likedActive from '../../assets/icons/liked_active_home.svg';
import cartBlue from '../../assets/icons/cart_blue.svg';

function CatalogItem(props) {
	let [render, setRender] = useState(0);
    console.log(props)
	return (
		<div className="col-md-4 col-6">
			<div className="catalog__item">
				<Link to={'/item/' + props.id} className="catalog__item__image">
					<div className="items-slider__slider__item__image__tag__wrapper">
						{props.tags?.map((tag, index1) => (
							<div
								key={index1}
								className={'items-slider__slider__item__image__tag'}
								style={{ backgroundColor: tag.color, color: tag.font }}
							>
								{tag.title}
							</div>
						))}
					</div>
					<img src={props.image} alt="#" />
				</Link>
				<div className="catalog__item__title">
					<Link to={'/item/' + props.id}>{props.title}</Link>
				</div>
				<Price
					price={props.price[props.currentWallet.title]}
					sale={props.sale ? props.sale[props.currentWallet.title] : null}
					wallet={props.currentWallet.sign}
				/>
				<div className="catalog__item__buttons">
					<div
						className={
							'items-slider__slider__item__buttons--cart '
						}
						onClick={() => {
							props.changeCartState(props.id);
						}}
					>
						<strong>{"В корзине"}</strong>
						<span>{"Не в корзине"}</span>
						<img src={cartBlue} alt="#" />
					</div>
					<div
						className={
							'items-slider__slider__item__buttons--liked '
						}
						onClick={() => {
							props.changeLikedState(props.id);
						}}
					>
						<img src={likedDark} alt="#" />
						<img src={likedActive} alt="#" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CatalogItem;
