<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApartmentsTable extends Migration
{
    public function up()
    {
        Schema::create('apartments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->text('address'); 
            $table->decimal('price', 8, 2);
        
            $table->boolean('bedroom')->default(0);
            $table->boolean('bathroom')->default(0);
            $table->boolean('kitchen')->default(0);
            $table->boolean('tv')->default(0);

            $table->string('image')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('apartments');
    }
}
