/*
<Input
	label="Usuario"
	name='user'
	value={this.state.values.user}
	preInput='@'
	placeholder="usuario"
	required
	onChange={this.handleChange}
/>
<Input
	label="Correo electrónico"
	name='email'
	value={this.state.values.email}
	type="mail"
	placeholder="ejemplo@mail.com"
	validation = {[
		v => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(v)
		? true : 'Ingresa un correo válido'
	]}
	required
	onChange={this.handleChange}
/>

*/