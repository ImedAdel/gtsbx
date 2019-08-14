#!/usr/bin/env node
'use strict'

const inquirer = require('inquirer')

const main = async () => {
	const getNames = await inquirer.prompt([
		{
			type: 'input',
			name: 'first_name',
			message: "What's your first name",
		},
		{
			type: 'input',
			name: 'last_name',
			message: "What's your last name",
		},
	])
	console.table(getNames)

	const makeSureOfNames = await inquirer.prompt([
		{
			type: 'confirm',
			name: 'isRealName',
			message: `Is ${getNames.first_name} ${getNames.last_name} your real name?`,
		},
	])
	console.table(makeSureOfNames)

	const hasRealName = {
		true: async () => await inquirer.prompt([
			{
				type: 'input',
				name: 'mes',
				message: 'Say "Yup"',
			},
		]),
		false: async () => await inquirer.prompt([
			{
				type: 'input',
				name: 'mes',
				message: 'Say "nope"',
			},
		]),
	}

	const finalAns = await hasRealName[makeSureOfNames.isRealName]()
	console.table(finalAns)

}

main()
