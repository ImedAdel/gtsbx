#!/usr/bin/env node
'use strict'

const fs = require('fs-extra')
const prompts = require('prompts')

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
			choices: [
				{ title: 'Yarn Workspaces', value: 'YarnWorkspaces' },
				{ title: 'CSS Libraries and Frameworks', value: 'CSSLibs' },
				{ title: 'CSS-in-JS', value: 'CSSinJS' },
				{ title: 'Linter / Formatter', value: 'LinterFormatter' },
				{ title: 'Testing', value: 'Testing' },
			],
		},
		{
			type: 'multiselect',
			name: 'selectedPlugins',
			message: 'Check the plugins needed for your project:',
			choices: [
				'gatsby-source-filesystem',
				'gatsby-plugin-react-helmet',
				'gatsby-plugin-sharp',
				'gatsby-plugin-manifest',
				'gatsby-plugin-offline',
				'gatsby-transformer-remark',
				'gatsby-plugin-google-analytics',
				'gatsby-plugin-sitemap',
			],
		},
		{
			type: (prev, values) =>
				values.selectedFeatures.includes('CSSLibs') ? 'select' : null,
			name: 'CSSLib',
			message: 'Pick a CSS library or framework',
			choices: [
				{
					title: 'PostCSS',
					value: 'PostCSS',
				},
				{
					title: 'Sass',
					value: 'Sass',
				},
				{
					title: 'Typography.js',
					value: 'Typographyjs',
				},
				{
					title: 'TailwindCSS',
					value: 'TailwindCSS',
				},
				{
					title: 'Bulma',
					value: 'Bulma',
				},
				{
					title: 'Theme UI',
					value: 'ThemeUI',
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
				values.selectedFeatures.includes('LinterFormatter') ? 'multiselect' : null,
			name: 'ESLintPresets',
			message: 'Choose your preferred ESLint presets and plugins',
			choices: [
				{
					title: 'React App',
					value: 'ReactApp',
				},
				{
					title: 'Airbnb',
					value: 'Airbnb',
				},
				{
					title: 'Standard',
					value: 'Standard',
				},
				{
					title: 'React',
					value: 'React',
				},
				{
					title: 'JSX A11y',
					value: 'JSXA11y',
				},
				{
					title: 'Unicorn',
					value: 'Unicorn',
				},
				{
					title: 'React Hooks',
					value: 'ReactHooks',
				},
				{
					title: 'JSDoc',
					value: 'JSDoc',
				},
			],
		},
		{
			type: (prev, values) =>
				values.selectedFeatures.includes('Testing') ? 'multiselect' : null,
			name: 'Testing',
			message: 'Choose your testing preferences',
			choices: [
				{
					title: 'Jest',
					value: 'Jest',
				},
				{
					title: 'E2E Testing',
					value: 'E2ETesting',
				},
				{
					title: 'CSS-in-JS Testing',
					value: 'CSSinJSTesting',
				},
				{
					title: 'React Testing Library',
					value: 'ReactTestingLibrary',
				},
				{
					title: 'Storybook',
					value: 'Storybook',
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
