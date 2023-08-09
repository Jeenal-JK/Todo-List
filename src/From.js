import { useState, useEffect } from "react";

function From() {
	const [items, setItems] = useState([]);
	const [newItemTitle, setNewItemTitle] = useState('');
	// const [searchQuery, setSearchQuery] = useState('');


	useEffect(() => {
		const items = JSON.parse(localStorage.getItem('items'));
		if (items) {
			setItems(items);
		}


	}, []);


	const handleSubmit = (e) => {
		e.preventDefault();
		const newItem = { title: newItemTitle };
		const updatedItems = [...items, newItem];
		setItems(updatedItems);
		localStorage.setItem('items', JSON.stringify(updatedItems));
		setNewItemTitle('');


	}
	const removeItem = (ID) => {
		const result = window.confirm("Are you sure you want to delete this item?");
		if (result) {
			const updatedItems = items.filter((title, index) => index !== ID);
			setItems(updatedItems);
			localStorage.setItem('items', JSON.stringify(updatedItems));
		} 

	};


	const handleInputChange = (event) => {
		const newValue = event.target.value;
		const regex = /^[a-zA-Z0-9 ]*$/;

		if (regex.test(newValue)) {
			setNewItemTitle(newValue);
		}
		else {
			window.alert("Special Character Are Not Allow ")
		}
	}
	
	const filterData = items.filter((record)=> record.title.toLowerCase().includes(newItemTitle.toLowerCase()));
	



	return (<>
		<div className="main">
			<div className="container">
				<section className="header">
					<div className="heading">
						<p>My To Do List</p>
					</div>
					<div className="form-input">
						<form onSubmit={handleSubmit}>


							<input type="text"
								placeholder="Title.."
								className="text-input"
								value={newItemTitle}
								onChange={handleInputChange}
							// 	value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}

								required
							/>
							<button className="btn-submit">Add</button>
						</form>
					</div>

				</section>
				<section className="contain">
				
					<div className="table-data">
						{filterData.map((item, index) => (

							<div key={index} className="row">
								<div className="col-1">
									{item.title}
								</div>
								<div className="col-2">
									<i onClick={() => removeItem(index)}>

										<svg xmlns="http://www.w3.org/2000/svg" width="50" height="34" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
											<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" style={{ margin: '20px' }} />
										</svg>
									</i>

								</div>
							</div>
						))}

					</div>
				</section>
			</div>
		</div>
	</>);
}

export default From;


