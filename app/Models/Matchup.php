<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matchup extends Model
{

    protected $fillable = [
        'image1_id',
        'image2_id',
        'winner_id',
        'loser_id',
    ];

    public function image1()
    {
        return $this->belongsTo(Image::class, 'image1_id');
    }

    public function image2()
    {
        return $this->belongsTo(Image::class, 'image2_id');
    }

    public function winner()
    {
        return $this->belongsTo(Image::class, 'winner_id');
    }

    public function loser()
    {
        return $this->belongsTo(Image::class, 'loser_id');
    }
}
