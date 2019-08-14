#!/usr/bin/env node
'use strict'

const inquirer = require('inquirer')

const main = async () => {
	const getInfo = await inquirer.prompt([
		{
			type: 'list',
			name: 'projectType',
			message: 'Choose the type of your project:',
			choices: ['Starter', 'Plugin', 'Theme'],
		},
		{
			type: 'checkbox',
			name: 'selectedFeatures',
			message: 'Check the features needed for your project:',
			choices: [
				'Yarn Workspaces',
				'UI Libraries',
				'CSS Pre-processors',
				'CSS-in-JS',
				'Linter / Formatter',
				'Unit Testing',
				'E2E Testing',
			],
		},
	])
	console.table(getInfo)

	// const makeSureOfNames = await inquirer.prompt([
	// 	{
	// 		type: 'confirm',
	// 		name: 'isRealName',
	// 		message: `Is ${getNames.first_name} ${getNames.last_name} your real name?`,
	// 	},
	// ])
	// console.table(makeSureOfNames)

	// const hasRealName = {
	// 	true: async () => await inquirer.prompt([
	// 		{
	// 			type: 'input',
	// 			name: 'mes',
	// 			message: 'Say "Yup"',
	// 		},
	// 	]),
	// 	false: async () => await inquirer.prompt([
	// 		{
	// 			type: 'input',
	// 			name: 'mes',
	// 			message: 'Say "nope"',
	// 		},
	// 	]),
	// }

	// const finalAns = await hasRealName[makeSureOfNames.isRealName]()
	// console.table(finalAns)
}

main()
