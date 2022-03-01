<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FirsttitleSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $seederUtil = new SeederUtil;
    $texts = $seederUtil->getFirsttitleArray();
    foreach ($texts as $text) {
      $array[] = ['text' => $text];
    }
    DB::table('firsttitles')->insert($array);
  }
}
