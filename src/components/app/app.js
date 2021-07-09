import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  deleteItem = (id) => {
    this.setState((state) => {
      const inx = state.items.findIndex((el) => el.id === id)
      const before = state.items.slice(0, inx)
      const after = state.items.slice(inx + 1)
      const newArray = [...before, ...after]
      return {
        items: newArray
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createNewItem(text)
    this.setState(({items}) => {
      const newArray = [
        ...items,
        newItem
      ]
      return {
        items: newArray
      }
    })
  }

  toggleProp(data, id, prop) {
    const idx = data.findIndex((el) => el.id === id)

    const oldItem = data[idx]
    const newItem = {...oldItem, [prop]: !oldItem[prop]}

    return [
      ...data.slice(0, idx),
      newItem,
      ...data.slice(idx + 1)
    ]
  }

  onToggleDone = (id) => {
    this.setState(({items}) => {
      return {
        items: this.toggleProp(items, id, 'done')
      }
    })
  }

  onToggleImportant = (id) => {
    this.setState(({items}) => {
      return {
        items: this.toggleProp(items, id, 'important')
      }
    })
  }

  createNewItem(label) {
    return {
      label,
      done: false,
      important: false,
      id: this.maxId++
    }
  }

  onSearchChange = (term) => {
    this.setState({
      search: term
    })
  }

  state = {
    items: [
      this.createNewItem('Drink Coffee'),
      this.createNewItem('Make Awesome App'),
      this.createNewItem('Have a lunch')
    ],
    search: ''
  }

  searchItems = (items, search) => {
    if (search.length === 0) {
      return items
    }
    return items.filter((el) => {
      return el.label.toLowerCase().indexOf(search.toLowerCase()) > -1
    })
  }

  render() {

    const { items, search } = this.state;

    const itemsDone = items.filter((el) => el.done).length;
    const itemsToDo = items.length - itemsDone;
    const itemsToShow = this.searchItems(items, search);

    return (
      <div className="todo-app">
        <AppHeader toDo={itemsToDo} done={itemsDone} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={itemsToShow}
          onDeleted={ this.deleteItem }
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
        />
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};
