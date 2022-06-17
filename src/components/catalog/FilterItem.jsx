import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import selected from '../../assets/icons/selected.svg';

function FilterItem(props) {
	let type = props.type;

	let [min, setMin] = useState(props.actualMin || props.from);
	let [max, setMax] = useState(props.actualMax || props.to);
	let onSliderChange = (value) => {
		setMin(value[0]);
		setMax(value[1]);
	};
	let onMinChange = (e) => {
		setMin(+e.target.value);
	};
	let onMaxChange = (e) => {
		setMax(+e.target.value);
	};
	useEffect(() => {
		props.onChangeDrag(props.id, [min, max]);
	}, [min, max]);
	useEffect(() => {
		if (props.actualMin && props.actualMax) {
			setMin(props.actualMin);
			setMax(props.actualMax);
		}
	}, [props.actualMin, props.actualMax]);

	if (type !== 1 && type !== 2) {
		return (
			<div className={'catalog__filter__item__content__item ' + (props.currentState ? '_active' : '')}>
				<div
					onClick={() => {
						props.onChangeState(props.id, !props.currentState);
					}}
				>
					<div className="catalog__filter__item__content__item__box">
						<img src={selected} alt="#" />
					</div>
					<span className="catalog__filter__item__content__item__text">{props.title}</span>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<div className="catalog__filter__item__content__item__slider">
					<p>{props.title}</p>
					<div className="drag">
						<Slider range value={[min, max]} min={props.from} max={props.to} onChange={onSliderChange} />
					</div>
					<div className="drag__numbers">
						<div className="drag__numbers__left">
							<span>{props?.texts?.from}</span>
							<input type="text" placeholder={props.from} value={min} onChange={onMinChange} />
						</div>
						<div className="drag__numbers__right">
							<span>{props?.texts?.to}</span>
							<input type="text" placeholder={props.to} value={max} onChange={onMaxChange} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FilterItem;
