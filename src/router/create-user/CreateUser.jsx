import React from 'react';
import { useGetValue } from '../../hooks/useGetValue';
import './CreateUser.css';
import { useDispatch } from 'react-redux';
import { addToUsers } from '../../context/user-slice';

const initialState = {
	name: '',
	profession: '',
	age: '',
	gender: 'gender',
};

function CreateUser() {
	const dispatch = useDispatch();
	const { formData, handleChange, setFormData } = useGetValue(initialState);

	const handleSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			id: new Date().getTime(),
			name: formData.name,
			profession: formData.profession,
			age: +formData.age,
			gender: formData.gender,
		};

		dispatch(addToUsers(newUser));
		setFormData(initialState);
	};

	return (
		<div className='create__user'>
			<h2>Create User</h2>
			<form className='create__user-form' action='' onSubmit={handleSubmit}>
				<input
					type='text'
					value={formData.name}
					name='name'
					onChange={handleChange}
					placeholder='name'
					required
				/>
				<input
					type='text'
					value={formData.profession}
					onChange={handleChange}
					name='profession'
					placeholder='profession'
					required
				/>
				<input
					type='number'
					value={formData.age}
					name='age'
					onChange={handleChange}
					placeholder='age'
					required
				/>
				<select name='gender' value={formData.gender} onChange={handleChange} required>
					<option value=''>gender</option>
					<option value={'male'}>male</option>
					<option value={'female'}>female</option>
				</select>
				<button type='submit'>Create</button>
			</form>
		</div>
	);
}

export default CreateUser;
