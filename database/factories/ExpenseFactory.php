<?php

use Faker\Generator as Faker;

$factory->define(App\Expense::class, function (Faker $faker) {
    return [
        'name' => $faker->text(30),
        'cost' => $faker->numberBetween(10, 1000),
        'quantity' => $faker->numberBetween(1, 20),
        'description' => $faker->text(60),
        'user_id' => 1,
        'date' => $faker->dateTimeBetween('-6 months', 'now'),
    ];
});
