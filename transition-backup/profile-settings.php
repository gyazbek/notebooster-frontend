<?php include ('inc/header.php'); ?>

	<div class="container mtop25 pbot25">
		<div class="row">
			<div class="row">
				<div class="col-sm-9">
					<div class="results pad15 title-block outline">
						<h1>Profile Settings</h1>
						<p class="muted">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
						<div class="row mtop25">
							<div class="col-sm-3 col-sm-offset-0 col-xs-8 col-xs-offset-2 mtop25-xs">
								<img src="img/profile.png" alt="" class="img-responsive" alt="Gricha2380 Profile Picture" />
								<button class="btn btn-minor btn-block mtop25">Upload Image</button>
							</div>
							<div class="clearfix"></div>
							<hr>
						</div>
						<form>
							<div class="form-group">
								<label for="bio">Bio</label>
								<textarea name="bio" class="form-control"></textarea>
							</div>
							<hr>
							<div class="form-group">
								<label for="username">User Name</label>
								<input type="text" name="username" class="form-control">
							</div>
							<hr>
							<div class="form-group">
								<label for="default-school">Default School</label>
								<select class="school-select-box form-control" name="school"></select>
							</div>
							<div class="form-group">
								<label for="email">Email Address</label>
								<input type="text" name="email" class="form-control" />
							</div>
							<div class="form-group">
								<label for="notifications">
									<input type="checkbox" name="notifications" id="notifications" />
									Send notifications by email
								</label>
							</div>
							<hr>
							<div class="row">
								<div class="col-sm-6 col-sm-offset-3">
									<button type="submit" class="btn btn-block btn-primary">Save Settings</button>
								</div>
							</div>
							<hr>
							<p clas="text-center mtop25"><a href="#" data-toggle="modal" data-target="#deletemyaccount">Delete My Account</a></p>
							<?php $modals->overwriteAndAdd('info', 'deletemyaccount', array(
								title => 'Delete My Account?'
							)); ?>
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