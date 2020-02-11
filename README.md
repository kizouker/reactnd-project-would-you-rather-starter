# Documentation

## Installation
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `yarn install`
To build the project.

### `yarn start`
- Runs the app in the development mode.<br />
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Setup git account
- git remote -v
- git remote rm origin
- git remote add origin https://github.com/kizouker/reactnd-project-would-you-rather-starter.git
- git push --set-upstream origin master

# Administration
## Project plan, etc
- https://onedrive.live.com/edit.aspx?resid=9E495D9EC53B2CA3%21692&nd=1
- https://onedrive.live.com/?id=9E495D9EC53B2CA3%21691&cid=9E495D9EC53B2CA3

## General
- https://reactjs.org/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript

- https://classroom.udacity.com/nanodegrees/nd019/parts/7dab5516-d1ae-45d3-b8f8-d782b5534caf/modules/20a434da-4fde-4774-9113-99835bf80eaa/lessons/78a0081e-2af5-4961-95b0-b473fe5209b7/concepts/6a600a1d-d8c8-4ce9-a90d-4f581fa38c87
https://review.udacity.com/#!/rubrics/1567/view

## Example app
http://either.io/7095/would-you-rather


# Work process
## Define all views
## Define all components
- Answer
- User
- Post
- List
- LeaderBoard
## Draw a hierchy btwn components
## What events happen in the cmp 

# Components
## Post
Posts a new question with two alternatives

## Answer
- Updates List / unanswered or answered questions
- Updates Statistics for questions
- Updates Leaderboard

## etc

## Decide what states lives in the store
- Question
id, text

| id | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo 

ListOfQuestions
- Qid, answered?

Statistics
- Qid, A: #answered; %answered, B:#answered; %answered

Leaderboard
- Uid, #answered, #asked

## Define routes to all components

## Try out the redux store
...to update it with one action

## Define all actions
- put them in a separate file
ACTION_POST_QUESTION V
ACTION_UPDATE_LIST V
ACTION_UPDATE_LEADERBOARD V

## Define reducers
- use switch / case statements

## define user log in component


# Initial information 

## Would You Rather Project

This is the starter code for the final assessment project for Udacity's React & Redux course.

The `_DATA.js` file represents a fake database and methods that let you access the data. The only thing you need to edit in the ` _DATA.js` file is the value of `avatarURL`. Each user should have an avatar, so you’ll need to add the path to each user’s avatar.

Using the provided starter code, you'll build a React/Redux front end for the application. We recommend using the [Create React App](https://github.com/facebook/create-react-app) to bootstrap the project.

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|

## Contributing

This repository is the starter code for *all* Udacity students. Therefore, we most likely will not accept pull requests. For details, check out [CONTRIBUTING.md](https://github.com/udacity/reactnd-project-would-you-rather-starter/blob/master/CONTRIBUTING.md).
