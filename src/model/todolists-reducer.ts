import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
	{id: todolistID1, title: 'What to learn', filter: 'all'},
	{id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(tl => tl.id !== action.payload.id)
		}

		case 'ADD-TODOLIST': {
			const newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
			return [...state, newTodolist]
		}

		case 'CHANGE-TODOLIST-TITLE': {
			return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
		}

		case 'CHANGE-TODOLIST-FILTER': {
			return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
		}

		default:
			throw new Error("I don't understand this type")
	}
}

// Action creators
export const removeTodolistAC = (todolistId: string) => {
	return {type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
}

export const addTodolistAC = (title: string)=> {
	return {type: 'ADD-TODOLIST', payload: {title, id: v1()}} as const
};

export const changeTodolistTitleAC = (payload: {id: string, title: string})=> {
	return {type: 'CHANGE-TODOLIST-TITLE', payload} as const
};

export const changeTodolistFilter = (payload:{id: string, filter: FilterValuesType})=> {
	return {type: 'CHANGE-TODOLIST-FILTER', payload} as const
}

// Actions types
export type RemoveTodolistActionType= ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilter>

/*export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST';
	payload: {
		id: string;
	}*/

/*
export type AddTodolistActionType = {
	type: 'ADD-TODOLIST';
	payload: {
		title: string;
	}
};
*/
/*
export type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE';
	payload: {
		id: string;
		title: string;
	}
};*/
/*
export type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER';
	payload: {
		id: string;
		filter: FilterValuesType;
	}
};*/

type ActionsType = RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType
