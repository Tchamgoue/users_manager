<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Group;
use Illuminate\Support\Facades\Validator;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $groups = Group::all();
        return $groups;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'bail|required|unique:groups|alpha',
            'description' => 'max:255',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json(array(
                'message' => 'Something wrong with your request !',
                'error' => $errors,
            ), 400);

        }

        $group = Group::create($request->all());
        return response()->json($group, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $group = Group::findOrFail($id);
        return $group;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'bail|required|unique:groups|alpha',
            'description' => 'max:255',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json(array(
                'message' => 'Something wrong with your request !',
                'error' => $errors,
            ), 400);

        }

        $group = Group::findOrFail($id);
        $group->update($request->all());

        return response()->json($group, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $group = Group::findOrFail($id);
        $group->delete();

        return response()->json(null, 204);
    }

    public function getUsers($id)
    {
        $group = Group::findOrFail($id);
        return $group->users;
    }
}
