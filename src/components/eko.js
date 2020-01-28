import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { WithContext as ReactTags } from 'react-tag-input';

import Api from '../services/api';

class Eko extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tags: [],
			routeId: null,
			mode: '',
			cost: null
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
	}

	handleDelete(i) {
		const { tags } = this.state;
		this.setState({ tags: tags.filter((tag, index) => index !== i), });
	}

	handleAddition(tag) {
		const regex = /^[a-zA-Z][a-zA-Z][0-9]+$/i;
		tag.text = tag.text.toUpperCase();
		if (tag.text[0] !== tag.text[1] && regex.test(tag.text)) {
			this.setState(state => ({ tags: [...state.tags, tag] }));
		}
	}

	handleDrag(tag, currPos, newPos) {
		const tags = [...this.state.tags];
		const newTags = tags.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		// re-render
		this.setState({ tags: newTags });
	}

	onClick = () => {
		const { tags } = this.state
		const tagsArr = tags.map(tag => tag.text);
		Api.addNewRoutes(tagsArr)
			.then(({ id: routeId }) => {
				this.setState({ routeId })
			})
	}

	onRadioChange = (e) => {
		this.setState({ mode: e.currentTarget.value, cost: null });
	}

	calculateCost = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const form = e.currentTarget;
		if (form.checkValidity()) {
			const { routeId } = this.state;
			this.inputNode.value = this.inputNode.value.toUpperCase();
			const regex = /^[A-Z]+$/i
			if (regex.test(this.inputNode.value)) {
				Api.calculateCost(routeId, this.inputNode.value)
					.then((cost) => {
						this.setState({ cost });
					})
			}
		}
	}

	calculatePossible = (e) => {
		e.preventDefault();
		e.stopPropagation();
	}

	renderCalculateButton() {
		const { tags } = this.state;
		if (tags.length !== 0) {
			return (
				<div>
					<Button variant="danger" onClick={this.onClick}>Initailize Routes</Button>
				</div>
			)
		}
	}

	renderRadioButton() {
		const { routeId } = this.state;
		if (routeId != null) {
			return (
				<Form>
					<Form.Check
						type="radio"
						value="cost"
						label="Calculated Cost"
						name="calculatedType"
						onChange={this.onRadioChange}
					/>
					<Form.Check
						type="radio"
						value="possible"
						label="Calculated Possible"
						name="calculatedType"
						onChange={this.onRadioChange}
					/>
				</Form>
			)
		}
	}

	renderOptions() {
		const { mode, cost } = this.state;
		console.log(cost)
		if (mode === 'cost') {
			return (
				<Form onSubmit={this.calculateCost}>
					<Form.Control type="text" className="myInput" ref={node => (this.inputNode = node)} onFocus={(e) => { e.currentTarget.select() }} placeholder="Fill your path" required />
					<Form.Control.Feedback type="invalid">
						Please fill a path.
          			</Form.Control.Feedback>
					<Button variant="danger" size="sm" type="submit">Get Cost</Button>
					<span>{cost != null ? cost : ''}</span>
				</Form>
			)
		}
	}

	render() {
		const { tags } = this.state;
		return (
			<div>
				<h2>Eko test 2</h2>
				<ReactTags
					tags={tags}
					handleDelete={this.handleDelete}
					handleAddition={this.handleAddition}
					handleDrag={this.handleDrag}
					allowUnique={false}
					placeholder="Add new route"
				/>
				{this.renderCalculateButton()}
				{this.renderRadioButton()}
				{this.renderOptions()}
			</div>
		);
	}
}

export default Eko;