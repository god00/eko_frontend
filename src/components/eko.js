import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { WithContext as ReactTags } from 'react-tag-input';
import styled from 'styled-components';

import Api from '../services/api';

const PossibleDiv = styled.div`
	display: flex;
	justify-content: center;
    margin: 10px;
	padding: 12px;
    border: dotted 1px;
`
const CostLine = styled.div`
    position: relative;
    text-align: center;
	width: 30px;
	margin: -10px 5px;
	hr{
		margin: 0;
	}
`

const LayoutInput = styled.div`
	display: flex;
    margin: 0 10% 10px 10%;
`

const RadioForm = styled(Form)`
	display: flex;
	justify-content: space-evenly;
	margin: 20px 15%;
`

const CostText = styled.span`
	color: lightcoral;
`

const ResultText = styled.span`
	font-weight: bold;
`

const OptionForm = styled(Form)`
	display: flex;
    justify-content: center;
	align-items: center;
	margin: 20px;
`
const PossibleOptionForm = styled(OptionForm)`
	flex-direction: column;
`

const OptionLayout = styled.div`
	display: flex;
	justify-content: center;
    align-items: center;
    flex-direction: column;
`

const ButtonWithMarginLeft = styled(Button)`
	margin-left: 10px;
`

class Eko extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tags: [],
			routeId: null,
			mode: '',
			cost: null,
			possibleObject: null
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
	}

	handleDelete(i) {
		const { tags } = this.state;
		this.setState({ tags: tags.filter((tag, index) => index !== i), routeId: null, mode: null });
	}

	handleAddition(tag) {
		const regex = /^[a-zA-Z][a-zA-Z][0-9]+$/i;
		tag.text = tag.text.toUpperCase();
		if (tag.text[0] !== tag.text[1] && regex.test(tag.text)) {
			this.setState(state => ({ tags: [...state.tags, tag], routeId: null, mode: null }));
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
		this.setState({ mode: e.currentTarget.value, cost: null, possibleObject: null });
	}

	calculateCost = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const form = e.currentTarget;
		if (form.checkValidity()) {
			const { routeId } = this.state;
			this.inputNode.value = this.inputNode.value.toUpperCase();
			const regex = /^[A-Z]+$/i;
			if (regex.test(this.inputNode.value)) {
				Api.calculateCost(routeId, this.inputNode.value)
					.then((cost) => {
						this.setState({ cost });
					})
			}
			else {
				this.inputNode.value = '';
			}
		}
	}

	calculatePossible = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const form = e.currentTarget;
		if (form.checkValidity()) {
			const source = this.inputSource.value;
			const destination = this.inputDestination.value;
			const condition = {
				allowRouteTwice: this.checkRouteTwice.checked,
			};
			if (this.inputMaximun.value !== '') {
				condition.maximunStop = parseInt(this.inputMaximun.value);
			}
			if (this.inputLessthan.value !== '') {
				condition.lessThan = parseInt(this.inputLessthan.value);
			}
			const { routeId } = this.state;
			Api.possibleRoute(routeId, source, destination, condition)
				.then((possibleObject) => {
					this.setState({ possibleObject });
				})
		}
	}

	validatePossibleInputNumber = (e) => {
		const value = e.currentTarget.value;
		const regex = /^[0-9]+$/i;
		if (!regex.test(value)) {
			e.currentTarget.value = "";
		}
	}

	validatePossibleInputLetter = (e) => {
		e.currentTarget.value = e.currentTarget.value.toUpperCase();
		const regex = /^[A-Z]$/i;
		if (!regex.test(e.currentTarget.value)) {
			e.currentTarget.value = "";
		}
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
				<RadioForm>
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
				</RadioForm>
			)
		}
	}

	renderOptions() {
		const { mode, cost } = this.state;
		if (mode === 'cost') {
			return (
				<OptionLayout>
					<OptionForm onSubmit={this.calculateCost}>
						<Form.Control type="text" placeholder="Fill your path" className="myInput" required ref={node => (this.inputNode = node)} onFocus={(e) => { e.currentTarget.select() }} />
						<Form.Control.Feedback type="invalid">
							Please fill a path.
          					</Form.Control.Feedback>
						<ButtonWithMarginLeft variant="success" size="sm" type="submit">Calculate</ButtonWithMarginLeft>
					</OptionForm>
					<span>{cost != null ? 'Total cost : ' : ''}
						<ResultText>{cost}</ResultText>
					</span>
				</OptionLayout>
			)
		}
		else if (mode === 'possible') {
			return (
				<OptionLayout>
					<PossibleOptionForm onSubmit={this.calculatePossible}>
						<div style={{ marginBottom: "10px", display: "flex" }}>
							<Form.Check style={{ marginRight: "25px" }} type="checkbox" label="Allow route twice" ref={node => (this.checkRouteTwice = node)} />
							<Form.Control style={{ marginRight: "10px" }} type="text" placeholder="Source.." className="myInput" required ref={node => (this.inputSource = node)} onFocus={(e) => { e.currentTarget.select() }} onBlur={this.validatePossibleInputLetter} />
							<Form.Control type="text" placeholder="Destination.." className="myInput" required ref={node => (this.inputDestination = node)} onFocus={(e) => { e.currentTarget.select() }} onBlur={this.validatePossibleInputLetter} />
							<ButtonWithMarginLeft variant="success" size="sm" type="submit">Calculate</ButtonWithMarginLeft>
						</div>
						<div style={{ marginBottom: "10px", width: "100%", display: "flex", justifyContent: "space-between" }}>
							<span>Maximun Stop : </span>
							<Form.Control type="text" placeholder="Fill number" className="myInput" ref={node => (this.inputMaximun = node)} onFocus={(e) => { e.currentTarget.select() }} onBlur={this.validatePossibleInputNumber} />
							<span>Cost less than : </span>
							<Form.Control type="text" placeholder="Fill number" className="myInput" ref={node => (this.inputLessthan = node)} onFocus={(e) => { e.currentTarget.select() }} onBlur={this.validatePossibleInputNumber} />
						</div>
						{this.renderPossibleAndPaths()}
					</PossibleOptionForm>
				</OptionLayout>
			)
		}
	}

	renderPossibleAndPaths() {
		const { possibleObject } = this.state;
		if (possibleObject) {
			const { possible, paths } = possibleObject;
			const { pathArr, costOrdered } = paths;
			return (
				<div>
					Number of possibles: <ResultText>{possible}</ResultText>
					{pathArr.map((path, i) => {
						const allTown = path.split('');

						return (
							<PossibleDiv key={path}>
								{costOrdered[i].map((cost, j) => {
									return (
										<React.Fragment>
											{j === 0 ? <span>{allTown[j]}</span> : null}
											<CostLine>
												<CostText>{cost}</CostText>
												<hr />
											</CostLine>
											<span>{allTown[j + 1]}</span>
										</React.Fragment>
									)
								})
								}
							</PossibleDiv>
						)

					})}
				</div>
			)
		}
	}

	render() {
		const { tags } = this.state;
		return (
			<div>
				<h2>Eko test 2</h2>
				<LayoutInput>
					<ReactTags
						className="tagsLayout"
						tags={tags}
						handleDelete={this.handleDelete}
						handleAddition={this.handleAddition}
						handleDrag={this.handleDrag}
						allowUnique={false}
						placeholder="Add new route"
					/>
					{this.renderCalculateButton()}
				</LayoutInput>
				{this.renderRadioButton()}
				{this.renderOptions()}
			</div>
		);
	}
}

export default Eko;