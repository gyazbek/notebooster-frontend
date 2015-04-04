<?php include ('inc/header.php'); ?>
	<div class="container results mtop25 mbot25 outline">
		<section class="row">
			<div class="col-xs-12">
				<h1>Create New Note</h1>
				<p class="muted">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
			</div>
			<div class="col-md-8 col-sm-12 hr-right">

				<!-- Standar Form -->
				<h4>Select notes from your computer</h4>
				<form action="" method="post" enctype="multipart/form-data" id="js-upload-form">
					<div class="form-inline">
						<div class="form-group">
							<input type="file" name="files[]" id="js-upload-files" multiple>
						</div>
						<button type="submit" class="btn btn-sm btn-primary" id="js-upload-submit">Upload files</button>
					</div>
				</form>

				<!-- Drop Zone -->
				<div class="upload-drop-zone mtop15" id="drop-zone">
					...or drag and drop files here!
				</div>

				<!-- Upload Finished -->
				<div class="js-upload-finished">
					<h3>Processed files</h3>
					<div class="list-group"><p class="muted"><em>No uploaded files</em></p></div>
	          	</div>

				<form action="note-posted-confirmation" method="post">
		          	<div class="row">
		          		<div class="col-md-4">
		          			<label for="no_of_pages">Number of Pages:</label>
		          		</div>
		          		<div class="col-md-2 form-group">
		          			<input class="form-control" name="num_of_pages" /><div class="has-error-text" id="note-pages-error">Please state the number of pages.</div>
		          		</div>
		          		<div class="clearfix"></div>
		          		<div class="col-md-4">
		          			<label for="note_preview">Note Preview:</label>
		          		</div>
		          		<div class="col-md-4 form-group">
		          			<select class="form-control" name="note_preview">
		          				<option>First Page Only</option>
		          			</select>
		          		</div>
		          		<div class="clearfix"></div>
		          		<hr class="narrower">
		          		<div class="col-md-4">
		          			<label for="note_price">Note Price:</label>
		          		</div>
		          		<div class="col-md-5">
		          			<div class="input-group form-group">
							    <span class="input-group-addon"><i class="fa fa-dollar"></i></span>
			          			<input class="form-control note_price" name="note_price" placeholder="5.00" />
							    <span class="input-group-addon"> + $0.49 fee</span>
			          		</div>
			          		<div class="has-error-text mbot15" id="note-price-error">Please input a valid price.</div>
		          		</div>
		          		<div class="col-md-3 form-group">
			          		<label for="free_price">
				          		<input type="checkbox" name="free_price" id="free_price" /> Make it Free!
				          	</label>
		          		</div>
		          		<div class="clearfix"></div>
		          		<div class="col-md-4">
		          			<label for="charity_split">Charity Split:</label>
		          		</div>
		          		<div class="col-md-3 form-group">
		          			<select class="form-control" name="charity_split">
		          				<option>20%</option>
		          				<option>25%</option>
		          				<option>50%</option>
		          				<option>75%</option>
		          				<option>100%</option>
		          			</select>
		          		</div>
		          		<div class="col-md-5 form-group">
		          			<p class="muted">A portion of every sale is given to the nonprofit of your choosing.</p>
		          			<p><a href="#" data-toggle="modal" data-target="#charitysupport">Learn More</a></p>
							<?php $modals->add('charitysupport'); ?>
		          		</div>
		          		<div class="clearfix"></div>
		          		<div class="col-md-4">
		          			<label for="select_charity">Select Charity:</label>
		          		</div>
		          		<div class="col-md-8 form-group">
		          			<select class="form-control" name="select_charity">
		          				<option>Who We Play For</option>
		          			</select>
		          		</div>
		          		<div class="col-md-6 col-md-offset-12 form-group charity-description">
		          			<p class="muted">Who We Play For</p>
		          			<p class="muted">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidun</p>
		          		</div>
		          		<div class="clearfix"></div>
		          		<div class="col-md-8 col-md-offset-4 form-group">
		          			<p class="muted">You Make: $<text>0.00</text></p>
		          			<p class="muted">Charity Makes: $<text>0.00</text></p>
		          		</div>
		          		<div class="clearfix"></div>
		          		<hr class="narrower">
		          		<div class="col-xs-12 mbot15 form-group">
		          			<label for="note_title">Note Title: <span class="muted">(Max: 140 characters)</span></label>
		          			<input class="form-control" name="note_title" />
		          			<div class="has-error-text" id="title-error">Please write a title.<br>Title is too long.</div>
		          		</div>
		          		<div class="clearfix"></div>
		          		<div class="col-xs-12 form-group">
		          			<label for="note_description">Note Description:</label>
		          			<textarea class="form-control" name="note_description"></textarea>
		          			<div class="has-error-text" id="description-error">Please write a description.</div>
		          		</div>
		          		<div class="clearfix"></div>
		          		<hr class="narrower">
		          		<div class="col-md-4">
		          			<label for="school">School:</label>
		          		</div>
		          		<div class="col-md-8 form-group">
		          			<select class="school-select-box form-control" name="school" value="<?=$school?>"></select>
		          			<div class="has-error-text" id="school-error">Please select your school.</div>
		          		</div>
		          		<div class="clearfix mbot15"></div>
		          		<div class="col-md-4">
		          			<label for="semester">Semester:</label>
		          		</div>
		          		<div class="col-md-4 form-group">
		          			<select class="form-control" name="semester">
		          				<option>Select Semester</option>
		          				<option>Spring</option>
		          				<option>Summer</option>
		          				<option>Fall</option>
		          				<option>Winter</option>
		          			</select>
		          			<div class="has-error-text" id="semester-error">Please select a semester.</div>
		          		</div>
		          		<div class="col-md-4 form-group">
		          			<select class="form-control" name="semester-year">
		          				<option>2014</option>
		          				<option selected>2015</option>
		          				<option>2016</option>
		          			</select>
		          		</div>
		          		<div class="clearfix mbot15"></div>
		          		<div class="col-md-4">
		          			<label for="course">Course:</label>
		          		</div>
		          		<div class="col-md-8 form-group">
		          			<select class="courses-select-box form-control" name="course" value="<?=$course?>"></select>
		          			<div class="add-new">
		          				<p><a href="#" data-toggle="modal" data-target="#new-course">Don't see your Course in the list?</a></p>
		          				<?php $modals->add('new-course'); ?>
		          				<div class="has-error-text" id="course-error">Please identify the course.</div>
							</div>
		          		</div>
		          		<div class="clearfix mbot15"></div>
		          		<div class="col-md-4">
		          			<label for="professor">Professor:</label>
		          		</div>
		          		<div class="col-md-8 form-group">
		          			<select class="professor-select-box form-control" name="professor" value="<?=$professor?>"></select>
		          			<div class="add-new">
		          				<p><a href="#" data-toggle="modal" data-target="#new-instructor">Don't see your Professor in the list?</a></p>
		          				<?php $modals->add('new-instructor'); ?>
		          				<div class="has-error-text" id="description-error">Please identify the instructor.</div>
							</div>
		          		</div>
		          		<div class="clearfix"></div>
		          		<hr class="narrower">
		          		<div class="col-md-4">
		          			<label for="paypal_account">PayPal Account:</label>
		          		</div>
		          		<div class="col-md-8 form-group">
		          			<input class="form-control" name="paypal_account" />
		          			<span class="muted">All payments are delivered to you securely via Paypal. <br><a href="https://www.paypal.com/signup/account" target="_blank">Need an account?</a></span>
		          			<div class="has-error-text" id="paypal-error">Please input your Paypal email address.</div>
		          		</div>
		          		<div class="clearfix"></div>
		          		<hr class="narrower">
		          		<div class="col-md-12 form-group">
			          		<label for="agree_terms">
				          		<input type="checkbox" name="agree_terms" id="agree_terms" /> I have read and agree to the <a href="legal" target="blank">Terms of Use</a>
				          	</label>
		          		</div>
		          		<div class="clearfix"></div>
		          		<div class="col-md-12 form-group text-center mtop25 mbot50 form-action-holder">
		          			<a href="note-draft-confirmation" id="save" class="btn btn-minor col-sm-5">Save as Draft</a>
		          			<button type="submit" id="submit" class="btn btn-primary col-sm-5">Create!</button>
		          		</div>
		          	</div>
		          </form>

			</div>
			<div class="col-md-4 col-xs-12 mbot25">
				<p class="lead">TIPS FOR BETTER SALES</p>
				<p class="mbot15">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidun</p>
				<ul>
					<li>Lorem ipsum dolor sit amet</li>
					<li>Typi non habent claritatem insitam</li>
					<li>Saed diam nonummy nibh</li>
				</ul>
			</div>
		</section>
		<div class="clearfix"></div>
	</div>

<?php include ('inc/footer.php'); ?>

	<!-- REMOVE THIS FOR REAL PRODUCTION -->
	<!-- START TOGGLE -->
	<div style="width: 100%;position: fixed;margin-bottom: -40px;padding-right: 10px;text-align: right;top: 50%;"><span href="#" style="color:pink; cursor: pointer;" class="toggle-errors">[TOGGLE ALERTS]</span></div>
	<script type="text/javascript">
		$(".toggle-errors").click(function() {
   			$('.has-error-text').toggle();
   			$('.form-group').toggleClass('has-error');
		});

		$("#free_price").click(function() {
			$('.note_price').val('0.00').toggleClass('disabled');
   			$('.note_price').prop('disabled', function(i, v) { return !v; });
		});

	</script>
	<!-- END TOGGLE -->

