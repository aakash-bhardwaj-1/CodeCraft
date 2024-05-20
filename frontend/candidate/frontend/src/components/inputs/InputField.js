function InputField(props) {
	return (
		<div>
			{props.type === "email" && (
				<div className="login-input">
					<label htmlFor={props.id}>
						<i className="fa fa-solid fa-envelope icon"></i>
					</label>
					<input
						type="email"
						id={props.id}
						placeholder={props.placeholder}
						required
						spellCheck={false}
						autoComplete="off"
						onChange={props.onChange}
						value={props.value}
					/>
				</div>
			)}

			{props.type === "password" && (
				<div className="login-input">
					<label htmlFor={props.id}>
						<i className="fa fa-solid fa-lock icon"></i>
					</label>
					<input
						type="password"
						id={props.id}
						placeholder={props.placeholder}
						required
						spellCheck={false}
						autoComplete="off"
						onChange={props.onChange}
						value={props.value}
					/>
				</div>
			)}

			{props.type === "number" && (
				<div className="login-input">
					<label htmlFor={props.id}>
						<i className="fa fa-solid fa-key icon"></i>
					</label>
					<input
						type="number"
						id={props.id}
						placeholder={props.placeholder}
						required
						spellCheck={false}
						autoComplete="off"
						onChange={props.onChange}
						value={props.value}
					/>
				</div>
			)}

			{props.type === "text" && (
				<div className="login-input">
					<label htmlFor={props.id}>
						<i className="fa fa-solid fa-key icon"></i>
					</label>
					<input
						type="text"
						id={props.id}
						placeholder={props.placeholder}
						required
						spellCheck={false}
						autoComplete="off"
						onChange={props.onChange}
						value={props.value}
					/>
				</div>
			)}
		</div>
	);
}

export default InputField;
