<?php include ('inc/header.php'); ?>

	<div class="container mtop25 pbot25">
		<div class="row">
			<div class="row">
				<div class="col-md-9">
					<div class="results pad15 outline">
						<section class="row vertical-align normalize-xs normalize-sm">
							<div class="col-md-6 col-xs-12 title-block">
								<h1>Notes For Sale</h1>
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
						<main class="row">
							<div class="col-xs-12">
								<?php for($r=1;$r<=5;$r++) { ?>
									<div class="row vertical-align normalize-xs lined">
										<div class="col-sm-8 col-xs-12 mtop15 mbot5">
											<div class="row">
												<div class="col-xs-12">
													<p class="lead mbot0"><a href="note-details">Title of Note File Goes Here</a></p>
												</div>
												<div class="col-sm-6 col-xs-4 mtop15 mbot5">
													<p>Price: $7.49</p>
													<p>Sales: N/A</p>
													<p>Revenue: N/A</p>
													<p>Charity Split: N/A</p>
												</div>
												<div class="col-sm-6 col-xs-8 mtop15 mbot5">
													<p class="visible-xs lead">$7.49</p>
													<p class="visible-xs muted">Provided by: <a href="user-profile">GRicha2380</a></p>
													<p>Date: Feb. 21, 2015</p>
													<p>Course: MAR4613</p>
													<p>Instructor: Ronald Goldsmith</p>
												</div>
											</div>
										</div>
										<div class="col-sm-4 col-xs-12 text-center form-group">
											<select class="form-control" name="note-status">
												<option value="Active">Active
											</select>
											<a href="new-note" class="btn btn-minor btn-block mtop5">Edit</a>
											<button class="btn btn-primary btn-block" data-toggle="modal" data-target="#promotenotes">Promote</button>
											<?php $modals->add('promotenotes'); ?>
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
						<header class="row ptop25 pbot25 bottom">
							<div class="col-xs-12 text-align">
								<p class="lead mbot0">Total Earnings: $42.00</p>
							</div>
						</header>
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