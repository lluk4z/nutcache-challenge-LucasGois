import '../styles/popup.scss'
import { database } from '../services/firebase';
import { Employee } from './Employee';
import { useState } from 'react';

export function Popup ({ id="popup", onClose = () => {}, children }) {

	const [name, setName] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [gender, setGender] = useState('');
	const [email, setEmail] = useState('');
	const [cpf, setCpf] = useState('');
	const [startDate, setStartDate] = useState('');
	const [team, setTeam] = useState('');

	const listGender = [{id: '', name: ''},
											{id: 'Male', name: 'Male'},
											{id: 'Female', name: 'Female'},
											{id: 'Other', name: 'Other'}							

	];

	const listTeam = [{id: '', name: ''},
											{id: 'Mobile', name: 'Mobile'},
											{id: 'Frontend', name: 'Frontend'},
											{id: 'Backend', name: 'Backend'}							

	];

	const handleOutsideClick = (e) => {
		if(e.target.id === id){
			onClose();
		}
	}

	async function handleRegisterEmployee(event) {
		event.preventDefault();
		const employee = {
			name: name,
			birthDate: birthDate,
			gender: gender,
			email: email,
			cpf: cpf,
			startDate: startDate,
			team: team
			
		};
		await database.ref(`employees/`).push(employee);

		setName('');
		setBirthDate('');
		setGender('');
		setEmail('');
		setCpf('');
		setStartDate('');
		setTeam('');
	}

	return (
		<div id={id} className="popup" onClick={handleOutsideClick}>
			<div className="container">
				<button className="close" onClick={onClose}/>
				<div className="content">
					<h2>Add Employee</h2>
					
					<form method="POST" onSubmit={handleRegisterEmployee}>
						<div className="input-group">
							
							<input class="field" type="text" onChange={event => setName(event.target.value)} value={name}/>
							<label className="field-label">Name*</label>
						</div>
						<div>
							<input class="field" type="date" onChange={event => setBirthDate(event.target.value)} value={birthDate}></input>
							<label className="field-label">Birth Date*</label>
						</div>
						<div>
							<select class="field" value={gender} onChange={event => setGender(event.target.value)}>
								{listGender.map((item, index) => (
									<option value={item.id}>{item.name}</option>
								))}
							</select>
							<label className="field-label">Gender*</label>
						</div>
						<div>
							<input class="field" type="email" onChange={event => setEmail(event.target.value)} value={email}></input>
							<label className="field-label">E-mail*</label>
						</div>
						<div>
							<input class="field" type="text" onChange={event => setCpf(event.target.value)} value={cpf}></input>
							<label className="field-label">CPF*</label>
						</div>
						<div>
							<input class="field" type="date" onChange={event => setStartDate(event.target.value)} value={startDate}></input>
							<label className="field-label">Start Date*</label>
						</div>
						<div>
							<select class="field" value={team} onChange={event => setTeam(event.target.value)}>
								{listTeam.map((item, index) => (
									<option value={item.id}>{item.name}</option>
								))}
							</select>
							<label className="field-label">Team</label>
						</div>
						<button type="submit">Add Employee</button>
					</form>
				</div>
			</div>
		</div>
	)
}