(function ($) {
    "use strict";

    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })

    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });
    
    $("#chooseDate").change(function(){
        var date = $('#chooseDate').val();
        
        $.ajax({
            url:"/time/get",
            method:"GET",
            data:{date},
            dataType: 'application/json; charset=utf-8',
            success:function(result){
                alert(result);
                if (result) {
                    var slot = $.parseJSON(result);
                    if(slot.availableTime.length > 0){
                        $.each(slot.availableTime, function(i, time) {
                            $('#time-option').append($('<option>', {
                                text: time
                            }));
                        });
                    }
                    else{
                        $('#time-option').append($('<option>', {
                            text: 'No available timeslot!'
                        }));
                    }
                }
                else{
                    $('#time-option').append($('<option>', {
                        text: 'ERROR, please try againQ'
                    }));
                }
            }
        });
    });
      

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null) {
                return false;
            }
        }
        if($(input).attr('name') == 'mobile-phone') {
            if($(input).val().trim().match(/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/) == null) {
                return false;
            }
        }
        if($(input).attr('name') == 'mobile-phone') {
            if($(input).val().trim().match(/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/) == null) {
                return false;
            }
        }
        else if($(input).attr('name') == 'car1-cartype' ) {
            if($(input).val() == "Choose a car type*") {
                return false;
            }
        }
        else if($(input).attr('name') == 'carType' ) {
            if($(input).val() == "Choose a car type*") {
                return false;
            }
        }
        else if($(input).attr('name') == 'carOption' ) {
            if($(input).val() == "Choose a car wash option*") {
                return false;
            }
        }
        else if($(input).attr('name') == 'time' ) {
            if($(input).val() == "Choose a time slot*") {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);