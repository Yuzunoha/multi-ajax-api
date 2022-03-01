<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ThirdtitleSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $seederUtil = new SeederUtil;
    $texts = $seederUtil->getThirdtitleArray();
    foreach ($texts as $text) {
      $array[] = ['text' => $text];
    }
    DB::table('thirdtitles')->insert($array);
  }
}
