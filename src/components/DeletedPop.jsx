import '../styles/deletedPop.scss'
import { database } from '../services/firebase';
import { useState } from 'react';

export default function DeletedPop ({ id="popupDel", onClose = () => {}, children }) {

	const handleOutsideClick = (e) => {
		if(e.target.id === id){
			onClose();
		}
	}

	return (
		<div id={id} className="popupDel" onClick={handleOutsideClick}>
			<div className="containerDel">
				<button className="closeDel" onClick={onClose}/>
				<div className="contentDel">
					<h2>DELETED!</h2>
				</div>
			</div>
		</div>
	)
}