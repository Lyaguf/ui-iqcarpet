import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { SellerDetail } from './components/seller/sellerDetail/SellerDetail';
import './scss/bootstrap.min.css';
import './scss/common.scss';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<div className="page-wrapper">
			<BrowserRouter>
				<Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
					<Route path="/" element={<SellerDetail />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
