import '../styles/employee.scss'
import { database } from '../services/firebase'

export function Employee ({
	name,
	birthDate,
	gender,
	email,
	cpf,
	startDate,
	team,
	children,
}) {

	async function handleDeleteEmployee(employeeId) {
		if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')){
			await database.ref(`employees/${employeeId}`).remove();
		}
	}

	return (
		<div>
			<div className="employee">
				<div className="infos">
					<div><p><span>Name: </span> {name}</p></div>
					<p><span>E-mail: </span>{email}</p>
					<p><span>Start date: </span>{startDate}</p>
					<div><p><span>Team: </span>{team}</p></div>
				</div>
			
				{children}
						
			</div>
			<div className="division"></div>
		</div>
	)
}