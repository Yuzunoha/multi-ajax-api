<?php

namespace App\Http\Controllers;

use App\Models\Fulltitle;

class TitleController extends Controller
{
  public function first($id)
  {
    return Fulltitle::get();
  }
}
