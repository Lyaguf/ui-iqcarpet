import React, { useState } from 'react';
import "./hideContact.scss";

export function HideContact(props) {
	const [showContact, setShowContact] = useState(false);
	const mask = props?.isPhone ? '8 XXX XXX-XX-XX' : 'XXXXXX@mail.com';
	const showContactHandler = () => {
		setShowContact(!showContact);
	};
	return (
		<div className="hideContact">
			<div className="hideContact__contact">{showContact ? props?.contact : mask}</div>
			{!showContact && (
				<div className="hideContact__button" onClick={showContactHandler}>
					показать
				</div>
			)}
		</div>
	);
}
