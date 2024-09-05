---
sidebar_position: 2
sidebar_label: Date Information
---

# Date Information
## Extracting Date Information

Once you have a `Date` object, you can use the following methods to extract specific parts:

```js
const date = new Date("2024-09-15");
const year = date.getFullYear(); // 2024 - Returns the 4-digit year.
const month = date.getMonth(); // 8 - Returns the month, 0-11, where January is 0.
const day = date.getDate(); // 15 - Returns the day of the month (1-31)
const dayOfWeek = date.getDay(); // 0 - Returns the day of the week, 0-6, where Sunday is 0.
```

## Challenge: Full Date

JavaScript provides basic formatting methods.

Input: 01/24/2024

We can use `toDateString()` to output a human-readable date string (e.g., `"Mon Jan 20 2024"`).

However, we want our blog to display the full date in the correct US format: `Thursday, September 5, 2024`.

How to solve this problem:

-   Create an array containing the days of the week starting with Sunday.
-   Create an array containing the names of the months.
-   Use the `Date` object to get the day of the week.
-   Use the `Date` object to get the month.
-   Use the `Date` object to get the day of the month.
-   Use the `Date` object to get the year.
-   Return the formatted date.



### Example

```js
const today = new Date();
console.log(today.getFullYear()); // Outputs current year
console.log(today.getMonth()); // Outputs current month (0-based)
console.log(today.toDateString()); // Outputs: Mon Jan 20 2024
```

For non-ISO formats, behaviour can be unpredictable and vary by browser. To ensure consistency, validate or preprocess the input first.
The **safest format** to convert a string into a `Date` object is the **ISO 8601** format (`YYYY-MM-DD`), as it's well-supported across different browsers:
