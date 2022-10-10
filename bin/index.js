#!/usr/bin/env node
/**
 * @description create-vute命令行核心逻辑
 */
import fs from 'node:fs'
import { program } from 'commander'
import gradient from 'gradient-string'
import prompts from 'prompts'
import minimist from 'minimist'
import chalk from 'chalk'
import { execSync } from 'child_process'
import ora from 'ora'
import path from 'node:path'
import pkg from '../utils/constant.cjs'
const { PACKAGE_VERSION } = pkg

const argv = minimist(process.argv.slice(2), { string: ['_'] })

const defaultProjectName = 'vute-project'

const FRAMEWORKS = [
    {
        name: 'vue',
        color: chalk.green,
        variants: [
            {
                name: 'vue-js',
                display: 'JavaScript',
                color: chalk.yellow,
                variants: [
                    {
                        name: 'vue-js-element',
                        display: 'Element-ui',
                        color: chalk.blue
                    },
                    {
                        name: 'vue-js-antd',
                        display: 'Ant-Design-Vue',
                        color: chalk.blue
                    },
                    {
                        name: 'vue-js-naive',
                        display: 'Naive-ui',
                        color: chalk.blue
                    },
                    {
                        name: 'vue-js',
                        display: 'default',
                        color: chalk.gray
                    }
                ]
            },
            {
                name: 'vue-ts',
                display: 'TypeScript',
                color: chalk.blue,
                variants: [
                    {
                        name: 'element-ui',
                        display: 'Element-ui',
                        color: chalk.blue
                    },
                    {
                        name: 'ant-design-vue',
                        display: 'Ant-Design-Vue',
                        color: chalk.blue
                    },
                    {
                        name: 'naive-ui',
                        display: 'Naive-ui',
                        color: chalk.blue
                    },
                    {
                        name: 'vue-ts',
                        display: 'default',
                        color: chalk.gray
                    }
                ]
            }
        ]
    },
    {
        name: 'react',
        color: chalk.cyan,
        variants: [
            {
                name: 'react-js',
                display: 'JavaScript',
                color: chalk.yellow,
                variants: [
                    {
                        name: 'react-js-antd',
                        display: 'Ant-Design',
                        color: chalk.blue
                    },
                    {
                        name: 'react-js-material',
                        display: 'Material-ui',
                        color: chalk.blue
                    },
                    {
                        name: 'react-js',
                        display: 'default',
                        color: chalk.gray
                    }
                ]
            },
            {
                name: 'react-ts',
                display: 'TypeScript',
                color: chalk.blue,
                variants: [
                    {
                        name: 'react-ts-antd',
                        display: 'Ant-Design',
                        color: chalk.blue
                    },
                    {
                        name: 'react-ts-material',
                        display: 'Material-ui',
                        color: chalk.blue
                    },
                    {
                        name: 'react-ts',
                        display: 'default',
                        color: chalk.gray
                    }
                ]
            }
        ]
    }
]

const PACKAGES = [
    {
        name: 'npm',
        display: 'npm',
        color: chalk.red,
        should: true
    },
    {
        name: 'yarn',
        display: 'yarn',
        color: chalk.blueBright,
        should: shouldUseYarn()
    },
    {
        name: 'pnpm',
        display: 'pnpm',
        color: chalk.yellowBright,
        should: shouldUsePnpm()
    }
]

const gradientColors = [
    `#31a4ff`,
    `#48afff`,
    `#62baff`,
    `#7ac4ff`,
    `#a6dfff`,
    `#c6ebff`,
    `#afa0ff`,
    `#9b88ff`,
    `#a564ff`,
    `#974cff`,
    `#832aff`
]

const referenceGradient = [...gradientColors, ...[...gradientColors].reverse(), ...gradientColors]

async function init() {
    program
        .version(`当前版本：v${PACKAGE_VERSION}`)
        .description('初始化项目   📑  📑')
        .action(async () => {
            const text = `
				  ___   ____   ____    __   ____  ____        _  _  _  _  ____  ____ 
				 / __) (  _ \\ (  __)  / _\\ (_  _)(  __) ___  / )( \\/ )( \\(_  _)(  __)
				( (__   )   /  ) _)  /    \\  )(   ) _) (___) \\ \\/ /) \\/ (  )(   ) _) 
				 \\___) (__\\_) (____) \\_/\\_/ (__) (____)       \\__/ \\____/ (__) (____)
			`
            console.log(gradient.pastel(`\n${text}\n`))
            console.log(gradient.rainbow('\n🤖 欢迎使用create-vute! 🤖\n'))

            const argTargetDir = formatTargetDir(argv._[0])
            let targetDir = argTargetDir || defaultProjectName
            let result = null
            try {
                result = await prompts(
                    [
                        {
                            name: 'projectName',
                            type: argTargetDir ? null : 'text',
                            message: gradient.pastel('项目名：'),
                            initial: defaultProjectName,
                            onState: (state) =>
                                (targetDir = formatTargetDir(state.value) || defaultProjectName)
                        },
                        {
                            name: 'overwrite',
                            type: () =>
                                !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'text',
                            message:
                                '🚨 ' +
                                (targetDir === '.' ? '当前目录' : `目标目录 "${targetDir}"`) +
                                '不是空的目录, 请删除该目录后再次执行 🚨',
                            onState: () => process.exit(1)
                        },
                        {
                            type: (_, { overwrite }) => {
                                if (overwrite === false) {
                                    throw new Error('❌' + ' 操作取消')
                                }
                                return null
                            },
                            name: 'overwriteChecker'
                        },
                        {
                            type: 'select',
                            name: 'framework',
                            initial: 0,
                            message: gradient.pastel('请选择要使用的框架：'),
                            choices: FRAMEWORKS.map((framework) => {
                                const frameworkColor = framework.color
                                return {
                                    title: frameworkColor(framework.display || framework.name),
                                    value: framework
                                }
                            })
                        },
                        {
                            type: (framework) =>
                                framework && framework.variants ? 'select' : null,
                            name: 'variant',
                            message: gradient.pastel('请选择要使用的开发语言：'),
                            choices: (framework) =>
                                framework.variants.map((variant) => {
                                    const variantColor = variant.color
                                    return {
                                        title: variantColor(variant.display || variant.name),
                                        value: variant
                                    }
                                })
                        },
                        {
                            type: (variant) => (variant && variant.variants ? 'select' : null),
                            name: 'ui',
                            message: gradient.pastel('请选择要使用的UI库：'),
                            choices: (variant) =>
                                variant.variants.map((variant) => {
                                    const variantColor = variant.color
                                    return {
                                        title: variantColor(variant.display || variant.name),
                                        value: variant.name
                                    }
                                })
                        },
                        {
                            type: 'select',
                            name: 'package',
                            message: gradient.pastel('请选择要使用的包管理工具：'),
                            initial: 0,
                            choices: PACKAGES.map((pkg) => {
                                const packageColor = pkg.color
                                return {
                                    title: pkg.should
                                        ? packageColor(pkg.display || pkg.name)
                                        : chalk.red(`🚨 ${pkg.display}（${pkg.display}未安装）`),
                                    value: pkg.name
                                }
                            })
                        }
                    ],
                    {
                        onCancel: () => {
                            throw new Error('❌' + ' 操作取消')
                        }
                    }
                )
                const frames = getIntroAnimFrames()
                const intro = await ora({
                    spinner: {
                        interval: 30,
                        frames
                    },
                    text: `▶ 复制模板`
                })
                intro.start()
                await sleep((frames.length - 1) * intro.interval)
                intro.stop()
                const spinner = ora({
                    spinner: {
                        interval: 80,
                        frames: getIntroAnimFrames()
                    },
                    text: `▶ 复制模板`
                })
                spinner.start()

                const dest = path.resolve(process.cwd(), result.projectName)
                if (!fs.existsSync(dest)) {
                    const { projectName, framework, variant, ui, package: _pkg } = result
                    fs.mkdirSync(projectName)
                    
                    const templateDir = `templates/${framework.name}/${ui}`
                    
                    await copyTemplate(templateDir, dest)
                    spinner.stop()
                    console.log(gradient.fruit('\n ✨✨✨✨✨✨✨✨✨✨✨✨ 项目创建成功! ✨✨✨✨✨✨✨✨✨✨✨✨ \n'))
                } else {
                    console.log(
                        gradient.atlas('🚨 ' + dest + '不是空的目录, 请删除该目录后再次执行 🚨')
                    )
                    process.exit(1)
                }
            } catch (call) {
                console.log('❌' + call.message)
                process.exit(1)
            }
        })
        .parse(process.argv)
}

function formatTargetDir(targetDir) {
    return targetDir?.trim().replace(/\/+$/g, '')
}

function isEmpty(path) {
    const files = fs.readdirSync(path)
    return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

function shouldUseYarn() {
    try {
        const userAgent = process.env.npm_config_user_agent
        if (userAgent && userAgent.startsWith('yarn')) {
            return true
        }
        execSync('yarnpkg --version', { stdio: 'ignore' })
        return true
    } catch (e) {
        return false
    }
}

function shouldUsePnpm() {
    try {
        const userAgent = process.env.npm_config_user_agent
        if (userAgent && userAgent.startsWith('pnpm')) {
            return true
        }
        execSync('pnpm --version', { stdio: 'ignore' })
        return true
    } catch (e) {
        return false
    }
}

async function sleep(time) {
    new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

function getIntroAnimFrames() {
    const frames = []
    for (let end = 1; end <= gradientColors.length; end++) {
        const leadingSpacesArr = Array.from(
            new Array(Math.abs(gradientColors.length - end - 1)),
            () => ' '
        )
        const gradientArr = gradientColors.slice(0, end).map((g) => chalk.bgHex(g)(' '))
        frames.push([...leadingSpacesArr, ...gradientArr].join(''))
    }
    return frames
}

function copyTemplate(source, target) {
    const _ignoreFiles = ['.vscode', 'node_modules']
    const path = fs.readdirSync(source).filter(file => !_ignoreFiles.includes(file))
    path.forEach((fileName) => {
        const filePath = `${source}/${fileName}`
        const targetFilePath = `${target}/${fileName}`
        const stat = fs.statSync(filePath)
        if (stat.isFile()) {
            fs.copyFileSync(filePath, targetFilePath)
        } else {
            mkDir(targetFilePath)
            copyTemplate(filePath, targetFilePath)
        }
    })
}

function mkDir(projectDir) {
    if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir)
    }
}

init().catch((err) => console.error(err))
