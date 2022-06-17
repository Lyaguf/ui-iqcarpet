import React from 'react';
import { Link } from 'react-router-dom';
import facebook from "../../assets/icons/facebook.svg";
import inst from "../../assets/icons/instagram.svg";
import link from "../../assets/icons/LinkedIN.svg";
import telegram from "../../assets/icons/Telegram.svg";
import vk from "../../assets/icons/VK.svg";
import logo from "../../assets/icons/logo.svg";


export const Footer = () => {
	return (
		<>
			<footer className="footer">
				<div className="container">
					<div className="row footer__content">
						<div className="col-md-2 col-xl-4 footer__content__logo">
							<Link to="/">
								<img src={logo} alt="#" />
							</Link>
						</div>
						<div className="offset-md-1 offset-xl-0 col-xl-3 col-md-4 footer__content__nav">
							<Link to="/catalog" className="footer__content__nav__item">
								{"Каталог"}
							</Link>
							<Link to="/contacts" className="footer__content__nav__item">
								{"Контакты"}
							</Link>
						</div>
						<div className="offset-md-1 offset-xl-2 col-xl-3 col-md-4 footer__content__social">
							<a href="#">
								<img src={facebook} alt="#" />
							</a>
							<a href="#">
								<img src={inst} alt="#" />
							</a>
							<a href="#">
								<img src={vk} alt="#" />
							</a>
							<a href="#">
								<img src={link} alt="#" />
							</a>
							<a href="#">
								<img src={telegram} alt="#" />
							</a>
						</div>
					</div>
				</div>
			</footer>
			<section className="underfooter">
				<div className="container">
					<div className="row">
						<div className="offset-xl-2 col-xl-8 underfooter__content">
							<Link to="/terms-of-use" className="underfooter__content__item">
								Пользовательское соглашение
							</Link>
							<Link to="/privacy-policy" className="underfooter__content__item">
								Политика конфидециальности 
							</Link>
							<div className="underfooter__content__item">© 2021 IQCarpet</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
