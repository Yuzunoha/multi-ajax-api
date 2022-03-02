<?php

namespace App\Http\Controllers;

use App\Models\Title;
use App\Services\UtilService;
use Illuminate\Http\Request;

class TitleController extends Controller
{
  protected $utilService;

  public function __construct(UtilService $utilService)
  {
    $this->utilService = $utilService;
  }

  public function maxnum()
  {
    return count(Title::all());
  }

  public function first($id)
  {
    $m = Title::find($id);
    if (!$m) {
      $this->utilService->throwHttpResponseException("id: $id は存在しません。");
    }
    return json_encode($m->text);
  }

  public function second($id, Request $request)
  {
    $m = Title::find($id);
    if (!$m) {
      $this->utilService->throwHttpResponseException("id: $id は存在しません。");
    }
    $first_text = $request->first_text;
    $a = explode('×', $m->text);
    if ($a[0] !== $first_text) {
      $this->utilService->throwHttpResponseException("id: $id, first_text: $first_text の組は存在しません。");
    }
    return json_encode($a[1]);
  }
}
