<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
    }

    public function login(Request $request)
    {

        $email = $request->email;
        $password = $request->password;
        $request->request->add([
            'username' => $email,
            'password' => $password,
            'grant_type' => 'password',
            'client_id' => env('PASSWORD_GRANT_CLIENT_ID'),
            'client_secret' => env('PASSWORD_GRANT_CLIENT_SECRET'),
            'scope' => '*',
        ]);

        $tokenRequest = Request::create(
            env('APP_URL') . '/oauth/token',
            'post'
        );

        $response = Route::dispatch($tokenRequest);

        return $response;
    }

    public function logout()
    {
        auth()->user()->tokens->each(function ($token, $key) {
            $token->delete();
        });
        return response()->json('Logged out successfully', 200);
    }
}
