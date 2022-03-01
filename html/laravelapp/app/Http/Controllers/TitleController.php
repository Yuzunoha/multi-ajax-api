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

  public function first($id)
  {
    $m = Title::find($id);
    if ($m) {
      return $this->utilService->successResponse($m->text);
    }
    $this->utilService->throwHttpResponseException("id $id は存在しません。");
  }

  public function second($id, Request $request)
  {
    return $request;
    $m = Title::find($id);
    if ($m) {
      return $this->utilService->successResponse($m->text);
    }
    $this->utilService->throwHttpResponseException("id $id は存在しません。");
  }
}
