$(function () {

    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator

    $('#signup-form').validator();

    // when the form is submitted
    $('#signup-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var form = {
                first_name: $('#form_firstname').val(),
                last_name: $('#form_lastname').val(),
                mail: $('#form_email').val(),
                phone: $('#form_phone').val(),
            };

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: "https://api.havbrukskollektivet.no/service/aquanet.php",
                data: JSON.stringify(form),
                contentType: 'application/json',
                success: function(data) {
                    // {
                    //     “error”:  {
                    //             “errorCode”: 0,
                    //             “errorText”:  “”
                    //     },
                    //     “data”:  “User successfully created, Click Anteo login link below.”
                    // }
                    var isError = data.error.errorCode !== 0;
                    var alertType = !isError ? 'alert-primary' : 'alert-danger';
                    var messageText = !isError ? data.data : data.error.errorText;

                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + alertType + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
                    // If we have messageAlert and messageText
                    if (alertType && messageText) {
                        // inject the alert to .messages div in our form
                        $('#signup-form').find('.messages').html(alertBox);
                        // empty the form
                        $('#signup-form')[0].reset();
                    }
                }
            });
            return false;
        }
    })
});
