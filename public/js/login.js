$(function () {

    $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    document.querySelector('#register-submit2').addEventListener('click', function (e) {
    //$('#register-submit').on('click', function (e) {
        e.preventDefault();
     
            
        
        var name = $('#name').val().trim();
        var lastname = $('#lastname').val().trim();
        var myemail = $('#myemail').val().trim();
        var mypassword = $('#mypassword').val().trim();
        var confirmPassword = $('#confirm-password').val().trim();
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        console.log(myemail);
        if (myemail == '' || !re.test(myemail)) {
            alert('Please enter a valid email address.');
            return false;
        }

        if (mypassword === '' || lastname === '' || name === '') {
            alert('Please enter a valid input.');
            return false;
        }
        if (confirmPassword == !mypassword) {
            alert('Please confirm Password.');
            return false;
        }

        var userDetail = {
            // link: userImg,
            name: name,
            lastname: lastname,
            email: myemail,
            password: mypassword
        }
        $('#name').val('');
        $('#lastname').val('');
        $('#myemail').val('');
        $('#mypassword').val('');
        $('#confirm-password').val('');
        console.log(userDetail);
        $.post('/api/users/', userDetail, function (data) {
            if(data){
            // console.log(gotDetails);
            sessionStorage.userId=data.id;
            sessionStorage.lastName=data.lastname;
            sessionStorage.name=data.name;
            window.location.href="/profile";
            }
            else{
                $('#error').text('Something went wrong');
            }
            
        })


    })

$('#login-submit').on('click', function (e) {
    e.preventDefault();
    var email=$('#emailuser').val().trim();
   var mypassword=$('#mypassword2').val().trim();
   var  remember=$('#remember').val().trim();
   var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
   
   if (email == '' || !re.test(email)) {
       alert('Please enter a valid email address.');
       return false;
   }
   if (mypassword=='') {
       alert('Invalid Input');
       return false;
   }else
   {
       var userObj={
        email: email,
        password:mypassword

       }
    //    console.log(userObj);
    //    "/api/posts" + categoryString, 
       $.get("/api/user/"+email+'/'+mypassword, function (data) {
           if(!data){
             alert('Invalid User Name. Please register.');
           }
           else{
               console.log('User Exists');
               var userId =data.id;
               console.log(userId);
               sessionStorage.userId=userId;
               sessionStorage.lastName=data.lastname;
               sessionStorage.name=data.name;
                window.location.href="/profile";
           }
       })
   }
})
});