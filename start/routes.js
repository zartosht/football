'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get("docs", async ({ request, response, view }) => {
    const Helpers = use("Helpers")
    return response.download(Helpers.resourcesPath('views/docs.html'))
})
Route.get("/:WEEK", "MatchController.showResults")
Route.get("matches/:TEAM_ID", "MatchController.showTeamMatches")