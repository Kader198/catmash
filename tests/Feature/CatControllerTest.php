<?php

namespace Tests\Feature;

use App\Http\Controllers\ImagesController;
use App\Models\Image;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class CatControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }


    // store in db test
    public function testStoreApiDataInDB()
    {
        // Make mock data to be returned by the Http client
        $data = [
            'images' => [
                [
                    'id' => '1test',
                    'url' => 'https://catimage.com/1.jpg',
                ],
                [
                    'id' => '2test',
                    'url' => 'https://catimage.com/2.jpg',
                ],
            ],
        ];
        Http::fake([
            'https://latelier.co/data/cats.json' => Http::response($data, 200),
        ]);

        // Call the method under test
        ImagesController::storeApiDataInDB();

        // Assert that the data was stored in the database
        $this->assertDatabaseCount('images', 100);
    }

    public function testVersusMethod()
    {
        // Create two images to compare
        $image1 =new  Image();
        $image1->id = \Str::uuid();
        $image1->url = 'http://24.media.tumblr.com/tumblr_m29a9d62C81r2rj8po1_500.jpg';
        $image1->score = 0;
        $image1->save();

        $image2 =new  Image();
        $image2->id = \Str::uuid();
        $image2->url = 'http://24.media.tumblr.com/tumblr_m29a9d62C81r2rj8po1_500.jpg';
        $image2->score = 0;
        $image2->save();

        // Make a request to the versus endpoint with image1 as the winner
        $response = $this->postJson('/api/images/versus', [
            'image_left' => $image1->id,
            'image_right' => $image2->id,
            'winner' => 'image_left'
        ]);

        // Assert that the response has a 201 status code
        $response->assertStatus(201);

        // Reload the images from the database to get their updated scores
        $image1 = $image1->fresh();
        $image2 = $image2->fresh();

        // Assert that the scores were updated correctly
        $this->assertEquals(1, $image1->score);
        $this->assertEquals(-1, $image2->score);

        // Assert that a Versus record was created in the database
        $this->assertDatabaseHas('versus', [
            'image1_id' => $image1->id,
            'image2_id' => $image2->id,
            'winner_id' => $image1->id,
            'loser_id' => $image2->id,
        ]);
    }

}
