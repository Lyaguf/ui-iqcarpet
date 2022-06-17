import React, { useEffect, useState } from 'react';
import FilterItem from './FilterItem.jsx';

function FilterContent(props) {
	let [isOpenedFilter, setIsOpenedFilter] = useState(false);
	let [filterDrag, setFilterDrag] = useState({});

	let onChangeDrag = (id, values) => {
		let newFilter = JSON.parse(JSON.stringify(filterDrag));
		newFilter[id] = values;
		setFilterDrag(newFilter);
	};
	let applyFilterDrag = () => {
		let content = {
			id: [],
			content: [],
		};
		for (const [key, value] of Object.entries(filterDrag)) {
			content.id.push(key);
			content.content.push(value);
		}
		props.changeDragState(filterDrag);
	};

	useEffect(() => {
		if (props.items && props.status) {
			if (props.status === 1) {
				props.items.unshift({
					id: -1,
					type: -1,
					title: props.texts?.allowedError,
				});
			}
		}
	}, [props.items, props.status, props.texts]);

	let drag = false;
	return (
		<div>
			<div className={'catalog__filter__item ' + (isOpenedFilter ? '_active' : '')}>
				<div
					className="catalog__filter__item__header"
					onClick={() => {
						setIsOpenedFilter(!isOpenedFilter);
					}}
				>
					<h5>{props.title}</h5>
					<div className="catalog__filter__item__toggle">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8 1V15"
								stroke="black"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M15 8H1"
								stroke="black"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</div>
				<div className="catalog__filter__item__content">
					{props.items?.map((el, index) => {
						if (el.type === 1) drag = true;
						if (el.type !== 2) {
							let minDrag, maxDrag;
							try {
								let element = props.currentFilter[el.id];
								if (element.type === 1) {
									minDrag = element.content[0];
									maxDrag = element.content[1];
								}
							} catch (e) {
								minDrag = null;
								maxDrag = null;
							}
							return (
								<FilterItem
									key={index}
									{...el}
									onChangeState={props.changeStateItem}
									onChangeDrag={onChangeDrag}
									currentState={props.currentFilter[el.id]?.content}
									actualMin={minDrag}
									actualMax={maxDrag}
									texts={props?.texts}
								/>
							);
						} else {
							return <h6 key={index}>{el.title}</h6>;
						}
					})}
					{drag ? (
						<div
							className="catalog__filter__item__content__item__slider__btn _active"
							onClick={applyFilterDrag}
						>
							{props?.texts?.apply}
						</div>
					) : (
						''
					)}
				</div>
			</div>
			<hr />
		</div>
	);
}

export default FilterContent;
