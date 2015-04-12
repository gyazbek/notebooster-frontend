$(document).ready(function() {

    function openDropdown() {
        $('.dropdown').data('open', true);
        $('.overlay-trans').addClass('visible');

        $('li.notification').fadeOut(0);
        if($(window).width() > 768) {
            $('li.profile').animate({
                width: "260px"
            }, 400, function() {
                $('li.profile>span').fadeIn('slow');
            });
        } else {
            $('li.profile>span').fadeIn('slow');
        }
    }
    function closeDropdown() {
        $('.dropdown').data('open', false);
        $('.overlay-trans').removeClass('visible');

        if($(window).width() > 768) {
            $('li.profile>span').fadeOut('fast', function() {
                $('li.profile').animate({
                    width: "79px"
                }, 400, function() {
                    $('li.notification').fadeIn('fast');
                });
            });
        } else {
            $('li.profile>span').hide();
            $('li.notification').fadeIn('fast');
        }
    }

    $('.dropdown').data('open', false);

    $('.dropdown-toggle').click(function() {
        if($('.dropdown').data('open')) {
            closeDropdown();
        } else {
            openDropdown();
		}
	});

    $(document).click(function() {
		if($('.dropdown').data('open')) {
            closeDropdown();
		}
	});

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

    $.ajax({
        url: "js/schools-short.json",
        success: function (data) {
            // console.log(data);
            $("select.school-select-box").select2({
                data: data.results
            });
        }
    });
    $.ajax({
        url: "js/courses-fsu.json",
        success: function (data) {
            //console.log(data);
            $("select.courses-select-box").select2({
                data: data.results
            });
        }
    });
   

    $('#collapsedonation').on('shown.bs.collapse', function () {
       $(".buynow-drop .fa-caret-right").removeClass("fa-caret-right").addClass("fa-caret-down");
    });

    $('#collapsedonation').on('hidden.bs.collapse', function () {
       $(".buynow-drop .fa-caret-down").removeClass("fa-caret-down").addClass("fa-caret-right");
    });

});