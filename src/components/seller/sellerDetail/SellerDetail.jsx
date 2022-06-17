import React, { useState } from 'react';
import { HideContact } from '../../global/HideContact/HideContact';
import testAvatar from '../../../assets/images/seller_avatar.png';
import placeholder from '../../../assets/icons/Placeholder.svg';
import shape from '../../../assets/icons/Shape.svg';
import testBg from '../../../assets/images/seller_bg.png';
import fc from '../../../assets/icons/blueFacebook.svg';
import inst from '../../../assets/icons/blueInstagram.svg';
import link from '../../../assets/icons/blueLinkedIN.svg';
// import "./sellerDetail.scss";
import Header from '../../global/header/header';
import Catalog from '../../catalog/Catalog';
import { Footer } from '../../global/Footer';

export const SellerDetail = () => {
	const [showMoreAbout, setShowMoreAbout] = useState(false);

	const accordionHandler = () => {
		setShowMoreAbout(!showMoreAbout);
	};

	return (
		<>
            <Header />
			<div className="sellerInfo">
				<div
					className="sellerInfo__background"
					style={{
						backgroundImage: `url(${testBg}`,
					}}
				/>
				<div className="container">
					<div className="sellerInfo__card">
						<div className="row justify-content-between">
							<div className="sellerInfo__main">
								<div className="sellerInfo__row">
									<img className="sellerInfo__avatar" src={testAvatar} />
									<div>
										<div className="sellerInfo__title">Название продавца</div>
										<div className="sellerInfo__row">
											<div className="sellerInfo__country">
												<img className="sellerInfo__country-icon" src={placeholder} />
												<div className="sellerInfo__country-text">Иван, г. Тегеран</div>
											</div>
											<div className="sellerInfo__country">
												<img className="sellerInfo__country-icon" src={shape} />
												<div className="sellerInfo__country-text">русский, турецкий языки</div>
											</div>
										</div>
										<div className="sellerInfo__row">
											<a
												href="#"
												className="sellerInfo__socialMedia"
												style={{
													backgroundImage: `url(${fc}`,
												}}
											/>
											<a
												href="#"
												className="sellerInfo__socialMedia"
												style={{
													backgroundImage: `url(${inst}`,
												}}
											/>
											<a
												href="#"
												className="sellerInfo__socialMedia"
												style={{
													backgroundImage: `url(${link})`,
												}}
											/>
										</div>
									</div>
								</div>
								<div className="sellerInfo__about">
									<div className="sellerInfo__about-title">О компании</div>
									<div className="sellerInfo__about-text">
										Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать
										несколько абзацев более менее осмысленного текста рыбы на русском языке, а
										начинающему оратору отточить навык публичных выступлений в домашних условиях.
									</div>
									{!showMoreAbout && (
										<div className="sellerInfo__about-button" onClick={accordionHandler}>
											{'Подробнее >>'}
										</div>
									)}
								</div>
							</div>
							<div className="sellerInfo__contacts">
								<div className="sellerInfo__contacts-block">
									<div className="sellerInfo__contacts-title">Телефон</div>
									<div className="sellerInfo__contacts-item">
										<HideContact isPhone={true} contact={'8 888 888-88-88'} />
									</div>
									<div className="sellerInfo__contacts-item">
										<HideContact isPhone={true} contact={'8 888 888-88-88'} />
									</div>
								</div>
								<div className="sellerInfo__contacts-block">
									<div className="sellerInfo__contacts-title">Почта</div>
									<div className="sellerInfo__contacts-item">
										<HideContact isPhone={false} contact={'kov@mail.ru'} />
									</div>
									<div className="sellerInfo__contacts-item">
										<HideContact isPhone={false} contact={'kov@mail.ru'} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="sellerInfo sellerInfo--mobile">
				<div
					className="sellerInfo__background"
					style={{
						backgroundImage: testBg,
					}}
				/>
				<div className="container">
					<div className="sellerInfo__card">
						<div className="sellerInfo__main">
							<div>
								<div className="sellerInfo__row mb-4">
									<img className="sellerInfo__avatar" src={testAvatar} />
									<div className="sellerInfo__title">Название продавца</div>
								</div>
								<div className="mb-3">
									<div className="sellerInfo__country">
										<img className="sellerInfo__country-icon" src={placeholder} />
										<div className="sellerInfo__country-text">Иван, г. Тегеран</div>
									</div>
									<div className="sellerInfo__country">
										<img className="sellerInfo__country-icon" src={shape} />
										<div className="sellerInfo__country-text">русский, турецкий языки</div>
									</div>
								</div>
								<div className="sellerInfo__row">
									<a
										href="#"
										className="sellerInfo__socialMedia"
										style={{
											backgroundImage: `url(${fc}`,
										}}
									/>
									<a
										href="#"
										className="sellerInfo__socialMedia"
										style={{
											backgroundImage: `url(${inst}`,
										}}
									/>
									<a
										href="#"
										className="sellerInfo__socialMedia"
										style={{
											backgroundImage: `url(${link})`,
										}}
									/>
								</div>
							</div>
						</div>
						<div className="sellerInfo__contacts">
							<div className="sellerInfo__contacts-block">
								<div className="sellerInfo__contacts-title">Телефон</div>
								<div className="sellerInfo__contacts-item">
									<HideContact isPhone={true} contact={'8 888 888-88-88'} />
								</div>
								<div className="sellerInfo__contacts-item">
									<HideContact isPhone={true} contact={'8 888 888-88-88'} />
								</div>
							</div>
							<div className="sellerInfo__contacts-block">
								<div className="sellerInfo__contacts-title">Почта</div>
								<div className="sellerInfo__contacts-item">
									<HideContact isPhone={false} contact={'kov@mail.ru'} />
								</div>
								<div className="sellerInfo__contacts-item">
									<HideContact isPhone={false} contact={'kov@mail.ru'} />
								</div>
							</div>
						</div>
						<div className="sellerInfo__about">
							<div className="sellerInfo__about-title">О компании</div>
							<div className="sellerInfo__about-text">
								Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько
								абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору
								отточить навык публичных выступлений в домашних условиях.
							</div>
							{!showMoreAbout && (
								<div className="sellerInfo__about-button" onClick={accordionHandler}>
									{'Подробнее >>'}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
            <Catalog 
                filterItems={
                [{
                    id: 4,
                    title: 'Тестовый фильтр 1',
                    items: [
                        {
                            id: 22,
                            type: 0,
                            title: 'Тестовый подфильтр'
                        },
                        {
                            id: 23,
                            type: 0,
                            title: 'Тестовый подфильтр'
                        },
                        {
                            id: 24,
                            type: 0,
                            title: 'Тестовый подфильтр'
                        }
                    ],
                    wallet_id: 'RU',
                    status: 1
                },{
                    id: 2,
                    title: 'Тестовый фильтр 2',
                    items: [
                        {
                            id: 22,
                            type: 0,
                            title: 'Тестовый подфильтр'
                        },
                        {
                            id: 23,
                            type: 0,
                            title: 'Тестовый подфильтр'
                        },
                        {
                            id: 24,
                            type: 0,
                            title: 'Тестовый подфильтр'
                        }],
                    wallet_id: 'RU',
                    status: 1
                },{
                    id: 3,
                    title: 'Тестовый фильтр 3',
                    items: [
                        {
                            id: 22,
                            type: 0,
                            title: 'Тестовый подфильтр'
                        },
                        {
                            id: 23,
                            type: 0,
                            title: 'Тестовый подфильтр'
                        },
                        {
                            id: 24,
                            type: 0,
                            title: 'Тестовый подфильтр'
                        }],
                    wallet_id: 'RU',
                    status: 1
                }]
            }
            currentWallet={"RU"}
            hideSearch={true}
            sort={
                [
                    {
                        title: 'Тестовая сортировка 1',
                        id: 1
                    },
                    {
                        title: 'Тестовая сортировка 1',
                        id: 3
                    },
                    {
                        title: 'Тестовая сортировка 1',
                        id: 2
                    },
                    {
                        title: 'Тестовая сортировка 1',
                        id: 4
                    }
                ]
            }
            />
            <Footer />
		</>
	);
};
