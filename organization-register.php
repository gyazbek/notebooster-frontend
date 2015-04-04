<?php include ('inc/header.php'); ?>

	<div class="container results mtop25 mbot25 outline">
		<h1>Register Organization</h1>
		<p class="mbot50 muted">Lorem ipsum dolor sit amet, consectetuer.</p>

		<div class="row">
			<div class="col-sm-7">
				<form method="post" action="">

					<div class="row form-group">
						<div class="col-sm-6">
							<label for="org-name">Organization Name:</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" name="org-name">
						</div>
					</div>
					<div class="row form-group">
						<div class="col-sm-6">
							<label for="org-email">Email Address:</label>
						</div>
						<div class="col-sm-6">
							<input type="email" class="form-control" name="org-email">
						</div>
					</div>
					<div class="row form-group">
						<div class="col-sm-6">
							<label for="org-password">Password:</label>
						</div>
						<div class="col-sm-6">
							<input type="password" class="form-control" name="org-password">
						</div>
					</div>
					<div class="row form-group">
						<div class="col-sm-6">
							<label for="org-confirm-password">Confirm Password:</label>
						</div>
						<div class="col-sm-6">
							<input type="password" class="form-control" name="org-confirm-password">
						</div>
					</div>

					<hr class="mtop15 mbot25">

					<div class="row form-group">
						<div class="col-sm-6">
							<label for="org-person-name">Contact Person:</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" name="org-person-name">
						</div>
					</div>
					<div class="row form-group">
						<div class="col-sm-6">
							<label for="org-person-email">Contact Email:</label>
						</div>
						<div class="col-sm-6">
							<input type="email" class="form-control" name="org-person-email">
						</div>
					</div>

					<hr class="mtop15 mbot25">

					<div class="row form-group">
						<div class="col-sm-6">
							<label for="org-paypal">PayPal Account:</label>
						</div>
						<div class="col-sm-6">
							<input type="text" class="form-control" name="org-paypal">
						</div>
					</div>

					<hr class="mtop15 mbot25">

					<!-- Standar Form -->
					<h4>Organization Logo</h4>
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

					<hr class="mtop15 mbot25">

					<div class="form-group mbot50">
		          		<p class="pull-right"><a href="#" data-toggle="modal" data-target="#charity-short-description">What's this?</a></p>
		          		<?php $modals->add('charity-short-description'); ?>
		          		<!-- The short description appears alongside notes which support your cause. It's a brief introduction to your organization. -->
						<label for="org-short-description">Short Description: <span class="muted">(Max: 140 characters)</span></label>
						<textarea class="form-control" name="org-short-description"></textarea>
					</div>
					<div class="form-group mbot50">
						<p class="pull-right"><a href="#" data-toggle="modal" data-target="#charity-full-bio">What's this?</a></p>
						<?php $modals->add('charity-full-bio'); ?>
						<!-- The Full Bio is your opportunity to describe your organization at length. This will be visible on your public profile page. -->
						<label for="org-full-description">Full Bio: </label>
						<textarea class="form-control" name="org-full-description"></textarea>
					</div>
					<div class="form-group mbot50">
		          		<p class="pull-right"><a href="#" data-toggle="modal" data-target="#charity-one-fact">What's this?</a></p>
		          		<?php $modals->add('charity-one-fact'); ?>
		          		<!-- This is a brief statement visible to students after they make a donation. Use this area to provide a thought provoking statistic or fact about your cause. -->
						<label for="org-short-description">One Fact: <span class="muted">(Max: 320 characters)</span></label>
						<textarea class="form-control" name="org-short-description"></textarea>
					</div>

					<hr class="mtop15 mbot25">

					<label for="org-agree-tc">
						<input type="checkbox" name="org-agree-tc" id="org-agree-tc">
						I have read and agree to the <a href="legal">Terms of Use</a>
					</label>

					<hr class="mtop15 mbot25">

					<div class="row">
						<div class="col-sm-6 col-sm-offset-3">
							<button type="submit" class="btn btn-primary btn-block mbot25 mbot0-xs">Register</button>
						</div>
					</div>

				</form>
			</div>
			<div class="col-sm-5 mbot25">
				<h2>Lorem ipsum dolor sit amet</h2>
				<p>Ut wisi enim ad minim veniam, quis nostrud
					exerci tation ullamcorper suscipit lobortis nisl
					ut aliquip ex ea commodo consequat. </p>
				<p>Duis autem vel eum iriure dolor in hendrerit
					in vulputate velit esse molestie consequat</p>
				<p><a href="contact-us">Contact Us</a></p>
			</div>
		</div>

	</div>

<?php include ('inc/footer.php'); ?>