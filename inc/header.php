<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>NoteBooster</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">

    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link href="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.0-beta.3/css/select2.min.css" rel="stylesheet" />
    <link href='//fonts.googleapis.com/css?family=Ubuntu:300,500' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/blue.css">
    <link href="img/favicon.png" rel="icon">

    <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
  </head>
  <body>

  <div id="wrap">

    <?php include ('inc/defaultModals.php');
    $modals = new DefaultModalsModel; ?>

    <div id="fb-root"></div>
    <script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&appId=692231817534566&version=v2.0";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>

    <div class="overlay-trans"></div>

    <?php /*
    <nav class="navbar navbar-default" role="navigation">
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-center">
            <li><a href="#">Left</a></li>
            <li><a href="#about">Left</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#about">Right</a></li>
            <li><a href="#contact">Right</a></li>
          </ul>
        </div>
      </div>
      <div class="sub-navbar">
        <div class="container">
        </div>
      </div>
    </nav>
    <? */ ?>

    <nav class="navbar" role="navigation">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="img/logo.png" class="img-responsive" alt="NoteBooster Logo" />
        </a>
        <div id="navbar">
          <ul class="nav navbar-nav navbar-center browsesell">
            <?php if($isorg) { ?>
              <li class="org-nav"><a href="donations">Donations</a></li>
              <li class="org-nav org-profile"><a href="organization-profile-settings">Profile</a></li>
              <li class="org-nav"><a href="payment-info">Payment Info</a></li>
            <?php } else { ?>
              <li><a href="browse-notes">Browse</a></li>
              <li><a href="new-note">Sell</a></li>
            <?php }; ?>
          </ul>
          <ul class="nav navbar-nav navbar-right status-bar">
            <?php if($_GET['status'] == 'logged-out'){ ?>
              <li class="sign-in"><a href="#" data-toggle="modal" data-target="#signin">Sign In</a></li>
              <li class="register"><a href="#" data-toggle="modal" data-target="#register">Register</a></li>
              <?php $modals->add('signin');
              $modals->add('register');
            } else { ?>
              <li class="dropdown profile">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                  <img src="img/profile.png" class="img-responsive" alt="Gricha2380 Profile Picture" />
                </a>
              <?php if($isorg) { ?>
                  <span>gricha2380</span>
                  <span class="user-email-minor">gricha2380@gmail.com</span>
                  <ul class="dropdown-menu" role="menu">
                    <li><a href="donations">Donations</a></li>
                    <li><a href="organization-profile-settings">Profile Settings</a></li>
                    <li><a href="messages">Messages <span class="notification">4</span></a></li>
                    <li><a href="payment-info">Payment Info</a></li>
                    <li><a href="password-settings">Passwords</a></li>
                    <li class="divider"></li>
                    <li><a href="contact-us">Contact Us</a></li>
                    <li class="divider"></li>
                    <li><a href="/?status=logged-out">Sign Out</a></li>
                  </ul>
                <?php } else { ?>
                  <span>gricha2380</span>
                  <span class="user-email-minor">gricha2380@gmail.com</span>
                  <ul class="dropdown-menu" role="menu">
                    <li><a href="notes-purchased">Notes Purchased</a></li>
                    <li><a href="notes-for-sale">Notes for Sale</a></li>
                    <li><a href="watch-list">Watch List</a></li>
                    <li><a href="messages">Messages <span class="notification">4</span></a></li>
                    <li class="divider"></li>
                    <li><a href="profile-settings">Edit Settings</a></li>
                    <li class="divider"></li>
                    <li><a href="contact-us">Contact Us</a></li>
                    <li class="divider"></li>
                    <li><a href="/?status=logged-out">Sign Out</a></li>
                  </ul>
                <?php }; ?>
              </li>
              <li class="notification"><a href="messages">4</a></li>
            <?php }; ?>
          </ul>
        </div><!--/.navbar-collapse -->
      </div>
      <div class="clearfix"></div>
      <div class="sub-navbar">
        <div class="container">
        </div>
      </div>
    </nav>
