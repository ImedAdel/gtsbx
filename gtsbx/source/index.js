#!/usr/bin/env node
'use strict'

const fs = require('fs-extra')
const prompts = require('prompts')

const featuresChoices = [
	'Yarn Workspaces',
	'UI Libraries',
	'CSS Processors',
	'CSS-in-JS',
	'Linter / Formatter',
	'Unit Testing',
	'E2E Testing',
]

// const featuresChoices = [
// 	'Yarn Workspaces',
// 	'Bulma',
// 	'TailwindCSS',
// 	'Tachyons',
// 	'Emotion',
// 	'Styled-Components',
// 	'SASS/SCSS',
// 	'PostCSS',
// 	'Prettier + ESLint',
// 	'Jest',
// 	'Cypress',
// 	'Storybook',
// ]

const featuresDetails = {
	'UI Libraries': async () =>
		await prompts({
			type: 'list',
			name: 'uiLibrary',
			message: 'Choose the UI library of your project:',
			choices: ['TailwindCSS'],
		}),
	'CSS Processors': async () =>
		await prompts({
			type: 'list',
			name: 'cssProcessor',
			message: 'Choose the CSS Processor of your project:',
			choices: ['PostCSS', 'SASS/SCSS'],
		}),
	'CSS-in-JS': async () =>
		await prompts({
			type: 'list',
			name: 'cssInJs',
			message: 'Choose the CSS-in-JS library of your project:',
			choices: ['Styled Components', 'Emotion'],
		}),
}

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
			type: prev => prev.includes(0) ? 'confirm' : null,
			name: 'confirmYarnWorkspaces',
			message: 'Are you sure that you want to enable Yarn Workspaces?'
		},
		{
			type: 'multiselect',
			name: 'selectedPlugins',
			message: 'Check the plugins needed for your project:',
			choices: pluginsChoices,
		},
		{
			type: (prev, values) => values.selectedFeatures.includes(5) ? 'confirm' : null,
			name: 'confirmUnitTesting',
			message: 'Are you sure that you want to enable Unit Testing?'
		},
	])

	const response = await prompts({
    type: 'number',
    name: 'value',
    message: 'How old are you?',
    validate: value => value < 18 ? `Nightclub is 18+ only` : true
  })

	// getInfo.selectedFeatures.forEach(async feature => {
	// 	detailedInfo[feature] = await feature()
	// })
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

	// getInfo.selectedFeatures.forEach(async feat => {
	// })

	// for (const feat in getInfo.selectedFeatures) {
	// 	detailedInfo = {...detailedInfo, ...await featuresDetails[feat]()}
	// }

	// await Object.entries(featuresDetails).map(
	// 	async ([featName, featFunc]) => {
	// 		scndDetailedInfo = {...scndDetailedInfo, ...await featFunc()}
	// 	}
	// )

	// const detailedInfo = await featuresDetails['CSS-in-JS']()

	const mdleExprt = `
		module.exports = {
			plugins: ['gatsby-source-filesystem'],
		}
	`
	try {
		await fs.mkdir(getInfo.projectName)
		console.log(`🎉 created directory ${getInfo.projectName}`)
		await fs.outputFile(`${getInfo.projectName}/gatsby-config.js`, mdleExprt)
		console.log(`🎉 created file gatsby-config.js`)
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
	console.log(getInfo)
	console.table(getInfo.selectedFeatures)
	console.table(response)
	// console.table(scndDetailedInfo)
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
