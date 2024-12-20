import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import { TasksStateType } from '../App'

let startState: TasksStateType={}

beforeAll(() => {
	 startState = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}
})


test('correct task should be deleted from correct array', () => {
	const endState = tasksReducer(startState, removeTaskAC({taskId: '2',todolistId: 'todolistId2'}))

	expect(endState).toEqual({
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '3', title: 'tea', isDone: false },
		],
	})
})

test('correct task should be added to correct array', () => {
	const endState = tasksReducer(startState, addTaskAC({ title: 'juce', todolistId: 'todolistId2' }))

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(4)
	expect(endState['todolistId2'][0].id).toBeDefined()
	expect(endState['todolistId2'][0].title).toBe('juce')
	expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
	const endState = tasksReducer(
		startState,
		changeTaskStatusAC({
			taskId: '2',
			isDone: false,
			todolistId: 'todolistId2',
		})
	)

	expect(endState['todolistId2'][1].isDone).toBeFalsy()
	expect(endState['todolistId1'][1].isDone).toBeTruthy()
})

test('title of specified task should be changed', () => {
	const endState = tasksReducer(
		startState,
		changeTaskTitleAC({
			taskId: '2',
			title: 'juice',
			todolistId: 'todolistId2',
		})
	)

	expect(endState['todolistId2'][1].title).toBe('juice')
	expect(endState['todolistId1'][1].title).toBe('JS')
})
