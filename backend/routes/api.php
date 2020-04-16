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

Route::post('/login', 'UserController@login')->middleware('App\Http\Middleware\Cors');
//Route::post('register', 'API\UserController@register');

// Protection des routes. Toutes les routes à protéger par authentification vont dans ce groupe
Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/userinfos', 'UserController@infos')->middleware('App\Http\Middleware\Cors');
});

Route::get('/groups', 'GroupController@index')->middleware('App\Http\Middleware\Cors');
Route::get('/groups/{id}', 'GroupController@show')->middleware('App\Http\Middleware\Cors');
Route::post('/groups', 'GroupController@store')->middleware('App\Http\Middleware\Cors');
Route::post('/groups/{id}', 'GroupController@update')->middleware('App\Http\Middleware\Cors');
Route::delete('/groups/{id}', 'GroupController@destroy')->middleware('App\Http\Middleware\Cors');

Route::get('groups/{id}/users', 'GroupController@getUsers')->middleware('App\Http\Middleware\Cors');

Route::get('/users', 'UserController@index')->middleware('App\Http\Middleware\Cors');
Route::get('/users/{id}', 'UserController@show')->middleware('App\Http\Middleware\Cors');
Route::get('/users/{id}/group', 'UserController@group')->middleware('App\Http\Middleware\Cors');
Route::post('/users', 'UserController@store')->middleware('App\Http\Middleware\Cors');
Route::post('/users/{id}', 'UserController@update')->middleware('App\Http\Middleware\Cors');
Route::delete('users/{id}', 'UserController@destroy')->middleware('App\Http\Middleware\Cors');
