<?php $isorg = true; include ('inc/header.php'); ?>

	<div class="container mtop25 mbot25">
		<div class="row">
			<div class="row">
				<div class="col-md-9">
					<div class="results pad15 outline">
						<section class="row vertical-align normalize-xs normalize-sm">
							<div class="col-md-6 col-xs-12">
								<h1>Donations</h1>
								<p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</div>
							<div class="col-xs-3 text-right mtop25-sm mbot25-sm">
								<p class="lead mbot0">42 Items</p>
							</div>
							<div class="col-md-3 col-xs-9 mtop25-sm mbot25-sm">
								<select class="form-control" disabled>
									<option '0'>Sort by Date</option>
								</select>
							</div>
						</section>
						<div class="row">
							<div class="col-xs-12">
								<?php for($r=1;$r<=5;$r++) { ?>
									<div class="row lined">
										<div class="col-sm-2 col-xs-8">
											<p>Feb 21, 2015</p>
										</div>
										<div class="col-sm-2 col-xs-4">
											<p>$10.60</p>
										</div>
										<div class="col-sm-4 col-xs-12 text-center">
											<p><a href="note-details">Name of the Note File / Donor</a></p>
										</div>
										<div class="clearfix"></div>
									</div>
									<hr class="mtop0">
								<?php } ?>
							</div>
						</div>
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
						<header class="row ptop25 pbot25 bottom">
							<div class="col-xs-12 text-align">
								<p class="lead mbot0">Total Earnings: $42.00</p>
							</div>
						</header>
						<div class="clearfix"></div>
					</div>
				</div>
				<div class="col-md-3 col-sm-12 mtop25-sm mtop0-xs">
					<?php include 'inc/sidebar-organization.php'; ?>
				</div>
			</div>
		</div>
	</div>

<?php include ('inc/footer.php'); ?>