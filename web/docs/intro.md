---
sidebar_position: 1
---

import TrueFalseQuestion from "@site/src/modules/quiz/TrueFalseQuestion";
import MultipleChoiceQuestion from "@site/src/modules/quiz/MultipleChoiceQuestion";
import ShortAnswerQuestion from "@site/src/modules/quiz/ShortAnswerQuestion";

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

<MultipleChoiceQuestion
  question={`
\`\`\`js
const date = Number.parseInt("21 February 2024");
\`\`\`

What is the value of \`date\`?`}
  options={["Null", "21", "NaN", "212024"]}
  correctAnswer={1}
/>

<ShortAnswerQuestion   question={`
\`\`\`js
const array = [1, 2, 3, 4, 5, 6];
const output = 6 in array;
\`\`\`

What is the value of \`output\`?`}/>