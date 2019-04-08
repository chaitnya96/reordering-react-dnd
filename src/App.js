import React, { Component } from 'react';
import logo from './logo.svg';
import update from 'immutability-helper';
import Card from './card'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


class App extends Component {
  state={
    list:[
      { id: 1, text: "Item 1" },
			{ id: 2, text: "Item 2" },
			{ id: 3, text: "Item 3" }
    ]
  }
  moveCard(dragIndex, hoverIndex) {
		const { list } = this.state;		
		const dragCard = list[dragIndex];
		this.setState(update(this.state, {
			list: {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragCard]
				]
			}
    }));
	}
  render() {
    const { list } = this.state;
		const { canDrop, isOver, connectDropTarget } = this.props;
		const isActive = canDrop && isOver;
		const style = {
			width: "200px",
			height: "404px",
			border: '1px dashed gray'
		};

		const backgroundColor = isActive ? 'lightgreen' : '#FFF';

		return<div style={{...style, backgroundColor}}>
				{list.map((card, i) => {
					return (
						<Card 
							key={card.id}
							index={i}
							card={card}														
							moveCard={this.moveCard.bind(this)} />
					);
				})}
			</div>
  }
}

export default DragDropContext(HTML5Backend)(App);
