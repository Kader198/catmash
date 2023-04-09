<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Matchup;
use App\Models\Versus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ImagesController extends Controller
{




    public function versus(Request $request)
    {
        $image_left = $request->image_left;
        $image_right = $request->image_right;

        // Determine the winning and losing images
        if ($request->winner == 'image_left') {
            $winner_id = $image_left;
            $loser_id = $image_right;
        } else {
            $winner_id = $image_right;
            $loser_id = $image_left;
        }

        // Update the scores of the images
        $winner = Image::find($winner_id);
        $loser = Image::find($loser_id);
        $winner->score++;
        $loser->score--;
        $winner->save();
        $loser->save();

        // Record the matchup in the database
        $matchup = new Versus();
        $matchup->image1_id = $image_left;
        $matchup->image2_id = $image_right;
        $matchup->winner_id = $winner_id;
        $matchup->loser_id = $loser_id;
        $matchup->save();


        return response()->json(201);
    }


    public function images_score()
    {

        return Inertia::render('ImagesScore', [
            'images' => \App\Models\Image::query()->orderBy('score', 'desc')->get(),
        ]);
    }


}
