
export function createEmployee(){
	fetch ('https://crudcrud.com/api/32c4ace1dfc8424ea13c570cbc13f239/nutemployee', {
		headers: {"Content-Type": "application/json; charset = utf-8"},
		method: 'POST',
		body: JSON.stringify({
			name: 'Ednaldo Pereira',
			birthDate: '03/05/1989',
			gender: 'Male',
			email: 'ednaldo@gmail.com',
			cpf: '125893495-34',
			startDate: '11/04/2010',
			team: 'Frontend'
		})
	}).then(response => response.json()).then(data => console.log(data))
}

export function readEmployee() {
	fetch('https://crudcrud.com/api/32c4ace1dfc8424ea13c570cbc13f239/nutemployee')
	.then(response => response.json()).then(data => console.log(data))
}