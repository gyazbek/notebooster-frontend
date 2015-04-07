<?php include ('inc/header.php'); ?>

	<div class="container mtop25 pbot25">
		<div class="row">
			<div class="row">
				<div class="col-md-9">
					<div class="results pad15 outline">
						<section class="row vertical-align normalize-xs normalize-sm title-block">
							<div class="col-md-6 col-xs-12">
								<h1>Messages</h1>
								<p class="lead muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</div>
							<div class="col-xs-3 text-right mtop25-sm mbot25-sm">
								<p class="lead mbot0">42 Items</p>
							</div>
							<div class="col-md-3 col-xs-9 mtop25-sm mbot25-sm">
								<select class="form-control">
									<option value="0">Newest First</option>
									<option value="0">Oldest First</option>
								</select>
							</div>
						</section>
						<header class="row bottom-align ptop15 pbot15">
							<p class="lead pull-left col-sm-3 col-xs-12 mbot0 inbox-outbox-holder">
								<a href="#inbox" aria-controls="inbox" role="tab" data-toggle="tab" class="toggle-link active">Inbox</a> -
								<a href="#outbox" aria-controls="outbox" role="tab" data-toggle="tab" class="toggle-link">Outbox</a>
							</p>

							<div class="col-sm-3 col-xs-12 pull-right mbot25-xs">
								<a class="btn btn-minor btn-block" data-toggle="modal" data-target="#composemessage">New Message</a>
							</div>
							<?php $modals->add('composemessage'); ?>
							<div class="clearfix"></div>
						</header>
						<main class="row tab-content">
							<div class="col-xs-12 tab-pane active" id="inbox" role="tabpanel">
								<!-- <h3 class="text-center">Inbox</h3> -->
								<?php for($r=1;$r<=5;$r++) { ?>
									<div class="row vertical-align normalize-xs lined">
										<div class="col-sm-2 col-xs-0 hidden-xs text-center">
											<div class="row mtop15">
												<div class="col-xs-10 col-xs-offset-1">
													<img src="img/profile.png" class="img-responsive" alt="Gricha2380 Profile Picture" />
												</div>
											</div>
											<p class="mtop15"><a href="user-profile">GRicha2380</a></p>
										</div>
										<div class="col-sm-5 col-xs-8 mtop15 mbot5">
											<p class="lead"><a href="view-message">Consectetuer adipiscing elit</a></p>
											<p class="visible-xs muted"><a href="user-profile">GRicha2380</a></p>
											<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
										</div>
										<div class="col-sm-2 col-xs-4 mtop15 mbot5 date-item">
											<p>Feb 20th, 2015</p>
										</div>
										<div class="col-sm-3 col-xs-12 text-center mbot25-xs">
											<button class="btn btn-minor btn-block">Delete</button>
											<a href="view-message" class="btn btn-primary btn-block">View</a>
										</div>
									</div>
								<?php } ?>
							</div>
							<div class="col-xs-12 tab-pane" id="outbox" role="tabpanel">
								<!-- <h3 class="text-center">Outbox</h3> -->
								<?php for($r=1;$r<=5;$r++) { ?>
									<div class="row vertical-align normalize-xs lined">
										<div class="col-sm-2 col-xs-0 hidden-xs text-center">
											<div class="row mtop15">
												<div class="col-xs-10 col-xs-offset-1">
													<img src="img/profile.png" class="img-responsive" alt="Gricha2380 Profile Picture" />
												</div>
											</div>
											<p class="mtop15"><a href="user-profile">GRicha2380</a></p>
										</div>
										<div class="col-sm-5 col-xs-8 mtop15 mbot5">
											<p class="lead"><a href="view-message">Consectetuer adipiscing elit</a></p>
											<p class="visible-xs muted"><a href="user-profile">GRicha2380</a></p>
											<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
										</div>
										<div class="col-sm-2 col-xs-4 mtop15 mbot5 date-item">
											<p>Feb 20th, 2015</p>
										</div>
										<div class="col-sm-3 col-xs-12 text-center mbot25-xs">
											<button class="btn btn-minor btn-block">Delete</button>
											<a href="view-message" class="btn btn-primary btn-block">View</a>
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