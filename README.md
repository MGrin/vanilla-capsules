# Capsules vanilla filter

The purpose of this exercise is to develop a capsules filter:

1. To expose a function for filtering a list of capsules;
2. To develop a user interface for filtering a list of capsules.

## General guidelines

* Try do as much as you can, you can still do well even if everything is not finished.
* You will be evaluated based not only on whether the exercises are finished and work, but on code style as well. Beware of separation of concerns, abstraction, clean code, relevant comments, etc.
* ***Use only native JavaScript / [Vanilla JS](http://vanilla-js.com/) (ES6 allowed), HTML (HTML5 allowed) and CSS (CSS 3 allowed). ***
* Use the provided mock list of capsules, but assume both your function and UI should work with any data with the same structure.
* Feel free to download the code and work in your favorite IDE. Just remember to upload the result before the time's up.
* Try to divide your time as not to spend too much time on either part. In parentheses are estimates of time you should spend on each.

## Your tasks

### Read the readme carefully and check the signatures imposed by the tests (15 minutes).

### JavaScript - functional (1 hour)

Expose a function (window global) for returning a list of capsules filtered by a series of criteria:

* Text search;
* Minimum intensity search;
* Alphabetical ordering;
* Reverse alphabetical ordering;
* Multiple filters (e.g. text *and* intensity).

***Your function must make the unit tests pass***:

* Make the existing unit tests pass;
* Complete the missing unit tests;
* Add any additional unit tests you deem relevant.

### JavaScript - UI (1 hour)

Develop a visual representation of the capsules filter, which should include:

* List of capsules;
* A way of choosing the filter(s) to apply.

The list must:

* Update automatically whenever the filters change;
* Display the unfiltered list if filters are reset.

### CSS - UI (15 minutes)

* Showcase your css skills by making it looking nice.