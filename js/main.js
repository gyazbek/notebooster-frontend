$(document).ready(function() {


    // UPLOAD CLASS DEFINITION
    // ======================

    var dropZone = document.getElementById('drop-zone');
    var uploadForm = document.getElementById('js-upload-form');
    if(uploadForm) {

        var startUpload = function(files) {
            $('.js-upload-finished .list-group').html('<a href="#" class="list-group-item list-group-item-success"><span class="badge alert-success pull-right">Uploaded</span>' + files[0].name + '</a>');
        };

        uploadForm.addEventListener('submit', function(e) {
            var uploadFiles = document.getElementById('js-upload-files').files;
            e.preventDefault()

            startUpload(uploadFiles)
        })

        dropZone.ondrop = function(e) {
            e.preventDefault();
            this.className = 'upload-drop-zone';

            startUpload(e.dataTransfer.files)
        }

        dropZone.ondragover = function() {
            this.className = 'upload-drop-zone drop';
            return false;
        }

        dropZone.ondragleave = function() {
            this.className = 'upload-drop-zone';
            return false;
        }
    }

    $('#collapsedonation').on('shown.bs.collapse', function () {
       $(".buynow-drop .fa-caret-right").removeClass("fa-caret-right").addClass("fa-caret-down");
    });

    $('#collapsedonation').on('hidden.bs.collapse', function () {
       $(".buynow-drop .fa-caret-down").removeClass("fa-caret-down").addClass("fa-caret-right");
    });

});