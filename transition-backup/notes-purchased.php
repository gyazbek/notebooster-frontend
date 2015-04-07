<?php include ('inc/header.php'); ?>

	<div class="container mtop25 pbot25">
		<div class="row">
			<div class="row">
				<div class="col-md-9">
					<div class="results pad15 outline">
						<section class="row vertical-align normalize-xs normalize-sm">
							<div class="col-md-6 col-xs-12 title-block">
								<h1>Notes Purchased</h1>
								<p class="lead muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</div>
							<div class="col-xs-3 text-right mtop25-sm mbot25-sm">
								<p class="lead mbot0">42 Items</p>
							</div>
							<div class="col-md-3 col-xs-9 mtop25-sm mbot25-sm">
								<select class="form-control">
									<option '0'>Newest First</option>
									<option '0'>Lowest Price</option>
									<option '0'>Highest Price</option>
								</select>
							</div>
						</section>
						<main class="row less-spacing">
							<div class="col-xs-12">
								<?php for($r=1;$r<=5;$r++) { ?>
									<div class="row vertical-align normalize-xs lined">
										<div class="col-sm-2 col-xs-0 hidden-xs text-center">
											<div class="row">
												<div class="col-xs-10 col-xs-offset-1">
													<img src="img/profile.png" class="img-responsive" alt="Profile Picture" />
												</div>
											</div>
											<p class="mtop15"><a href="user-profile">GRicha2380</a></p>
										</div>
										<div class="col-sm-2 col-xs-0 hidden-xs">
											<p class="large muted hidden-xs text-center">$7.49</p>
										</div>
										<div class="col-md-5 col-sm-7 col-xs-12 mtop15 mbot5">
											<p class="lead"><a href="note-details">Title of Note File Goes Here</a></p>
											<p class="visible-xs lead">$7.49</p>
											<p class="visible-xs muted">Provided by: <a href="user-profile">GRicha2380</a></p>
											<p>Date: Feb. 21, 2015</p>
											<p>Course: MAR4613</p>
											<p>Instructor: Ronald Goldsmith</p>
										</div>
										<div class="col-sm-3 col-xs-12 text-center mtop5 mbot5 mtop25-xs">
											<button class="btn btn-minor btn-block" data-toggle="modal" data-target="#ratenote">Rate</button>
											<button class="btn btn-primary btn-block">Download <i class="fa fa-arrow-down"></i></button>
											<?php $modals->add('ratenote'); ?>
											<p class="muted mtop15"><i class="fa fa-heart-o"> For Charity</i></p>
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