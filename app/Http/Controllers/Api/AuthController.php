<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        /**
         * TODO:
         * Accept username, password, email for user.
         * Save in database.
         * Login user using request.
         * Create access token.
         * Return access token.
         *
         *
         *
         */
    }

    public function login(Request $request)
    {
        /**
         * TODO:
         * Accept username, password, email for user.
         * Check if valid.
         * Return access token.
         */
    }

    public function logout(Request $request)
    {
        /**
         * TODO:
         * Log out user (using auth maybe?).
         * Revoke/delete corresponding access token in database.
         */
    }
}
