<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // make an api call to server in register all images inside the images 
        $data = \Http::get('https://latelier.co/data/cats.json')->json();

        if (\App\Models\Image::query()->count() <= 0) {
            foreach ($data['images'] as $image) {
                \App\Models\Image::query()->updateOrCreate(
                    ['id' => $image['id']],
                    [
                        'id'=>$image['id'],
                        'url' => $image['url'],
                    ]
                );
            }
        }
    }
}
