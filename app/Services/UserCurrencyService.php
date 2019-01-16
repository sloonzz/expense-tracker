<?php

namespace App\Services;

use App\Http\Resources\UserCurrency as UserCurrencyResource;
use App\UserCurrency;
use Illuminate\Http\Request;

class UserCurrencyService
{
    public function make(Request $request)
    {
        $user_currency = UserCurrency::make($request->all());
        $user_currency->user_id = auth('api')->user()->id;
        if ($user_currency->save()) {
            return new UserCurrencyResource($user_currency);
        } else {
            return ['message' => 'Error saving currency!'];
        }
    }

    public function alreadyHasCurrency()
    {
        if (auth('api')->user()->currency) {
            return true;
        } else {
            return false;
        }
    }
}
