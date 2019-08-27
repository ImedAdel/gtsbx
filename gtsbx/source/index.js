#!/usr/bin/env node
'use strict'

const fs = require('fs-extra')
const prompts = require('prompts')

const featuresChoices = [
	{ title: 'Yarn Workspaces', value: 'YarnWorkspaces' },
	{ title: 'CSS Processors', value: 'CSSProcessors' },
	{ title: 'CSS-in-JS', value: 'CSSinJS' },
	{ title: 'Linter / Formatter', value: 'LinterFormatter' },
	{ title: 'Unit Testing', value: 'UnitTesting' },
	{ title: 'E2E Testing', value: 'E2ETesting' },
]

const pluginsChoices = [
	'gatsby-source-filesystem',
	'gatsby-plugin-react-helmet',
	'gatsby-plugin-sharp',
	'gatsby-plugin-manifest',
	'gatsby-plugin-offline',
	'gatsby-transformer-remark',
	'gatsby-plugin-google-analytics',
	'gatsby-plugin-sitemap',
]

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const main = async () => {
	const getInfo = await prompts([
		{
			type: 'text',
			name: 'projectName',
			message: 'Write the name of your project:',
		},
		{
			type: 'select',
			name: 'projectType',
			message: 'Choose the type of your project:',
			choices: ['Starter', 'Plugin', 'Theme'],
		},
		{
			type: 'multiselect',
			name: 'selectedFeatures',
			message: 'Check the features needed for your project:',
			choices: featuresChoices,
		},
		{
			type: 'multiselect',
			name: 'selectedPlugins',
			message: 'Check the plugins needed for your project:',
			choices: pluginsChoices,
		},
		{
			type: (prev, values) =>
				values.selectedFeatures.includes('CSSProcessors') ? 'select' : null,
			name: 'CSSProcessor',
			message: 'Choose your preferred CSS Processor',
			choices: [
				{
					title: 'PostCSS',
					value: 'PostCSS',
				},
				{
					title: 'SCSS and PostCSS',
					value: 'SCSSandPostCSS',
				},
			],
		},
		{
			type: (prev, values) =>
				values.selectedFeatures.includes('CSSinJS') ? 'select' : null,
			name: 'CSSinJS',
			message: 'Pick a CSS-in-JS library',
			choices: [
				{
					title: 'Styled Components',
					value: 'StyledComponents',
				},
				{
					title: 'Emotion',
					value: 'Emotion',
				},
			],
		},
		{
			type: (prev, values) =>
				values.selectedFeatures.includes('LinterFormatter') ? 'select' : null,
			name: 'LinterFormatter',
			message: 'Pick a Linter and a Formatter',
			choices: [
				{
					title: 'Prettier with ESLint Airbnb',
					value: 'PrettierESLintAirbnb',
				},
				{
					title: 'Prettier with ESLint Unicorn',
					value: 'PrettierESLintUnicorn',
				},
			],
		},
		{
			type: (prev, values) =>
				values.selectedFeatures.includes('UnitTesting') ? 'select' : null,
			name: 'UnitTesting',
			message: 'Are you sure that you want to enable Unit Testing?',
			choices: [
				{
					title: 'Jest',
					value: 'Jest',
				},
				{
					title: 'Ava',
					value: 'Ava',
				},
			],
		},
		{
			type: (prev, values) =>
				values.selectedFeatures.includes('E2ETesting') ? 'select' : null,
			name: 'E2ETesting',
			message: 'Are you sure that you want to enable Unit Testing?',
			choices: [
				{
					title: 'Cypress',
					value: 'Cypress',
				},
			],
		},
	])

	const response = await prompts({
		type: 'number',
		name: 'value',
		message: 'How old are you?',
		validate: value => (value < 18 ? `Nightclub is 18+ only` : true),
	})

	/*
	let detailedInfo = {}

	for (let index = 0; index < getInfo.selectedFeatures.length; ++index) {
		console.log(getInfo.selectedFeatures[index])
		if (featuresDetails.hasOwnProperty(getInfo.selectedFeatures[index]))
			detailedInfo = {
				...detailedInfo,
				...(await featuresDetails[getInfo.selectedFeatures[index]]()),
			}
	}
	*/

	const mdleExprts = `
		module.exports = {
			plugins: ['gatsby-source-filesystem'],
		}
	`
	try {
		await fs.mkdir(getInfo.projectName)
		console.log(`🎉 created directory ${getInfo.projectName}`)
		await fs.outputFile(`${getInfo.projectName}/gatsby-config.js`, mdleExprts)
		console.log(`🎉 created file gatsby-config.js`)
	} catch (error) {
		throw error
	}

	/**
	 * @todo remove this in production
	 */

	// fs.mkdir(getInfo.projectName, { recursive: true }, error => {
	// 	if (error) throw error

	// 	// fs.writeFile
	// })

	console.table(getInfo)
	console.log(getInfo)
	console.table(getInfo.selectedFeatures)
	console.table(response)
	// console.table(scndDetailedInfo)
	console.log(getInfo.selectedFeatures[1])

	await sleep(10000)
	try {
		await fs.remove(getInfo.projectName)
		console.log(`🗑 removed directory ${getInfo.projectName}`)
	} catch (error) {
		throw error
	}

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
