<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;
    protected $casts = [
        'id'=>'string',
        'url'=>'string',
        'score'=>'integer'
    ];

    protected $fillable = [
        'id',
        'url',
        'score',
    ];


    
}
