<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Matchup;
use App\Models\Versus;
use Illuminate\Http\Request;

class ImagesController extends Controller
{

    public static function storeApiDataInDB()
    {
        // make http get request from https://latelier.co/data/cats.json and store it in Image model
        $data = \Http::get('https://latelier.co/data/cats.json')->json();

        foreach ($data['images'] as $image) {
            \App\Models\Image::query()->updateOrCreate(
                ['id' => $image['id']],
                [
                    'url' => $image['url'],
                    'score' => 0,
                ]
            );
        }

    }


    public function versus(Request $request)
    {
        $image_left = $request->input('image_left');
        $image_right = $request->input('image_right');

        // Determine the winning and losing images
        if ($request->input('winner') == 'image_left') {
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
}
