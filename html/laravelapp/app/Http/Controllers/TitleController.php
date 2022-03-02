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
    if ($m) {
      return json_encode($m->text);
    }
    $this->utilService->throwHttpResponseException("id $id は存在しません。");
  }

  public function second($id, Request $request)
  {
    return $request;
    $m = Title::find($id);
    if ($m) {
      return json_encode($m->text);
    }
    $this->utilService->throwHttpResponseException("id $id は存在しません。");
  }
}
