<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return $users;
    }
    
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'bail|required|email',
            'password' => 'bail|required',
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json(array(
                'message' => 'Something wrong with your request!',
                'error' => $errors,
            ), 400);
        }

        $email = $request->email;
        $password = $request->password;

        
        if(Auth::attempt(['email' => $email, 'password' => $password])){
            $user = Auth::user();
            $token = $user->createToken('SecretKey')->accessToken;
            return response()->json(['token' => $token, 'user'=> $user], 200);
        }
        else{
            return response()->json(['error'=>'Unauthorised'], 401);
        } 
    

    }

    public function infos()
    {
        $user = Auth::user();
        return response()->json(array(
            'success' => true,
            'data' => $user
        ), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        /* Le validateur se rassure que le champs requit est renseigné dans la requête et qu'il nY existe pas dans la BD
         un attribut sensé être unique qui porte le même nom*/
        $validator = Validator::make($request->all(), [
            'group_id' => 'bail|required|numeric',
            'last_name' => 'bail|required|max:25',
            'email' => 'bail|required|email',
            'gender' => 'bail|required|alpha',
            'phone' => 'bail|required',
            'password' => 'bail|required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json(array(
                'message' => 'Something wrong with your request!',
                'error' => $errors,
            ), 400);
        }
        // les données de la requête sont valides
        $input = $request->all();
        $input['password'] = bcrypt($input['password']); 
        $user = User::create($input);
        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        $user->getGroup;

        return $user;
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
            'group_id' => 'bail|required|numeric',
            'last_name' => 'bail|required|max:25',
            'email' => 'bail|required|email',
            'gender' => 'bail|required|alpha',
            'phone' => 'bail|required',
            'password' => 'bail|required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json(array(
                'message' => 'Something wrong with your request!',
                'error' => $errors,
            ), 400);

        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::findOrFail($id);
        $user->update($request->all());

        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(null, 204);
    }

    public function group ($id)
    {
        $user = User::find($id);
        $group = $user->getGroup;
        return $group;
    }
}
