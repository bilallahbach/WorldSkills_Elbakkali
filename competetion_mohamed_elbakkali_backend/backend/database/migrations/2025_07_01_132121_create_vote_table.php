<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVotesTable extends Migration
{
    public function up()
    {
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('anecdote_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['Bof', 'Excellent', 'Technique', 'Wow']);
            $table->timestamps();
            $table->unique(['user_id', 'anecdote_id', 'type']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('votes');
    }
}
