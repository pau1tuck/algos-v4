// docusaurus.config.ts
import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
	title: "AlgoBeast",
	tagline: "",
	favicon: "img/favicon.ico",

	// Set the production url of your site here
	url: "https://your-docusaurus-site.example.com",
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "facebook", // Usually your GitHub org/user name.
	projectName: "docusaurus", // Usually your repo name.

	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},

	presets: [
		[
			"classic",
			{
				docs: {
					sidebarPath: require.resolve("./sidebars.ts"),
					// Please change this to your repo.
					editUrl:
						"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
				},
				blog: {
					showReadingTime: true,
					// Please change this to your repo.
					editUrl:
						"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
					onUntruncatedBlogPosts: "ignore",
				},
				theme: {
					customCss: [
						require.resolve("./src/theme/styles/custom.css"),
						require.resolve("./src/theme/styles/fonts.css"),
					],
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		// Replace with your project's social card
		image: "img/docusaurus-social-card.jpg",
		navbar: {
			title: "algobeast",
			logo: {
				alt: "My Site Logo",
				src: "img/logo.svg",
			},
			items: [
				{
					type: "docSidebar",
					sidebarId: "javascriptSidebar",
					position: "left",
					label: "Course",
					docsPluginId: "javascript",
				},
				{
					type: "docSidebar",
					sidebarId: "tutorialSidebar",
					position: "left",
					label: "Dojo",
				},
				{ to: "/blog", label: "Blog", position: "left" },
				/*{
					href: "https://github.com/facebook/docusaurus",
					label: "GitHub",
					position: "right",
				},*/
			],
		},
		footer: {
			style: "dark",
			links: [
				{
					title: "JavaScript",
					items: [
						{
							label: "Course",
							to: "/docs/intro",
						},
					],
				},
				{
					title: "Community",
					items: [
						{
							label: "Stack Overflow",
							href: "https://stackoverflow.com/questions/tagged/docusaurus",
						},
						{
							label: "Discord",
							href: "https://discordapp.com/invite/docusaurus",
						},
						{
							label: "Twitter",
							href: "https://twitter.com/docusaurus",
						},
					],
				},
				{
					title: "More",
					items: [
						{
							label: "Blog",
							to: "/blog",
						},
						{
							label: "GitHub",
							href: "https://github.com/facebook/docusaurus",
						},
					],
				},
			],
			copyright: `Copyright ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
		},
		prism: {
			theme: prismThemes.github, // Use a light theme like 'github' for light mode
			darkTheme: prismThemes.dracula, // Keep the dark theme as 'dracula'
		},
	} satisfies Preset.ThemeConfig,

	plugins: [
		"docusaurus-plugin-sass",
		[
			"@docusaurus/plugin-content-docs",
			{
				id: "javascript",
				path: "content/course/javascript",
				routeBasePath: "course/javascript",
				sidebarPath: require.resolve("./sidebars.ts"),
			},
		],
	],
};

export default config;
