<?php include ('inc/header.php'); ?>

	<div class="container mtop25 pbot25">
		<div class="row">
			<div class="row">
				<div class="col-md-9">
					<div class="results pad15 outline">
						<section class="row vertical-align normalize-xs normalize-sm">
							<div class="col-md-6 col-xs-12 title-block">
								<h1>Watch List</h1>
								<p class="lead muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</div>
							<div class="col-xs-3 text-right mtop25-sm mbot25-sm">
								<p class="lead mbot0">42 Items</p>
							</div>
							<div class="col-md-3 col-xs-9 mtop25-sm mbot25-sm">
								<select class="form-control">
								<option '0'>Activity</option>
								<option '0'>Date Added</option>
							</select>
							</div>
						</section>
						<main class="row">
							<div class="col-xs-12">
								<?php for($r=1;$r<=5;$r++) { ?>
									<div class="row vertical-align lined">
										<div class="col-sm-2 col-xs-0 hidden-xs text-center">
											<div class="row">
												<div class="col-xs-10 col-xs-offset-1">
													<img src="img/profile.png" class="img-responsive" alt="Gricha2380 Profile Picture" />
												</div>
											</div>
											<p><a href="user-profile">GRicha2380</a></p>
										</div>
										<div class="col-xs-7 mtop15 mbot5">
											<p>Attends: FSU</p>
											<p>Joined: Feb. 11, 2015</p>
											<p>Notes: 42</p>
											<p>Rating:
												<i class="fa fa-star"></i>
												<i class="fa fa-star"></i>
												<i class="fa fa-star off"></i>
												<i class="fa fa-star off"></i>
												<i class="fa fa-star off"></i>
											</p>
										</div>
										<div class="col-sm-3 col-xs-5 text-center">
											<button class="btn btn-minor btn-block">Remove</button>
											<a href="user-profile" class="btn btn-primary btn-block">View Profile</a>
										</div>
									</div>
								<?php } ?>
							</div>
						</main>
						<footer class="row">
							<div class="col-sm-8 col-sm-offset-2 col-xs-12 text-center">
								<ul class="pagination mtop50 mbot50">
									<li><a href="#"><i class="fa fa-arrow-left"></i></a></li>
									<li class="active"><a href="#">1</a></li>
									<li><a href="#">2</a></li>
									<li><a href="#">3</a></li>
									<li><a href="#">4</a></li>
									<li><a href="#"><i class="fa fa-arrow-right"></i></a></li>
								</ul>
							</div>
						</footer>
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