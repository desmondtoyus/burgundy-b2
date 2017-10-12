$(document).ready(function () {
    if (!sessionStorage.userId) {
        window.location.href = "/";
    }
    $('#username').append(sessionStorage.lastName + " " + sessionStorage.name);

    $('imgsuccess').html('Upload Success');
    //   if ('/user-images/'+sessionStorage.userId+'.jpg'){
    //     $('#userimage').attr('src','/user-images/'+sessionStorage.userId+'.jpg');
    //   }
    //   else{
    //     $('#userimage').attr('src','http://loremflickr.com/320/240/brazil,rio');
    //   }
    $.ajax({
        url: '/user-images/' + sessionStorage.userId + '.jpg',
        type: 'HEAD',
        error: function () {
            $('#userimage').attr('src', 'user-images/user-default.png');
        },
        success: function () {
            $('#userimage').attr('src', '/user-images/' + sessionStorage.userId + '.jpg');
        }
    })
    //   sessionStorage.userId=userId;
    //   sessionStorage.lastName=data.lastname;
    //   sessionStorage.name=data.name;

    var navItems = $('.admin-menu li > a');
    var navListItems = $('.admin-menu li');
    var allWells = $('.admin-content');
    var allWellsExceptFirst = $('.admin-content:not(:first)');
    allWellsExceptFirst.hide();
    navItems.click(function (e) {
        e.preventDefault();
        navListItems.removeClass('active');
        $(this).closest('li').addClass('active');
        allWells.hide();
        var target = $(this).attr('data-target-id');
        $('#' + target).show();
    });

    //puting recent user upload on registered user home page
    // var newDiv = $('<div>');
    // newDiv.html('<div class="col-lg-4 col-sm-6"><div class="card hovercard"><div class="cardheader"></div><div class="avatar"><img alt="" src="http://lorempixel.com/100/100/people/9/"></div><div class="info"><div class="title"><a target="_blank" href="http://scripteden.com/">Product Name</a></div><div class="desc">Product short description goes here</div></div><div class="bottom"><a class="btn btn-primary btn-twitter btn-sm" href="https://twitter.com/webmaniac"><i class="fa fa-twitter"></i></a><a class="btn btn-danger btn-sm" rel="publisher" href="https://plus.google.com/+ahmshahnuralam"><i class="fa fa-google-plus"></i></a><a class="btn btn-primary btn-sm" rel="publisher" href="https://plus.google.com/shahnuralam"><i class="fa fa-facebook"></i></a><a class="btn btn-warning btn-sm" rel="publisher" href="https://plus.google.com/shahnuralam"><i class="fa fa-behance"></i> </a></div></div></div>')
    // $('#home').append(newDiv);


})
//show the current user posts
function myPosts () {
    // alert("my post");
    $.get('/api/userposts/'+sessionStorage.userId, function (data) {
        if (data.length>0) {
            console.log(data.length>0);
            for (var index = 0; index < data.length; index++) {
                var newDiv = $('<div>');
                console.log(data[index].id);
                var imgPath = '/product-images/' + data[index].id + '.jpg';
                // var imgPath2 = '/user-images/' + data[index].userId + '.jpg';
                if (data[0].still_available) {
                    var avail = "<b>Availability: Still Available</b>";
                } else {
                    var avail = "<b>Availability: No longer Available</b>";
                }
                // $('.cardheader2').css('background-image', 'url("' + imgPath + '")');
                newDiv.html('<div class="col-lg-4 col-sm-6 item"  value=' + data[index].id + '><div class="card hovercard"><div class="cardheader2" style="background-image:url(' + imgPath + ')"></div><div class="info"><div class="title"><a target="_blank" href="/item/' + data[index].id + '">' + data[index].item_name + '</a></div><div class="desc">' + data[index].short_desc + '</div></div><div class="bottom"><a class="btn btn-primary btn-twitter btn-sm still-avail" href="#">' + avail + '<i class="fa fa-twitter"></i></a></div></div></div>')
                $('#post-by-user').append(newDiv);
    
            }
    
        } else {
            $("#search_error").show();
        }
        
    })
    
}
/// dispaly msg onload
function showMessage() {
    // alert("something is happening.");
    $.get('/api/messages/' + sessionStorage.userId, function (data) {
        // alert("Checking: ");
        // console.log(data);
        //stop appending message on the screen
        $('#msg-row').empty();
        if (data.length > 0) {
            for (var index = 0; index < data.length; index++) {
                var mesDiv = $('<div>');
                mesDiv.addClass('message-div');
                mesDiv.html('<tr data-status="pagado" class="aMessage" value='+data[index].userId+'><td><div class="ckbox"><input type="checkbox" id="checkbox1"><label for="checkbox1"></label></div> </td><td><a href="javascript:;" class="star"><i class="glyphicon glyphicon-star"></i></a></td><td><div class="media"><a href="#" class="pull-left"><img src="user-images/'+data[index].other_user+'.jpg" class="media-photo"></a><div class="media-body"> <span class="media-meta pull-right">Febrero 13, 2016</span><p class="summary" id="msg-summary">' + data[index].my_message + '</p></div></div></td> </tr>')
                console.log("User Id 2: "+data[index].other_user)
                $('#msg-row').append(mesDiv);
            }

        } else {
            $('#msg-row').text('No Chat');
        }

    })

}


$('#profile1').on('click', function (e) {
    e.preventDefault();
    //post-by-user
    $('#item-search').hide();
    $("#search_error").hide();
    myPosts ();
    $("#profile1").attr("data-target-id", "profile");
})



$('#home1').on('click', function (e) {
    e.preventDefault();
    $('#item-search').hide();
    $("#search_error").hide();
    $("#profile1").attr("data-target-id", "home");
})

$('#add-product1').on('click', function (e) {
    e.preventDefault();
    $('#item-search').hide();
    $("#search_error").hide();
    $("#profile1").attr("data-target-id", "add-product");
})

$('#settings1').on('click', function (e) {
    e.preventDefault();
    $('#item-search').hide();
    $("#search_error").hide();
    $("#profile1").attr("data-target-id", "settings");
})

$('#logout1').on('click', function (e) {
    e.preventDefault();
    $('#item-search').hide();
    $("#search_error").hide();
    $("#profile1").attr("data-target-id", "logout");
})

$('#message1').on('click', function (e) {
    e.preventDefault();
    // alert('clicked');
    $('#item-search').hide();
    $("#search_error").hide();

    showMessage();
    $("#profile1").attr("data-target-id", "message");
})

$('#addProduct').on('click', function (e) {

    e.preventDefault();
    var productSelect = $('#productSelect').val().trim();
    var productName = $('#productname').val().trim();
    var userWant = $('#userwant').val().trim();
    var productDescription = $('#productdescription').val().trim();
    var shortDesc = $('#shortdesc1').val().trim();
    var location = $('#myloc').val().trim();
console.log(productSelect)
console.log(productName)
console.log(userWant)
console.log(productDescription)
console.log(shortDesc)
console.log(location)

    if (productSelect === '' || productName === '' || userWant === '' || shortDesc === '' || location === '') {
        alert('Invalid Input');
        return false;
    }
    var userPost = {
        category: productSelect,
        name: productName,
        userwant: userWant,
        description: productDescription,
        shortdesc: shortDesc,
        location: location,
        userid: sessionStorage.userId
    }
    $('#productSelect').val('');
    $('#productname').val('');
    $('#userwant').val('');
    $('#short_desc').val('');
    $('#location').val('');
    productDescription = $('#productdescription').val('');


    $.post('/api/posts/', userPost, function (data) {
        console.log(data);
        localStorage.productId = data.id;
    }).then(function () {
        window.location.href = "/productimages";

    })

})