import '../styles/home.scss'
import { Employee } from '../components/Employee'
import { useEffect, useState } from 'react'
import LogoImg  from '../assets/images/logo.png';
import DeletedPop from '../components/DeletedPop';
import Illustration from '../assets/images/illustration.png';

import { Popup } from '../components/Popup';

import { database, firebase } from '../services/firebase'


export function Home() {
	const [isPopupVisible, setPopupVisible] = useState(false);
	const [infos, setInfos] = useState([]);
	const [deleted, setDeleted] = useState(false)

	async function handleDeleteEmployee(employeeId) {
		if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')){
			await database.ref(`employees/${employeeId}`).remove();
			setDeleted(true)
		}
	}

	async function handleUpdateEmployee(name, birthDate, gender, email, cpf, startDate, team) {
		var postData = {
			name: name,
			birthDate: birthDate,
			gender: gender,
			email: email,
			cpf: cpf,
			startDate: startDate,
			team: team,
		}

		
		if (window.confirm('Quer atualizar?')) {
			await database.ref(`employees/${name}`).update({name: name})
		}
		
	}

	useEffect(() => {
	
		const EmployeeRef = database.ref(`employees/`);

		EmployeeRef.on('value', employee => {
			const databaseEmployees = employee.val();
			//const firebaseEmployees = databaseEmployees.infos ?? {};
			//console.log(databaseEmployees.infos)
			const parsedEmployees = Object.entries(databaseEmployees ?? {}).map(([key, value]) => {
				return {
					id: key,
					name: value.name,
					birthDate: value.birthDate,
					gender: value.gender,
					email: value.email,
					cpf: value.cpf,
					startDate: value.startDate,
					team: value.team,
				}
			})
			setInfos(parsedEmployees)
			//console.log(parsedEmployees)
			
		})
		
	}, []);

	return(
		<div id="page-home">
			<header>
				<div className="content">
					<img src={LogoImg}></img>
					<button onClick={()=> setPopupVisible(true) } >ADD EMPLOYEE</button>
					
				</div>
			</header>
			{isPopupVisible ? (
				<Popup onClose={()=> setPopupVisible(false) } >
					
				</Popup>
				) : null}
				{deleted ? (
					<DeletedPop onClose={()=> setDeleted(false) } >
						
					</DeletedPop>) : null}
				
			<main className="content">
				<h1>Employees List</h1>
				<div className="employees-list">
					
					<div>
						<table className="styled-table">
							<tr>
						{infos.map(info => {
							return (
								<th>
								<Employee
									key={info.id}
									name={info.name}
									birthDate={info.birthDate}
									gender={info.gender}
									email={info.email}
									cpf={info.cpf}
									startDate={info.startDate}
									team={info.team}

								>
								<div className="buttons">
									<button id="edit" onClick={() => handleUpdateEmployee(info.id)}>Edit</button>
									<button id="delete" onClick={() => handleDeleteEmployee(info.id, info.name, info.birthDate, info.gender, info.email, info.cpf, info.startDate, info.team)}>Delete</button>

								</div>

								</Employee>
								</th>
								
							
							)
							
						})}
						</tr>
						</table>
					</div>
				</div>
			</main>
		</div>
	)
}