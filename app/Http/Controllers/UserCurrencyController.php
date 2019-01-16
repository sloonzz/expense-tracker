<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCurrency as UserCurrencyResource;
use App\Services\UserCurrencyService;
use Illuminate\Http\Request;

class UserCurrencyController extends Controller
{
    protected $userCurrencyService;

    public function __construct(UserCurrencyService $userCurrencyService)
    {
        $this->userCurrencyService = $userCurrencyService;
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $request = new Request();
        if ($this->userCurrencyService->alreadyHasCurrency()) {
            return new UserCurrencyResource(auth('api')->user()->currency);
        } else {
            return $this->userCurrencyService->make($request);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $currency;
        if ($this->userCurrencyService->alreadyHasCurrency()) {
            $currency = auth('api')->user()->currency;
            $currency->fill($request->all());
            $currency->save();
            return new UserCurrencyResource($currency);
        } else {
            $defaultRequest = new Request();
            $currency = $this->userCurrencyService->make($defaultRequest);
            return $currency;
        }
    }

}
