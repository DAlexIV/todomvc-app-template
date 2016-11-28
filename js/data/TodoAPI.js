/**
 * Created by User on 28/11/16.
 */
const TodoList = require('./../data/TodoList');
module.exports = class TodoAPI {

	constructor(provider) {
		this.provider = provider;

		this.storageKey = "data";
		if (this.provider.getItem(this.storageKey) == null)
			this.provider.setItem(this.storageKey, JSON.stringify(new TodoList(null)));
	}

	addTodo(todo) {
		this.updateDB(list => {list.add(todo)})
	}

	getAllTodos() {
		return this.readFromDB(list => list);
	}

	readFromDB(func) {
		let list = this.getData(this.storageKey);
		return func(list);
	}

	updateDB(func) {
		let list = this.getData(this.storageKey);
		func(list);
		this.saveData(this.storageKey, list);
	}

	saveData(key, list) {
		this.provider.setItem(key, JSON.stringify(list));
	}

	getData(key) {
		return JSON.parse(this.provider.getItem(key));
	}
};