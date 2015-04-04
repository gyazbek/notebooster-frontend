<?php

include ('inc/modals.php');

class DefaultModalsModel extends ModalModel {

  protected $defaultModals = array(

    'signin' => array(
      'title'       => 'Sign In',
      'subtitle'    => 'Lorem ipsum dolor sit amet, consectetuer.',
      'body'        => '<form method="post" action="">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" class="form-control" name="username" />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input  type="password" class="form-control" name="password" />
        </div>
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3">
            <button type="submit" class="btn btn-primary btn-block">Sign In</button>
          </div>
        </div>
        <p class="mtop15 text-center"><a href="#" data-dismiss="modal" data-toggle="modal" data-target="#register">No Account? Register Here!</a></p>
      </form>',
      'undermodal'  => '<a href="forgot-password">Forgot Password?</a>',
    ),

    'register' => array(
      'title'     => 'Register',
      'subtitle'    => 'Lorem ipsum dolor sit amet, consectetuer.',
      'body'      => '<form method="post" action="">
        <div class="form-group">
          <label for="reg-username">Username:</label>
          <input type="text" name="reg-username" class="form-control">
        </div>
        <div class="form-group">
          <label for="reg-password">Password:</label>
          <input type="password" name="reg-password" class="form-control">
        </div>
        <div class="form-group">
          <label for="reg-confirm-password">Confirm Password:</label>
          <input type="password" name="reg-confirm-password" class="form-control">
        </div>
        <div class="form-group">
          <label for="reg-email">Your Email:</label>
          <input type="text" name="reg-email" class="form-control">
        </div>
        <div class="form-group">
          <label for="reg-school">Your School:</label>
          <select class="school-select-box form-control" name="school" value="<?=$school?>"></select>
        </div>
        <label for="reg-confirm">
          <input type="checkbox" name="reg-confirm" id="reg-confirm">
          <span class="muted">I have read and agree to the Terms of Use</span>
        </label>
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2 mtop25">
            <button type="submit" class="btn btn-primary btn-block">Register</button>
          </div>
        </div></form>',
      'undermodal'   => '<a href="#" data-dismiss="modal" data-toggle="modal" data-target="#signin">Already registered? Sign in here.</a>',
    ),

    'buynow' => array(
      'title'     => '<div class="row"><div class="col-sm-6 col-xs-8 col-sm-offset-3 col-xs-offset-2"><img src="img/paypal.png" alt="PayPal Logo" class="img-responsive" /></div></div>',
      'subtitle'    => 'All payments are handled securely through PayPal.com (no PayPal account required).',
      'body'      => '<div class="row">
      <div class="col-xs-12 mbot15">
            <hr>
            <p class="text-center">$2 from this purchase will go to <strong>Who We Play For</strong>.</p>
            <p class="text-center buynow-drop"><i class="fa fa-caret-right"></i> <a href="#" data-toggle="collapse" data-target="#collapsedonation">Want to increase the donation?</a></p>
          </div>
          <div class="clearfix"></div>
          <div id="collapsedonation" class="collapse">
            <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-xs-offset-0">
              <div class="input-group mbot25">
                <span class="input-group-addon">$7.49 + </span>
                <input type="text" class="form-control" name="addon">
              </div>
            </div>
            <div class="clearfix"></div>
          </div>
          <hr class="mleft15 mright15">
          <div class="col-xs-6 mbot15">
            <p class="muted text-right">Price:</p>
            <p class="muted text-right">Service Fee:</p>
            <p class="muted text-right">Extra Donation:</p>
            <p class="text-right">Total:</p>
          </div>
          <div class="col-xs-6 mbot15">
            <p class="muted">$7.00</p>
            <p class="muted">$0.49</p>
            <p class="muted">$0.00</p>
            <p>$7.49</p>
          </div>
          <div class="clearfix"></div>

          <div class="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2">
            <a href="note-purchased-confirmation" type="submit" class="btn btn-primary btn-block">Buy Now</a>
          </div>
        </div>',
      'undermodal'   => '<a href="#" data-dismiss="modal" aria-label="Close">Cancel</a>',
    ),

    'contactus' => array(
      'title'     => 'Contact Us',
      'subtitle'    => 'Lorem ipsum dolor sit amet, consectetuer.',
      'body'      => '<form method="post" action="">
        <div class="form-group">
          <label for="cont-message">Message:</label>
          <textarea name="cont-message" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label for="cont-subject">Subject:</label>
          <select name="cont-subject" class="form-control">
            <option value="0">Message Subject</option>
          </select>
        </div>
        <div class="form-group">
          <label for="cont-name">Your Name:</label>
          <input type="text" name="cont-name" class="form-control">
        </div>
        <div class="form-group">
          <label for="cont-email">Your Email:</label>
          <input type="text" name="cont-email" class="form-control">
        </div>
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2 mtop15">
            <button type="submit" class="btn btn-primary btn-block">Send</button>
          </div>
        </div></form>',
      'undermodal'   => '',
    ),

    'violation' => array(
      'title'       => 'Report Violation',
      'subtitle'    => 'We take violations of our Terms & Policies very seriously. Please report this violation only if you have a strong certainty.',
      'body'        => '<form method="post" action="">
        <div class="form-group">
          <label for="vio-name">Your Name:</label>
          <input type="text" class="form-control" name="vio-name" />
        </div>
        <div class="form-group">
          <label for="vio-email">Email Address:</label>
          <input type="text" class="form-control" name="vio-email" />
        </div>
        <div class="form-group">
          <label for="vio-subject">Subject:</label>
          <select name="vio-subject" class="form-control">
            <option>Message Subject</option>
          </select>
        </div>
        <div class="form-group">
          <label for="vio-message">Message:</label>
          <textarea class="form-control" name="vio-message"></textarea>
        </div>
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3">
            <button type="submit" class="btn btn-primary btn-block">Submit Violation</button>
          </div>
        </div>
      </form>',
      'undermodal'  => '<a href="legal" target="blank">View NoteBooster Terms of Usage</a>',
    ),

    'contactseller' => array(
      'title'     => 'Compose Message',
      'subtitle'    => 'Lorem ipsum dolor sit amet, consectetuer.',
      'body'      => '<form method="post" action="">
        <label class="mbot15">To: NameOfSeller</label>
        <div class="form-group">
          <label for="cont-subject">Subject:</label>
          <input type="text" name="cont-subject" class="form-control">
        </div>
        <div class="form-group">
          <label for="cont-message">Message:</label>
          <textarea name="cont-message" class="form-control"></textarea>
        </div>
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2">
            <button type="submit" class="btn btn-primary btn-block">Send</button>
          </div>
        </div></form>',
      'undermodal'   => '',
    ),

    'composemessage' => array(
      'title'     => 'Compose Message',
      'subtitle'    => 'Lorem ipsum dolor sit amet, consectetuer.',
      'body'      => '<form method="post" action="">
        <label for="cont-to">To:</label>
          <input type="text" name="cont-to" class="form-control">
        <div class="form-group">
          <label for="cont-subject">Subject:</label>
          <input type="text" name="cont-subject" class="form-control">
        </div>
        <div class="form-group">
          <label for="cont-message">Message:</label>
          <textarea name="cont-message" class="form-control"></textarea>
        </div>
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2">
            <button type="submit" class="btn btn-primary btn-block">Send</button>
          </div>
        </div></form>',
      'undermodal'   => '',
    ),

    'info' => array(
      'title'     => 'Lorem ipsum dolor sit amet',
      'subtitle'    => 'Lorem ipsum dolor sit amet, consectetuer.',
      'body'      => '<hr class="mbot25">
        <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod
        mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis
        qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii
        legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem.</p>
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2 mtop15">
            <button type="submit" class="btn btn-primary btn-block">Button</button>
          </div>
        </div>',
      'undermodal'   => '',
    ),

    'ratenote' => array(
      'title'     => 'Rate This Note',
      'subtitle'    => 'Lorem ipsum dolor sit amet, consectetuer.',
      'body'      => '<form method="post" action="">
        <h4 class="mbot15">Title of Note Goes Here</h4>
        <div class="form-group">
          <label for="note-rating">Select Rating:</label>
          <select name="note-rating" class="form-control">
            <option value="0">Select Rating</option>
          </select>
        </div>
        <div class="form-group">
          <label for="note-feedback">Leave Feedback: <span class="muted">(Max 500 words)</span></label>
          <textarea name="note-feedback" class="form-control"></textarea>
        </div>
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2">
            <button type="submit" class="btn btn-primary btn-block">Send</button>
          </div>
        </div></form>',
      'undermodal'   => '<a href="#" data-dismiss="modal" aria-label="Close">Cancel</a>',
    ),

    'charityinfo' => array(
      'title'     => 'Charity Supported Note',
      'subtitle'    => 'Lorem ipsum dolor sit amet, consectetuer.',
      'body'      => '<p>Proceeds from this note are shared with:</strong></p>
        <h4>Who We Play For</h4>
        <p class="muted">Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.
        Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.</p>
        <div class="row">
          <div class="col-xs-8 col-xs-offset-2">
            <img src="http://placehold.it/400x300" class="img-responsive" alt="Organization Profile Picture" />
            <p class="mtop25 mbot15 text-center"><a href="organization-profile">View Organization Profile</a></p>
          </div>
          <div class="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2">
            <button class="btn btn-primary btn-block" data-dismiss="modal" aria-label="Close">Close</button>
          </div>
        </div>',
      'undermodal'   => '',
    ),

    'new-course' => array(
      'title'     => 'Add New Course',
      'subtitle'    => '',
      'body'      => '<form method="post" action="">
                        <div class="form-group">
                          <label for="course-title">Course Title:</label>
                          <input type="text" class="form-control" name="course-title" placeholder="eg: English Composition" />
                        </div>
                        <div class="form-group">
                          <label for="course-code">Course Code:</label>
                          <input type="text" class="form-control" name="course-code" placeholder="eg: ENC1101" />
                        </div>
                        <div class="form-group">
                          <label for="course-subject">Subject (optional):</label>
                          <select name="course-subject" class="form-control">
                            <option>Optional...</option>
                          </select>
                        </div>
                        <div class="row">
                          <div class="col-sm-6 col-sm-offset-3">
                            <button type="submit" class="btn btn-primary btn-block">Add Course</button>
                          </div>
                        </div>
                      </form>
                      ',
      'undermodal'   => '',
    ),

    'new-instructor' => array(
      'title'     => 'Add New Instructor',
      'subtitle'    => '',
      'body'      => '<form method="post" action="">
                        <div class="form-group">
                          <label for="instructor-name">Instructor Name:</label>
                          <input type="text" class="form-control" name="instructor-name" />
                        </div>
                        <div class="row">
                          <div class="col-sm-6 col-sm-offset-3">
                            <button type="submit" class="btn btn-primary btn-block">Add Instructor</button>
                          </div>
                        </div>
                      </form>
                      ',
      'undermodal'   => '',
    ),

    'promotenotes' => array(
      'title'     => 'Promote Your Notes',
      'subtitle'    => 'Lorem ipsum dolor sit amet, consectetuer.',
      'body'      => '<h4>Note: NameOfNoteHere</h4>
        <div class="row">
          <div class="col-xs-6 text-center mtop25 mbot50">
            <a href="http://www.twitter.com" target="_blank"><i class="fa fa-twitter promote"></i></a>
          </div>
          <div class="col-xs-6 text-center mtop25 mbot50">
            <a href="http://www.facebook.com" target="_blank"><i class="fa fa-facebook promote"></i></a>
          </div>
          <div class="clearfix"></div>
          <div class="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2">
            <button class="btn btn-primary btn-block" data-dismiss="modal" aria-label="Close">Close</button>
          </div>
        </div>',
      'undermodal'   => '',
    ),

    'followconfirm' => array(
      'title'     => 'Now Following UserName',
      'subtitle'    => '',
      'body'      => '<hr class="mtop25 mbot25">
        <p>You can unfollow by accessing the Watch List from your user menu.</p>
        <div class="row mtop25">
          <div class="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2">
            <button class="btn btn-primary btn-block" data-dismiss="modal" aria-label="Close">Close</button>
          </div>
        </div>',
      'undermodal'   => '',
    ),

    'charitysupport' => array(
      'title'     => 'Support a Charity',
      'subtitle'    => 'Lorem ipsum dolor sit amet, consectetuer.',
      'body'      => '<h4>Lorem ipsum dolor sit amet, consectetuer.</h4>
        <p class="muted">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod
        mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis
        qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii
        legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem.</p>
        <p class="muted">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod
        mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis
        qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii
        legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem.</p>
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2">
            <button type="submit" class="btn btn-primary btn-block" data-dismiss="modal" aria-label="Close">Close</button>
          </div>
        </div>',
      'undermodal'   => '',
    ),

    'charity-short-description' => array(
      'title'     => 'Organization Short Description',
      'subtitle'    => '',
      'body'      => '
        <p class="muted">The short description appears alongside notes which support your cause. It is a brief, Tweetable introduction to who you are.</p>
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2">
            <button type="submit" class="btn btn-primary btn-block" data-dismiss="modal" aria-label="Close">Close</button>
          </div>
        </div>',
      'undermodal'   => '',
    ),

    'charity-full-bio' => array(
      'title'     => 'Organization Full Bio',
      'subtitle'    => '',
      'body'      => '
        <p class="muted">The Full Bio is your opportunity to describe your organization at length. This will be visible on your public profile page.</p>
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2">
            <button type="submit" class="btn btn-primary btn-block" data-dismiss="modal" aria-label="Close">Close</button>
          </div>
        </div>',
      'undermodal'   => '',
    ),

      'charity-one-fact' => array(
      'title'     => 'Organization One Fact',
      'subtitle'    => '',
      'body'      => '
        <p class="muted">This is a brief statement visible to students after they make a donation. Use this area to provide a thought provoking statistic or fact about your cause.</p>
        <div class="row">
          <div class="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2">
            <button type="submit" class="btn btn-primary btn-block" data-dismiss="modal" aria-label="Close">Close</button>
          </div>
        </div>',
      'undermodal'   => '',
    ),

  );

};

?>