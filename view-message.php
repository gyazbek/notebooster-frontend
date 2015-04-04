<?php include ('inc/header.php'); ?>

	<div class="container mtop25 pbot25">
		<div class="row">
			<div class="row">
				<div class="col-md-9">
					<div class="results pad15 outline">
						<section class="row vertical-align normalize-xs normalize-sm">
							<div class="col-xs-12 title-block">
								<h1>Message Details</h1>
							</div>
						</section>

						<header class="row bottom-align ptop15 pbot15">
							<div class="col-sm-2 col-sm-offset-0 col-xs-8 col-xs-offset-2">
								<a href="messages" class="btn btn-block btn-minor">Go Back</a>
							</div>
							<div class="clearfix"></div>
						</header>

						<section class="row vertical-align normalize-xs normalize-sm mtop25">
							<div class="col-xs-12">
								<div class="row mtop15 mbot15">
									<div class="col-sm-2 col-xs-3 text-center">
										<img src="img/profile.png" class="img-responsive" alt="Road Warrior Profile Picture" />
										<a href="user-profile">Road Warrior</a>
									</div>
									<div class="col-sm-10 col-xs-9">
										<div class="row">
											<div class="col-sm-6 col-xs-12">
												<p class="lead">Consectetuer adipiscing elit</p>
											</div>
											<div class="col-sm-6 col-xs-12 text-right">
												<p>Feb 20th, 2015</p>
											</div>
										</div>
										<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
											nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
											Ut wisi enim ad minim veniam.</p>
									</div>
								</div>
								<div class="clearfix"></div>
								<div class="row mtop15 mbot15 muted">
									<div class="col-sm-2 col-xs-3 text-center">
										<img src="img/profile.png" class="img-responsive" alt="Gricha2380 Profile Picture" />
										Me
									</div>
									<div class="col-sm-10 col-xs-9">
										<div class="row">
											<div class="col-sm-6 col-xs-12">
												<p class="lead">Consectetuer adipiscing elit</p>
											</div>
											<div class="col-sm-6 col-xs-12 text-right">
												<p>Feb 20th, 2015</p>
											</div>
										</div>
										<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
											nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
											Ut wisi enim ad minim veniam.</p>
									</div>
								</div>
								<hr>
								<div class="clearfix"></div>
								<form method="post" action="">
									<div class="row mtop15 mbot15 muted">
										<div class="col-sm-2 col-xs-0 hidden-xs text-center">
											<img src="img/profile.png" class="img-responsive" alt="Gricha2380 Profile Picture" />
											Me
										</div>
										<div class="col-sm-10 col-xs-9 form-group">
											<label for="reply">Write a Reply:</label>
											<textarea name="reply" class="form-control"></textarea>
										</div>
										<div class="clearfix"></div>
										<div class="col-sm-3 col-sm-offset-6 col-xs-12">
											<a href="messages" class="btn btn-minor btn-block">Cancel</a>
										</div>
										<div class="col-sm-3 col-xs-12">
											<button type="submit" href="messages" class="btn btn-primary btn-block">Send</button>
										</div>
									</div>
								</form>
							</div>
						</section>
						<div class="clearfix"></div>
					</div>
				</div>
				<div class="col-md-3 col-sm-12 mtop25-sm mtop0-xs">
					<?php include 'inc/sidebar.php'; ?>
				</div>
			</div>
		</div>
	</div>

<?php include ('inc/footer.php'); ?>