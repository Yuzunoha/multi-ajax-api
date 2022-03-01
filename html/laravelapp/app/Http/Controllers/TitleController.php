<?php

namespace App\Http\Controllers;

class TitleController extends Controller
{
  public function first($id)
  {
    return ['first', $id];
  }
}
