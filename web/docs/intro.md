---

sidebar_position: 1
---

import TrueFalseQuestion from '@site/src/modules/quiz/TrueFalseQuestion';
import MultipleChoiceQuestion from '@site/src/modules/quiz/MultipleChoiceQuestion';

# Type Coercion

I just want to see `embedded code` in the MDX, not the

<TrueFalseQuestion
  question="JavaScript is a strongly-typed language."
  correctAnswer={false}
/>
Reveal?
JavaScript is a weakly-typed language, meaning that variables cannot change __.
Low-level languages like C++ and Rust have greater control over the system hardware, like memory and CPU, and so...

## Parsing Integers

```js
const date = Number.parseInt("21 February 2024");
```
<MultipleChoiceQuestion
  question={"What is the value of `date`?"}
  options={["Null", "21", "NaN", "212024"]}
  correctAnswerIndex={3}
/>

## Getting Started

Get started by **creating a new site**.

Or **try Docusaurus immediately** with **[docusaurus.new](https://docusaurus.new)**.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 18.0 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
