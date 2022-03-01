<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FulltitleSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $texts[] = 'a';
    $texts[] = 'b';
    $texts[] = 'c';
    foreach ($texts as $text) {
      $array[] = [
        'text' => $text,
      ];
    }
    DB::table('fulltitles')->insert($array);
  }
}
