<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('group_id');
            $table->string('first_name')->nullable();
            $table->string('last_name');
            $table->enum('gender', ['F', 'M']);
            $table->string('phone');
            $table->string('email')->unique();
            $table->string('avatar')->nullable();
            $table->boolean('active')->default(0);
            $table->string('password');
            $table->foreign('group_id') ->references('id')->on('groups') ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
