import React, { useEffect, useRef, useState } from 'react';
// import Loader from './Loader';
import close from '../../../assets/icons/close.svg';
import arrowRightBlue from '../../../assets/icons/arrow-right-blue.svg';
import bFb from "../../../assets/icons/bFacebook.svg";
import bInst from "../../../assets/icons/bInstagram.svg";
import bLink from "../../../assets/icons/bLinkedIN.svg";
import bVK from "../../../assets/icons/bVK.svg";
import bTeleg from "../../../assets/icons/bTelegram.svg"
import down from "../../../assets/icons/down.svg"
import logo from "../../../assets/icons/logo.svg"
import logoDark from "../../../assets/icons/logo-dark.svg"
import closeBlue from "../../../assets/icons/close-blue.svg";
import menu from "../../../assets/icons/menu.svg";
import seachBlue from "../../../assets/icons/search-blue.svg";
import cart from "../../../assets/icons/cart.svg";
import liked from "../../../assets/icons/liked.svg";
import search from "../../../assets/icons/Search.svg";
import { Link } from "react-router-dom";

export const  Header = (props) => {

    const [currentWallet, setCurrentWallet] = useState("USD");
    const [currentLang, setCurrentLang] = useState('RU');
	let [openedLanguage, setOpenedLanguage] = useState(false);
	let [openedWallet, setOpenedWallet] = useState(false);

	let [isOpenedMenuMob, setIsOpenedMenuMob] = useState(false);
	let [isOpenedMenuTablet, setIsOpenedMenuTablet] = useState(false);
	let [isOpenedSearch, setIsOpenedSearch] = useState(false);

	let [searchValue, setSearchValue] = useState('');
	let [searchHints, setSearchHints] = useState([]);
	let [isLoadingSearch, setIsLoadingSearch] = useState(false);
	const searchHintsCnt = useRef(0);

	let changeMenuMob = () => {
		setIsOpenedMenuMob(!isOpenedMenuMob);
	};
	let changeMenuTablet = () => {
		setIsOpenedMenuTablet(!isOpenedMenuTablet);
	};
	let changeSearch = () => {
		setIsOpenedSearch(!isOpenedSearch);
	};

    const walletHandler = (value) => {
        setCurrentWallet(value)
    }

	let onInputSearch = (e) => {
		setSearchValue(e.target.value);
		searchHintsCnt.current += 1;
		setIsLoadingSearch(true);
		setTimeout(() => {
			searchHintsCnt.current -= 1;
			if (searchHintsCnt.current === 0) {
				fetch('/items/search?content=' + e.target.value)
					.then((response) => response.json())
					.then((data) => {
						setSearchHints(data);
						setIsLoadingSearch(false);
					});
			}
		}, 2000);
	};

	useEffect(() => {
		fetch('/items/search?content=')
			.then((response) => response.json())
			.then((data) => {
				setSearchHints(data);
				setIsLoadingSearch(false);
			});
	}, []);

	let closeMenus = () => {
		setIsOpenedMenuTablet(false);
		setIsOpenedMenuMob(false);
		setIsOpenedSearch(false);
	};

	return (
		<header>
			<div className={'header__tablet__menu ' + (isOpenedMenuTablet ? '_active' : '')}>
				<div className="header__tablet__menu__bg"></div>
				<div className="header__tablet__menu__close" onClick={changeMenuTablet}>
					<img src={close} alt="#" />
				</div>
				<div className="header__tablet__menu__content">
					<div className="header__tablet__menu__content__wrapper">
						<div>
							<Link
								to="/"
								className={
									'header__tablet__menu__content__item' + (props.page === 'home' ? ' _active' : '')
								}
							>
								<img src={arrowRightBlue} alt="#" />
								{props?.texts?.homePage}
							</Link>
							<Link
								to="/catalog"
								className={
									'header__tablet__menu__content__item' + (props.page === 'catalog' ? ' _active' : '')
								}
							>
								<img src={arrowRightBlue} alt="#" />
								{props?.texts?.catalogPage}
							</Link>
							<Link
								to="/sellers"
								className={
									'header__tablet__menu__content__item' + (props.page === 'sellers' ? ' _active' : '')
								}
							>
								<img src={arrowRightBlue} alt="#" />
								{props?.texts?.sellersPage}
							</Link>
							<Link
								to="/contacts"
								className={
									'header__tablet__menu__content__item' +
									(props.page === 'contacts' ? ' _active' : '')
								}
							>
								<img src={arrowRightBlue} alt="#" />
								{props?.texts?.contactsPage}
							</Link>
						</div>
						<div className="header__tablet__menu__footer">
							<div className="header__tablet__menu__footer__links">
								<Link to="/terms-of-use">{props?.texts?.textpage1}</Link>
								<Link to="/privacy-policy">{props?.texts?.textpage2}</Link>
							</div>
							<div className="header__tablet__menu__footer__social">
								<a href="#">
									<img src={bFb} alt="#" />
								</a>
								<a href="#">
									<img src={bInst} alt="#" />
								</a>
								<a href="#">
									<img src={bVK} alt="#" />
								</a>
								<a href="#">
									<img src={bLink} alt="#" />
								</a>
								<a href="#">
									<img src={bTeleg} alt="#" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={'header__mobile__menu ' + (isOpenedMenuMob ? '_active' : '')}>
				<div className="header__mobile__menu__header">
					<div className="header__mobile__menu__header__close" onClick={changeMenuMob}>
						<img src={close} alt="#" />
					</div>
					<div className="header__mobile__menu__header__params">
						<div className={'header__menu__params header__menu__params--wallet'}>
							<div
								className="header__menu__params__header"
								onClick={() => {
									setOpenedWallet(!openedWallet);
									setOpenedLanguage(false);
								}}
							>
								<div>{props?.currentWallet?.title}</div>
								<img src={down} alt="#" />
							</div>
							<div
								className="header__menu__params__dropdown__wrapper"
								style={{ maxHeight: openedWallet ? 2 * 40 + 20 : 0 }}
							>
								<div className="header__menu__params__dropdown">
									<div className="header__menu__params__dropdown__arrow"></div>
									{['USD', 'RUB'].map((el, index) => (
										<div
											key={index}
											onClick={() => {
												setCurrentWallet(el);
												setOpenedWallet(false);
											}}
										>
											<div className="header__menu__params__dropdown__item">{el}</div>
											<hr />
										</div>
									))}
								</div>
							</div>
						</div>
						<div className={'header__menu__params header__menu__params--language'}>
							<div
								className="header__menu__params__header"
								onClick={() => {
									setOpenedLanguage(!openedLanguage);
									setOpenedWallet(false);
								}}
							>
								<div>{currentLang}</div>
								<img src={down} alt="#" />
							</div>
							<div
								className="header__menu__params__dropdown__wrapper"
								style={{ maxHeight: openedLanguage ? 2 * 40 + 20 : 0 }}
							>
								<div className="header__menu__params__dropdown">
									<div className="header__menu__params__dropdown__arrow"></div>
									{['RU', 'EN'].map((el, index) => (
										<div
											key={index}
											onClick={() => {
												setCurrentLang(el);
												setOpenedLanguage(false);
											}}
										>
											<div className="header__menu__params__dropdown__item">{el}</div>
											<hr />
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="header__mobile__menu__content">
					<div className="header__mobile__menu__content__wrapper">
						<div>
							<Link
								to="/"
								onClick={closeMenus}
								className={
									'header__mobile__menu__content__item' + (props.page === 'home' ? ' _active' : '')
								}
							>
								<img src={arrowRightBlue} alt="#" />
								{props?.texts?.homePage}
							</Link>
							<Link
								to="/catalog"
								onClick={closeMenus}
								className={
									'header__mobile__menu__content__item' + (props.page === 'catalog' ? ' _active' : '')
								}
							>
								<img src={arrowRightBlue} alt="#" />
								{props?.texts?.catalogPage}
							</Link>
							<Link
								to="/sellers"
								onClick={closeMenus}
								className={
									'header__mobile__menu__content__item' + (props.page === 'sellers' ? ' _active' : '')
								}
							>
								<img src={arrowRightBlue} alt="#" />
								{props?.texts?.sellersPage}
							</Link>
							<Link
								to="/contacts"
								onClick={closeMenus}
								className={
									'header__mobile__menu__content__item' +
									(props.page === 'contacts' ? ' _active' : '')
								}
							>
								<img src={arrowRightBlue} alt="#" />
								{props?.texts?.contactsPage}
							</Link>
						</div>
						<div className="header__mobile__menu__footer">
							<img src={logoDark} alt="#" />
						</div>
					</div>
				</div>
			</div>
			<div className={'header__search ' + (isOpenedSearch ? '_active' : '')}>
				<div className="header__search__input">
					<div className="header__search__close" onClick={changeSearch}>
						<img src={closeBlue} alt="#" />
					</div>
					<input type="text" onChange={onInputSearch} value={searchValue} placeholder="Что вы ищете?" />
					<Link to={'/catalog?search=' + searchValue} onClick={closeMenus} className="header__search__button">
						<img src={seachBlue} alt="#" />
					</Link>
				</div>
				<div className="header__search__hint">{props?.texts?.searchHint}</div>
				<div className="header__search__content">
					{searchHints && !isLoadingSearch ? (
						searchHints.map((el, index) => (
							<Link
								to={'/catalog?search=' + el.title}
								onClick={closeMenus}
								key={index}
								className="header__search__content__item"
							>
								<div className="header__search__content__item__image">
									<img src={el.image} alt="#" />
								</div>
								<div className="header__search__content__item__text">{el.title}</div>
							</Link>
						))
					) : (
						<div className="d-flex justify-content-center align-items-center">
							
						</div>
					)}
				</div>
			</div>

			<div className="header">
				<div className="container">
					<div className="header__menu__mob _mobd">
						<div className="header__mob__left">
							<img
								src={menu}
								alt="#"
								className="header__mob__open"
								onClick={() => {
									changeMenuMob();
								}}
							/>
							<img src={search} alt="#" onClick={changeSearch} />
						</div>
						<div className="header__mob__center">
							<Link to={props.page !== 'home' ? '/' : '#'}>
								<img src={logo} alt="#" />
							</Link>
						</div>
						<div className="header__mob__right">
							{props.likedItems ? (
								<span className={'header__mob__right__count_liked'}>0</span>
							) : (
								''
							)}
							{props.cartItems ? (
								<span className={'header__mob__right__count_cart'}>0</span>
							) : (
								''
							)}
							<Link to="/liked" className="header__count__link">
								<img src={liked} alt="#" />
							</Link>
							<Link to="/cart" className="header__count__link">
								<img src={cart} alt="#" />
							</Link>
						</div>
					</div>
					<div className="header__menu__desk _deskm">
						<div className="row">
							<div className="col-xl-2 col-md-4 header__logo">
								<div
									className="header__logo__menu"
									onClick={() => {
										changeMenuTablet();
									}}
								>
									<span></span>
									<span></span>
									<span></span>
								</div>
								<Link to={props.page !== 'home' ? '/' : '#'}>
									<img src={logo} alt="#" />
								</Link>
							</div>
							<div className="col-xl-3 offset-xl-1 col-2 header__nav">
								{props?.texts?.catalogPage ? (
									<Link to="/catalog" className="header__nav__item header__nav__item--catalog">
										<div>{props?.texts?.catalogPage}</div>
										<div className="header__nav__item--catalog__burger">
											<span></span>
											<span></span>
											<span></span>
										</div>
									</Link>
								) : (
									''
								)}
								<Link to="/sellers" className="header__nav__item">
									{props?.texts?.sellersPage}
								</Link>
								<Link to="/contacts" className="header__nav__item">
									{props?.texts?.contactsPage}
								</Link>
							</div>
							<div className="offset-lg-2 col-6 col-xl-4 header__menu">
								<div className="header__content">
									<Link
										to={'/liked'}
										className={
											'header__menu__item header__menu__item--liked' +
											(props.page === 'liked' ? ' _active' : '') +
											(props.page === 'cart' ? ' _border_none' : '')
										}
									>
										<img src={liked} alt="#" />
										<div>
											(<span>0</span>)
										</div>
									</Link>
									<Link
										to={'/cart'}
										className={
											'header__menu__item header__menu__item--cart' +
											(props.page === 'cart' ? ' _active' : '') +
											(props.page === 'liked' ? ' _border_none' : '')
										}
									>
										<img src={cart} alt="#" />
										<div>
											(<span>0</span>)
										</div>
									</Link>
								</div>
								<div className="header__content">
									<div className={'header__menu__params header__menu__params--wallet'}>
										<div
											className="header__menu__params__header"
											onClick={() => {
												setOpenedWallet(!openedWallet);
												setOpenedLanguage(false);
											}}
										>
											<div>{currentWallet}</div>
											<img src={down} alt="#" />
										</div>
										<div
											className="header__menu__params__dropdown__wrapper"
											style={{ maxHeight: openedWallet ? 2 * 40 + 20 : 0 }}
										>
											<div className="header__menu__params__dropdown">
												<div className="header__menu__params__dropdown__arrow"></div>
												{['USD', 'RUB'].map((el, index) => (
													<div
														key={index}
														onClick={() => {
															setCurrentWallet(el);
															setOpenedWallet(false);
														}}
													>
														<div className="header__menu__params__dropdown__item">
															{el}
														</div>
														<hr />
													</div>
												))}
											</div>
										</div>
									</div>
									<div className={'header__menu__params header__menu__params--language'}>
										<div
											className="header__menu__params__header"
											onClick={() => {
												setOpenedLanguage(!openedLanguage);
												setOpenedWallet(false);
											}}
										>
											<div>{currentLang}</div>
											<img src={down} alt="#" />
										</div>
										<div
											className="header__menu__params__dropdown__wrapper"
											style={{ maxHeight: openedLanguage ? 2 * 40 + 20 : 0 }}
										>
											<div className="header__menu__params__dropdown">
												<div className="header__menu__params__dropdown__arrow"></div>
												{['RU', 'EN'].map((el, index) => (
													<div
														key={index}
														onClick={() => {
															setCurrentLang(el);
															setOpenedLanguage(false);
														}}
													>
														<div className="header__menu__params__dropdown__item">{el}</div>
														<hr />
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
