<?php $isorg = true; include ('inc/header.php'); ?>

	<div class="container mtop25 mbot25">
		<div class="row">
			<div class="row">
				<div class="col-md-9">
					<div class="results pad15 title-block outline">
						<h1>Profile Settings</h1>
						<a href="/organization-profile" class="pull-right" target="_blank">View Profile</a>
						<p class="muted mbot50">Lorem ipsum dolor sit amet, consectetuer.</p>
						<form method="post" action="">

							<div class="row form-group">
								<div class="col-sm-6">
									<label for="org-name">Organization Name:</label>
								</div>
								<div class="col-sm-6">
									<input type="text" class="form-control" name="org-name" id="org-name">
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
								<div class="col-sm-6 col-sm-offset-6">
									<label for="org-agree-tc">
										<input type="checkbox" name="org-agree-tc" id="org-agree-tc" checked="true">
										Send notification via email
									</label>
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

							<h2>Logo:</h2>

							<div class="row form-group">
								<div class="col-sm-3 col-xs-4">
									<img src="img/profile.png" class="img-responsive" alt="Organization Profile" />
								</div>
							</div>

							<!-- Standar Form -->
							<h4>Upload a new logo:</h4>
							<form action="" method="post" enctype="multipart/form-data" id="js-upload-form">
								<div class="form-inline">
									<div class="form-group">
										<input type="file" name="files[]" id="js-upload-files" multiple>
									</div>
									<button type="submit" class="btn btn-sm btn-primary" id="js-upload-submit">Upload files</button>
								</div>
							</form>

							<!-- Upload Finished -->
							<div class="js-upload-finished">
								<div class="list-group"><p class="muted"></p></div>
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

							<a href="#" data-toggle="modal" data-target="#info">Delete My Account</a>
							<?php $modals->add('info'); ?>

							<hr class="mtop15 mbot25">

							<div class="row">
								<div class="col-sm-6 col-sm-offset-3">
									<button type="submit" class="btn btn-primary btn-block mbot25 mbot0-xs">Save Settings</button>
								</div>
							</div>

						</form>
					</div>
				</div>
				<div class="col-md-3 col-sm-12 mtop25-sm mtop0-xs">
					<?php include 'inc/sidebar-organization.php'; ?>
				</div>
			</div>
		</div>
	</div>

<?php include ('inc/footer.php'); ?>