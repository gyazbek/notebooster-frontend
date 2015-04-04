<?php include ('inc/header.php'); ?>

	<div class="container mtop25 pbot25">
		<div class="row">
			<div class="row">
				<div class="col-sm-9">
					<div class="results pad15 title-block outline">
						<h1>Payment Info</h1>
						<p class="muted">A PayPal account is required to receive payment for note sales.</p>
						<div class="row mtop50">
							<div class="col-sm-4 col-xs-6">
								<img src="img/paypal.png" alt="PayPal Logo" class="img-responsive">
							</div>
						</div>
						<form method="post" action="">
							<div class="form-group">
								<label for="paypal">PayPal Account</label>
								<input type="text" name="paypal" class="form-control" />
								<p class="mtop25 mbot15"><a href="https://www.paypal.com/webapps/mpp/account-setup">Click here to create a PayPal Account</a></p>
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