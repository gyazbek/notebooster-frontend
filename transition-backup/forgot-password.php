<?php include ('inc/header.php'); ?>

	<div class="container results mtop25 mbot25 outline">
		<div class="row mtop25 mbot25">
			<form method="post" action="forgot-password-confirmation">
				<div class="col-xs-10 col-xs-offset-1 text-center">
					<h1>Forgot Password</h1>
					<p>Type your email address or username below to rest it.</p>
					<hr class="mtop25 mbot25">
				</div>
				<div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 form-group">
					<label for="forgot-email">Email Address or Username</label>
					<input type="email" name="forgot-email" class="form-control">
				</div>
				<div class="clearfix"></div>
				<div class="col-sm-3 col-sm-offset-3 col-xs-8 col-xs-offset-2 mtop25 mbot25">
					<a href="/" class="btn btn-minor btn-block">Cancel</a>
				</div>
				<div class="col-sm-3 col-sm-offset-0 col-xs-8 col-xs-offset-2 mtop25 mbot25 mtop0-xs">
					<button type="submit" class="btn btn-primary btn-block">Next</button>
				</div>
			</form>
		</div>
	</div>

<?php include ('inc/footer.php'); ?>