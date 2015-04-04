<?php 

class ModalModel {

  // Default modal objects are found in defaultModals.php
  private $toreturn;
  public $queuedModals = array();
  private $finalModals = array();

  private function MakeModal($id, $d) {
    $return = '<div class="modal fade" id="'.$id.'">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h3 class="modal-title">'.$d[title].'</h3>
              <p>'.$d[subtitle].'</p>
            </div>
            <div class="modal-body">'.$d[body].'</div>
          </div>
          <p class="text-center mtop25">'.$d[undermodal].'</p>
        </div>
      </div>';
      return $return;
  }

  private function filterModals() {
    foreach($this->queuedModals as $qmod) {
      foreach($this->defaultModals as $key => $dmod) {
        if($qmod == $key) {
          $this->finalModals[$key] = $dmod;
        }
      }
    }
  }

  // Add a modal array to the list of outputted modals. If $id = 'all' it ads all default modals
  public function add($id) {
    if($id == 'all') {
      $this->queuedModals = array_keys($this->defaultModals);
    } else {
      array_push($this->queuedModals, $id);
    }
  }

  // Overwrite an array with data 
  public function overwriteAndAdd($id, $newid, $data) {
    $newArr = $this->defaultModals[$id];
    foreach($data as $key => $val) {
      $newArr[$key] = $val;
    };
    $this->add($newid);
    $this->defaultModals[$newid] = $newArr;
  }

  public function outputModals() {

    $this->filterModals();
    foreach($this->finalModals as $key => $modal) {
      $toreturn .= $this->MakeModal($key, $modal);
    };
    return $toreturn;

  }

};

?>