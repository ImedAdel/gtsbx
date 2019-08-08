import { prompt } from 'enquirer'

// prompt({
// 	type: 'input',
// 	name: 'username',
// 	message: 'What is your username?',
// }).then((answer) =>
// 	prompt({
// 		type: 'input',
// 		name: 'username',
// 		message: async () => await `Are you ${answer.username}`,
// 	}).then(res => console.log(res))
// )

const getName = async () =>
	prompt([
		{
			type: 'input',
			name: 'intent',
			message: 'What is ya name, buddy?',
		},
		{
			type: 'input',
			name: 'lastName',
			message: 'What is ya last Name, ahoi?',
		},
	])
;(async () => {
	const username: { intent?: string; lastName?: string } = await getName()
	return console.log(username.intent, username.lastName)
})()

export const sum = (a: number, b: number) => {
	if ('development' === process.env.NODE_ENV) {
		console.log('boop')
	}
	return a + b
}
