<?php include ('inc/header.php'); ?>

	<div class="container mtop25 pbot25">
		<div class="row">
			<div class="row">
				<div class="col-sm-9">
					<div class="results pad15 title-block outline">
						<h1>Password Settings</h1>
						<p class="muted">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
						<form method="post" action="" class="mtop50">
							<div class="form-group">
								<label for="current-password">Current Password</label>
								<input type="password" name="current-password" class="form-control" />
							</div>
							<div class="form-group">
								<label for="new-password">New Password</label>
								<input type="password" name="new-password" class="form-control" />
							</div>
							<div class="form-group">
								<label for="confirm-password">Confirm Password</label>
								<input type="password" name="confirm-password" class="form-control" />
							</div>
							<hr>
							<div class="row">
								<div class="col-sm-6 col-sm-offset-3 mbot25">
									<button type="submit" class="btn btn-block btn-primary">Save Settings</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div class="col-sm-3">
					<?php include 'inc/sidebar.php'; ?>
				</div>
			</div>
		</div>
	</div>

<?php include ('inc/footer.php'); ?>