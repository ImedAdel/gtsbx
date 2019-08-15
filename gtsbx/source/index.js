#!/usr/bin/env node
'use strict'

const fs = require('fs-extra')
const inquirer = require('inquirer')

// const featuresChoices = [
// 	'Yarn Workspaces',
// 	'UI Libraries',
// 	'CSS Processors',
// 	'CSS-in-JS',
// 	'Linter / Formatter',
// 	'Unit Testing',
// 	'E2E Testing',
// ]

const featuresChoices = [
	'Yarn Workspaces',
	'Bulma',
	'TailwindCSS',
	'Tachyons',
	'Emotion',
	'Styled-Components',
	'SASS/SCSS',
	'PostCSS',
	'Prettier + ESLint',
	'Jest',
	'Cypress',
	'Storybook',
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

const main = async () => {
	const getInfo = await inquirer.prompt([
		{
			type: 'input',
			name: 'projectName',
			message: 'Write the name of your project:',
		},
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
			choices: featuresChoices,
		},
		{
			type: 'checkbox',
			name: 'selectedPlugins',
			message: 'Check the plugins needed for your project:',
			choices: pluginsChoices,
		},
	])

	try {
		await fs.mkdir(getInfo.projectName)
		console.log(`🎉 created directory ${getInfo.projectName}`)
	} catch (error) {
		throw error
	}

	/**
	 * @todo remove this in production
	 */
	// try {
	// 	await fs.remove(getInfo.projectName)
	// 	console.log(`🗑 removed directory ${getInfo.projectName}`)
	// } catch (error) {
	// 	throw error
	// }

	// fs.mkdir(getInfo.projectName, { recursive: true }, error => {
	// 	if (error) throw error

	// 	// fs.writeFile
	// })

	console.table(getInfo)
	console.log(getInfo.selectedFeatures[1])

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
