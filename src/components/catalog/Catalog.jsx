import React, { useEffect, useRef, useState } from 'react';
import FilterContent from './FilterContent.jsx';
import ItemsTitle from '../global/ItemTitle.jsx';
import CatalogItem from './CatalogItem.jsx';
import arrowRightG from '../../assets/icons/arrow-right-grey.svg';
import closeDark from '../../assets/icons/close-dark.svg';
import arrowBack from '../../assets/icons/arrow-back.svg';
import search from '../../assets/icons/Search.svg';
import searchBlue from '../../assets/icons/search-blue.svg';
import filterSelected from '../../assets/icons/filter-selected.svg';
import downDark from '../../assets/icons/down-dark.svg';
import filterIcon from '../../assets/icons/filter.svg';
import sort from '../../assets/icons/sort.svg';
import cartpet from '../../assets/images/carpet1.png';

export const Catalog = (props) => {
	console.log('CATALOG DRAW', props);

	let [filter, setFilter] = useState({});
	let [items, setItems] = useState({});
	let [page, setPage] = useState(1);
	let [isOpenedSortDropdown, setIsOpenedSortDropdown] = useState(false);
	let [selectedSort, setSelectedSort] = useState(0);
	let [filterDragBorders, setFilterDragBorders] = useState({});

	let [isActiveSortMobile, setIsActiveSortMobile] = useState(false);
	let [isActiveFilterMobile, setIsActiveFilterMobile] = useState(false);
	let [isFocusedSearch, setIsFocusedSearch] = useState(false);
	let [searchValue, setSearchValue] = useState('');
	let [searchHints, setSearchHints] = useState([]);
	let [isLoadingSearch, setIsLoadingSearch] = useState(false);
	let [isLoadingItems, setIsLoadingItems] = useState(true);
	let [isLoadingContent, setIsLoadingContent] = useState(true);
	let [itemsCount, setItemsCount] = useState(0);
	let [filterTags, setFilterTags] = useState([]);

	const isInitialMount = useRef(true);
	const isOnLoad = useRef(true);
	const searchHintsCnt = useRef(0);
	const lastFilter = useRef('{}');

	useEffect(() => {
		if (items[props.currentLanguage]?.length) {
			if (itemsCount <= items[props.currentLanguage]?.length) {
				setIsLoadingItems(false);
			} else {
				setIsLoadingItems(true);
			}
		}
	}, [itemsCount, items]);
	let updateItems = () => {
		lastFilter.current = JSON.stringify(filter);
		let filter_element = lastFilter.current;
		let current_page = JSON.parse(JSON.stringify(page));
		setTimeout(() => {
			if (filter_element !== lastFilter.current) return;
			fetch('/items?page=' + page + '&filter=' + JSON.stringify(filter) + '&sort=' + selectedSort)
				.then((response) => response.json())
				.then((data) => {
					setItemsCount(data.count);
					data = data.items;
					setIsLoadingContent(false);
					if (current_page === 1) setItems(data);
					else {
						let copyItems = JSON.parse(JSON.stringify(items));
						for (const key of Object.keys(items)) {
							copyItems[key] = copyItems[key].concat(data[key]);
						}
						setItems(copyItems);
					}
					console.log(data);
					setTimeout(() => {
						isOnLoad.current = false;
					}, 1000);
				});
		}, 1500);
	};

	let changeStateItem = (id, content) => {
		let newFilter = JSON.parse(JSON.stringify(filter));
		newFilter[id] = { type: 0, content: content, id: id };
		console.log(content, id);
		setFilter(newFilter);
	};
	let changeDragState = (filterDrag) => {
		let newFilter = JSON.parse(JSON.stringify(filter));
		for (const [key, value] of Object.entries(filterDrag)) {
			newFilter[key] = { type: 1, content: value, id: key };
		}
		setFilter(newFilter);
	};
	let removeFilter = (id) => {
		let new_filter = JSON.parse(JSON.stringify(filter));
		if (filterDragBorders[id]) {
			new_filter[id].content = filterDragBorders[id];
		} else {
			new_filter[id].content = false;
		}
		setFilter(new_filter);
	};
	let resetFilters = () => {
		let new_filter = JSON.parse(JSON.stringify(filter));
		Object.keys(filter).forEach((id) => {
			if (filterDragBorders[id]) {
				new_filter[id].content = filterDragBorders[id];
			} else {
				new_filter[id].content = false;
			}
		});
		setFilter(new_filter);
	};
	let getFilterCount = () => {
		return Object.values(filter).filter((el) => {
			if (el.type === 0) return el.content !== false;
			else
				return (
					filterDragBorders[el.id] && JSON.stringify(filterDragBorders[el.id]) !== JSON.stringify(el.content)
				);
		}).length;
	};
	let changeSort = (id) => {
		setSelectedSort(id);
		setIsOpenedSortDropdown(false);
	};

	let updateSearchHints = (title) => {
		fetch('/items/search?content=' + title)
			.then((response) => response.json())
			.then((data) => {
				setSearchHints(data);
				setIsLoadingSearch(false);
			});
	};
	let onInputReset = () => {
		setSearchValue('');
		applySearch(false);
		updateSearchHints('');
	};
	let onInputSearch = (e) => {
		setSearchValue(e.target.value);
		searchHintsCnt.current += 1;
		setIsLoadingSearch(true);
		setTimeout(() => {
			searchHintsCnt.current -= 1;
			if (searchHintsCnt.current === 0) {
				updateSearchHints(e.target.value);
			}
		}, 2000);
	};

	let applySearch = (searchValue) => {
		changeStateItem('search', searchValue);
	};

	let onSelectSearchItem = (el) => {
		setSearchValue(el.title);
		applySearch(el.title);
		updateSearchHints(el.title);
	};

	let onApplySearch = () => {
		applySearch(searchValue);
	};

	useEffect(() => {
		fetch('/items/search?content=')
			.then((response) => response.json())
			.then((data) => {
				setSearchHints(data);
				setIsLoadingSearch(false);
			});
	}, []);
	useEffect(() => {
		if (props.searchInitial) {
			changeStateItem('search', props.searchInitial);
		}
	}, [props.searchInitial]);
	useEffect(() => {
		if (props.filterInitial) {
			changeStateItem(props.filterInitial, true);
		}
	}, [props.filterInitial]);
	useEffect(() => {
		if (!(isInitialMount.current && props.filterInitial)) {
			updateItems();
		}
	}, [page]);
	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			setIsLoadingContent(true);
			if (page === 1) updateItems();
			setPage(1);
		}
	}, [filter, selectedSort]);
	useEffect(() => {
		if (props.scroll < 200 && !isOnLoad.current && itemsCount / 15 > page) {
			isOnLoad.current = true;
			setPage(page + 1);
		}
	}, [props.scroll]);
	useEffect(() => {
		let filterDragValues = {};
		props.filterItems?.forEach((el) => {
			el.items
				?.filter((el1) => el1.type === 1)
				?.forEach((el1) => {
					filterDragValues[el1.id] = [el1.from, el1.to];
				});
		});
		setFilterDragBorders(filterDragValues);
	}, [props.filterItems]);

	useEffect(() => {
		fetch('/filter/tags')
			.then((response) => response.json())
			.then((data) => {
				setFilterTags(data);
			});
	}, []);
	let openTagFilter = (tag) => {
		let newFilter = JSON.parse(JSON.stringify(filter));
		filterTags[props.currentLanguage].forEach((el) => {
			newFilter[el.idInFilter] = { type: 0, content: false, id: el.idInFilter };
		});
		newFilter[tag] = { type: 0, content: true, id: tag };
		setFilter(newFilter);
	};

	// if (Object.values(props).includes(undefined))
	// 	return (
	// 		<div className="loaderPageWrapper">
	// 			<Loader />
	// 		</div>
	// 	);

	return (
		<div>
			<section className="catalog">
				<div className="container">
					<div className="row">
						<div className="col-xl-3 col-md-4 col-9">
							<div className="catalog__tags _mobd">
								{[
									{
										id: 1,
										color: '#FCD901',
										font: 'black',
										label: 'NEW',
										title: 'Новинки',
									},
									{
										id: 2,
										color: '#FE3501',
										font: 'white',
										label: 'Скидка',
										title: 'Распродажа',
									},
								].map((tag, index) => (
									<div
										key={index}
										className="catalog__tags__item"
										onClick={() => {
											openTagFilter(tag.idInFilter);
										}}
									>
										<div
											className="catalog__tags__item__icon"
											style={{ backgroundColor: tag.color, color: tag.font }}
										>
											{tag.label}
										</div>
										<div className="catalog__tags__item__text">
											{tag.title} <img src={arrowRightG} alt="#" />
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="col-xl-9 col-md-8">
							<div className="catalog__title">
								<h1>
									Каталог продавца
									<span>
										<ItemsTitle currentLanguage={'ru'} count={2036} />
									</span>
								</h1>
							</div>
						</div>
					</div>

					<div className="row">
						<div
							className={
								'catalog__sort__dropdown _mobd' +
								(window.innerWidth < 768 && isActiveSortMobile ? ' _active' : '')
							}
						>
							<div
								className="catalog__sort__dropdown__close"
								onClick={() => {
									setIsActiveSortMobile(false);
								}}
							>
								<img src={closeDark} alt="#" />
							</div>
							<div className="catalog__sort__dropdown__title">
								<h5>Сортировка</h5>
							</div>
							<div className="catalog__sort__dropdown__list">
								{[
									{
										id: 1,
										title: 'Тест 1',
									},
									{
										id: 2,
										title: 'Тест 2',
									},
									{
										id: 3,
										title: 'Тест 3',
									},
								].map((el, index) => (
									<div
										key={index}
										className={
											'catalog__sort__dropdown__list__item ' +
											(el.id === selectedSort ? '_active' : '')
										}
										onClick={() => {
											changeSort(el.id);
										}}
									>
										<span>
											<strong></strong>
										</span>
										{el.title}
									</div>
								))}
							</div>
						</div>
						<div
							className={
								'col-xl-3 col-md-4 catalog__filter__wrapper' +
								(window.innerWidth < 768 && isActiveFilterMobile ? ' _active' : '')
							}
						>
							<div className="catalog__tags _deskm">
								{[
									{
										id: 1,
										color: '#FCD901',
										font: 'black',
										label: 'NEW',
										title: 'Новинки',
									},
									{
										id: 2,
										color: '#FE3501',
										font: 'white',
										label: 'Скидка',
										title: 'Распродажа',
									},
								].map((tag, index) => (
									<div
										key={index}
										className="catalog__tags__item"
										onClick={() => {
											openTagFilter(tag.idInFilter);
										}}
									>
										<div
											className="catalog__tags__item__icon"
											style={{ backgroundColor: tag.color, color: tag.font }}
										>
											{tag.label}
										</div>
										<div className="catalog__tags__item__text">
											{tag.title} <img src={arrowRightG} alt="#" />
										</div>
									</div>
								))}
							</div>
							<div className="catalog__filter">
								<div className="catalog__filter__title _deskm">
									<h3>{props?.texts?.filterTitle}</h3>
								</div>
								<div className="catalog__filter__header _mobd">
									<div
										className="catalog__filter__header__back"
										onClick={() => {
											setIsActiveFilterMobile(false);
										}}
									>
										<img src={arrowBack} alt="#" />
									</div>
									<div className="catalog__filter__header__reset _active" onClick={resetFilters}>
										Сбросить фильтры
										<strong>
											(<span>{getFilterCount()}</span>)
										</strong>
									</div>
								</div>
								<hr />

								{props?.filterItems?.map((el, index) => {
									if (el.wallet_id && el.wallet_id !== props.currentWallet) return '';
									return (
										<FilterContent
											key={index}
											{...el}
											currentFilter={filter}
											changeStateItem={changeStateItem}
											changeDragState={changeDragState}
											texts={props?.texts}
										/>
									);
								})}
							</div>
						</div>
						<div className="col-xl-9 col-md-8">
							<div className="container_fluid">
								<div className="row">
									{!props?.hideSearch && (
										<div className="col-xl-12">
											<div className={'catalog__search' + (isFocusedSearch ? ' _active' : '')}>
												<div className="catalog__search__input">
													{searchValue?.length ? (
														<div
															className="catalog__search__input__close"
															onMouseDown={onInputReset}
														>
															<img src={closeDark} alt="#" />
														</div>
													) : (
														''
													)}

													<input
														type="text"
														placeholder={props?.texts?.searchPlaceholder}
														onFocus={() => setIsFocusedSearch(true)}
														onBlur={() => setIsFocusedSearch(false)}
														onChange={onInputSearch}
														value={searchValue}
													/>
												</div>
												<div className="catalog__search__button" onMouseDown={onApplySearch}>
													<img src={search} alt="#" />
												</div>
												<div className="catalog__search__dropdown">
													<div className="catalog__search__dropdown__item catalog__search__dropdown__item--hint">
														{props?.texts?.searchHint}
													</div>
													{searchHints && !isLoadingSearch
														? searchHints?.map((el, index) => (
																<div
																	key={index}
																	className="catalog__search__dropdown__item"
																	onMouseDown={() => onSelectSearchItem(el)}
																>
																	<div className="catalog__search__dropdown__item__text">
																		{el.title}
																	</div>
																	<div className="catalog__search__dropdown__item__arrow">
																		<img src={searchBlue} alt="#" />
																	</div>
																</div>
														  ))
														: ''
														  // <div className="d-flex justify-content-center align-items-center">
														  // 	<Loader />
														  // </div>
													}
												</div>
											</div>
										</div>
									)}

									<div className="catalog__filters__wrapper--global">
										<div
											className={
												'catalog__filters__wrapper' +
												(window.scrollY > 50 && window.innerWidth >= 768
													? ' _active'
													: ' _hidden')
											}
										>
											<div className="container">
												<div
													className={
														'catalog__sort _deskm ' +
														(isOpenedSortDropdown ? '_active' : '')
													}
												>
													<div
														className="catalog__sort__btn catalog__sort__btn--sort"
														onClick={() => setIsOpenedSortDropdown(!isOpenedSortDropdown)}
													>
														{selectedSort
															? props?.sort?.filter((el) => el.id === selectedSort)[0]
																	.title
															: 'Сортировка'}{' '}
														<img src={downDark} alt="#" />
													</div>
													<div className="catalog__sort__dropdown">
														{props?.sort?.map((el, index) => (
															<div
																key={index}
																className="catalog__sort__dropdown__item"
																onClick={() => {
																	changeSort(el.id);
																}}
															>
																<span>{el.title}</span>
																{el.id === selectedSort ? (
																	<span>
																		<img src={filterSelected} alt="#" />
																	</span>
																) : (
																	''
																)}
															</div>
														))}
													</div>
													{getFilterCount() ? (
														<div className="catalog__sort__info">
															{props?.texts?.acceptedFilters}
														</div>
													) : (
														''
													)}
												</div>
												<div className="catalog__buttons _mobd">
													<div
														className="catalog__sort__btn catalog__sort__btn--sort"
														onClick={() => {
															setIsActiveSortMobile(true);
														}}
													>
														{selectedSort
															? props?.sort?.filter((el) => el.id === selectedSort)[0]
																	.title
															: 'Сортировка'}{' '}
														<img src={sort} alt="#" />
													</div>
													<div
														className="catalog__sort__btn catalog__sort__btn--filters"
														onClick={() => {
															setIsActiveFilterMobile(true);
														}}
													>
														{'Сортировка'}
														<img src={filterIcon} alt="#" />
													</div>
												</div>
												{getFilterCount() ? <hr /> : ''}
												{getFilterCount() && props?.filterTexts ? (
													<div className="catalog__filters">
														{Object.values(filter)
															?.filter((el) => {
																if (el.type === 0) return el.content !== false;
																else
																	return (
																		filterDragBorders[el.id] &&
																		JSON.stringify(filterDragBorders[el.id]) !==
																			JSON.stringify(el.content)
																	);
															})
															?.map((el, index) => (
																<div key={index} className="catalog__filters__item">
																	<div
																		className="catalog__filters__item__close"
																		onClick={() => {
																			removeFilter(el.id);
																		}}
																	>
																		<img src={closeDark} alt="#" />
																	</div>
																	{el.id === 'search'
																		? el.content
																		: el.type === 0
																		? props.filterTexts[el.id]
																		: props.filterTexts[el.id] +
																		  ' ' +
																		  props?.texts?.from +
																		  ' ' +
																		  el.content[0] +
																		  ' ' +
																		  props?.texts?.to +
																		  ' ' +
																		  el.content[1]}
																</div>
															))}
														{getFilterCount() ? (
															<div
																className="catalog__filters__reset _deskm"
																onClick={resetFilters}
															>
																{"Сбросить фильтры"}
															</div>
														) : (
															''
														)}
													</div>
												) : (
													''
												)}
											</div>
										</div>
										<div
											className={
												'catalog__filters__wrapper' +
												(window.scrollY > 50 && window.innerWidth >= 768 ? ' _not_active' : '')
											}
										>
											<div className="container">
												<div
													className={
														'catalog__sort _deskm ' +
														(isOpenedSortDropdown ? '_active' : '')
													}
												>
													<div
														className="catalog__sort__btn catalog__sort__btn--sort"
														onClick={() => setIsOpenedSortDropdown(!isOpenedSortDropdown)}
													>
														{selectedSort
															? props?.sort?.filter((el) => el.id === selectedSort)[0]
																	.title
															: 'Сортировка'}{' '}
														<img src={downDark} alt="#" />
													</div>
													<div className="catalog__sort__dropdown">
														{props?.sort?.map((el, index) => (
															<div
																key={index}
																className="catalog__sort__dropdown__item"
																onClick={() => {
																	changeSort(el.id);
																}}
															>
																<span>{el.title}</span>
																{el.id === selectedSort ? (
																	<span>
																		<img src={filterSelected} alt="#" />
																	</span>
																) : (
																	''
																)}
															</div>
														))}
													</div>
													{getFilterCount() ? (
														<div className="catalog__sort__info">Выбранные фильтры</div>
													) : (
														''
													)}
												</div>
												<div className="catalog__buttons _mobd">
													<div
														className="catalog__sort__btn catalog__sort__btn--sort"
														onClick={() => {
															setIsActiveSortMobile(true);
														}}
													>
														{selectedSort
															? props?.sort?.filter((el) => el.id === selectedSort)[0]
																	.title
															: 'Сортировка'}
														<img src={sort} alt="#" />
													</div>
													<div
														className="catalog__sort__btn catalog__sort__btn--filters"
														onClick={() => {
															setIsActiveFilterMobile(true);
														}}
													>
														{'Сортировка'}
														<img src={filterIcon} alt="#" />
													</div>
												</div>
												{getFilterCount() ? <hr /> : ''}
												{getFilterCount() && props.filterTexts ? (
													<div className="catalog__filters">
														{Object.values(filter)
															.filter((el) => {
																if (el.type === 0) return el.content !== false;
																else
																	return (
																		filterDragBorders[el.id] &&
																		JSON.stringify(filterDragBorders[el.id]) !==
																			JSON.stringify(el.content)
																	);
															})
															.map((el, index) => (
																<div key={index} className="catalog__filters__item">
																	<div
																		className="catalog__filters__item__close"
																		onClick={() => {
																			removeFilter(el.id);
																		}}
																	>
																		<img src={closeDark} alt="#" />
																	</div>
																	{el.id === 'search'
																		? el.content
																		: el.type === 0
																		? props.filterTexts[el.id]
																		: props.filterTexts[el.id] +
																		  ' ' +
																		  props?.texts?.from +
																		  ' ' +
																		  el.content[0] +
																		  ' ' +
																		  props?.texts?.to +
																		  ' ' +
																		  el.content[1]}
																</div>
															))}
														{getFilterCount() ? (
															<div
																className="catalog__filters__reset _deskm"
																onClick={resetFilters}
															>
																{"Сбросить фильтры"}
															</div>
														) : (
															''
														)}
													</div>
												) : (
													''
												)}
											</div>
										</div>
									</div>
									<div className="catalog__filters__reset _mobd" onClick={resetFilters}>
										{"Сбросить фильтры"}
									</div>
									<hr />
									<div className="catalog__items">
											<div className="row">
													{[{
                                                        id: 22,
                                                        image: cartpet,
                                                        price: {
                                                            'USD': 1000
                                                        },
                                                        tags: [
                                                            {
                                                                color: '#FE3501',
                                                                font: 'white',
                                                                label: 'Скидка',
                                                                title: 'Распродажа',
                                                            },
                                                            {
                                                                color: '#000000',
                                                                font: 'white',
                                                                label: 'Скидка',
                                                                title: 'Распродажа',
                                                            }
                                                        ],
                                                        title: "Ковер 1"
                                                    }, {
                                                        id: 22,
                                                        image: cartpet,
                                                        price: {
                                                            'USD': 1000
                                                        },
                                                        tags: [
                                                            {
                                                                color: '#FE3501',
                                                                font: 'white',
                                                                label: 'Скидка',
                                                                title: 'Распродажа',
                                                            },
                                                            {
                                                                color: '#000000',
                                                                font: 'white',
                                                                label: 'Скидка',
                                                                title: 'Распродажа',
                                                            }
                                                        ],
                                                        title: "Ковер 1"
                                                    }, {
                                                        id: 22,
                                                        image: cartpet,
                                                        price: {
                                                            'USD': 1000
                                                        },
                                                        tags: [
                                                            {
                                                                color: '#FE3501',
                                                                font: 'white',
                                                                label: 'Скидка',
                                                                title: 'Распродажа',
                                                            },
                                                            {
                                                                color: '#000000',
                                                                font: 'white',
                                                                label: 'Скидка',
                                                                title: 'Распродажа',
                                                            }
                                                        ],
                                                        title: "Ковер 1"
                                                    }].map((el, index) => (
														<CatalogItem
															{...el}
															key={index}
															{...Object.assign({}, props, {
																filterItems: undefined,
																filterTexts: undefined,
																sort: undefined,
															})}
														/>
													))}
											</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Catalog;
