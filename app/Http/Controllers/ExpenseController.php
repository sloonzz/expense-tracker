<?php

namespace App\Http\Controllers;

use App\Expense;
use App\Http\Requests\ExpenseRequest;
use App\Http\Resources\Expense as ExpenseResource;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $expenses = auth('api')->user()->expenses;
        return ExpenseResource::collection($expenses);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ExpenseRequest $request)
    {
        $expense = Expense::make($request->all());
        $expense->user_id = auth('api')->user()->id;
        if ($expense->save()) {
            return new ExpenseResource($expense);
        } else {
            return ['message' => 'Error saving!'];
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function show(Expense $expense)
    {

        if ($expense->user_id == auth('api')->user()->id) {
            return new ExpenseResource(Expense::find($expense->id));
        } else {
            return ['message' => 'Not authorized!'];
        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Expense $expense)
    {
        if ($expense->user_id == auth('api')->user()->id) {

            $expense->fill($request->all());

            if ($expense->save()) {
                return new ExpenseResource($expense);
            } else {
                return ['message' => 'Error saving!'];
            }
        } else {
            return ['message' => 'Not authorized!'];
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function destroy(Expense $expense)
    {
        if ($expense->user_id == auth('api')->user()->id) {

            if ($expense->delete()) {
                return [
                    'data' => (new ExpenseResource($expense)),
                    'message' => 'Resource successfully deleted.',
                ];
            } else {
                return ['message' => 'Error deleting!'];
            }

        } else {
            return ['message' => 'Not authorized!'];
        }

    }
}
