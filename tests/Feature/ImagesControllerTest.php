<?php

namespace Tests\Feature;

use App\Http\Controllers\ImagesController;
use App\Models\Image;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ImagesControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function tester_dashboard_application(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }


    // store in db test
    public function test_seeder_images()
    {
        // Make mock data to be returned by the Http client
        $this->artisan('db:seed');

        // Assert that the database has been seeded with the expected data
        $this->assertDatabaseCount('images', Image::count());
    }

    public function test_versus_api_method()
    {
        $images = Image::orderByRaw('RAND()')->limit(2)->get();

        $image1 = $images->first();
        $image2 = $images->last();

        $this->assertNotNull($image1);
        $this->assertNotNull($image2);

        
        $response = $this->post('api/images/versus', [
            'image_left' =>  $image1->id,
            'image_right' => $image2->id,
            'winner' => 'image_left'
        ]);

        // // Assert that the response has a 201 status code
        $response->assertStatus(201);

        

        // Assert that a Versus record was created in the database
        $this->assertDatabaseHas('versuses', [
            'image1_id' => $image1->id,
            'image2_id' => $image2->id,
            'winner_id' => $image1->id,
            'loser_id' => $image2->id,
        ]);
    }

}
