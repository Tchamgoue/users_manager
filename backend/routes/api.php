<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::post('/login', 'UserController@login');
//Route::post('register', 'API\UserController@register');

Route::get('/groups', 'GroupController@index');
Route::get('/groups/{id}', 'GroupController@show');
Route::post('/groups', 'GroupController@store');
Route::post('/groups/{id}', 'GroupController@update');
Route::delete('/groups/{id}', 'GroupController@destroy');

Route::get('groups/{id}/users', 'GroupController@getUsers');

Route::get('/users', 'UserController@index');
Route::get('/users/{id}', 'UserController@show');
Route::get('/users/{id}/group', 'UserController@group');
Route::post('/users', 'UserController@store');
Route::post('/users/{id}', 'UserController@update');
Route::delete('users/{id}', 'UserController@destroy');
