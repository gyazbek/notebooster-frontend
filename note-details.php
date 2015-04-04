<?php include ('inc/header.php'); ?>

	<div class="container results mtop25 mbot25 outline">
		<section class="row">
			<div class="col-md-9 col-sm-12">
				<h1>Title of Note Files Goes Here</h1>
				<p class="muted">Florida State University / ENC1101 - English Composition</p>
				<div class="row">
					<div class="col-sm-7 col-xs-12 mbot25">
						<img src="http://placehold.it/900x1100" class="img-responsive" alt="Note Snapshot" />
						<p class="large text-center mbot25 mtop25 visible-sm visible-xs">Price: $7.49</p>
						<button class="btn btn-primary btn-block mbot25 visible-sm visible-xs" data-toggle="modal" data-target="#buynow">Buy Now</button>
						<main class="col-xs-12 mbot25 visible-xs visible-sm">
							<p class="muted mbot15 mtop25-sm">NOTE PURCHASE SUPPORTS</p>
							<img src="http://placehold.it/400x200" class="img-responsive" alt="Charity Picture" />
							<p class="mtop15 mbot25 text-center"><a href="#" data-toggle="modal" data-target="#charityinfo">Learn More</a></p>
						</main>
						<p class="text-center mtop15">
							<a href="#" data-toggle="modal" data-target="#violation">Report Violation</a> | <a href="#" data-toggle="modal" data-target="#contactseller">Contact Seller</a>
							<?php $modals->add('violation'); ?>
							<?php $modals->add('contactseller'); ?>
						</p>
					</div>
					<div class="col-sm-5 col-xs-12 mbot25">
						<div class="row">
							<div class="col-xs-4 text-center">
								<img src="img/profile.png" class="img-responsive" alt="Gricha2380 Profile Picture" />
							</div>
							<p>By: <a href="user-profile">GRicha2380</a></p>
							<p>Attends: FSU</p>
							<p>Joined: Feb 11, 2015</p>
							<div class="clearfix"></div>
							<div class="col-xs-12 text-center">
								<button class="btn btn-minor btn-block mtop25-xs" data-toggle="modal" data-target="#followconfirm">Follow</button>
								<?php $modals->add('followconfirm'); ?>
							</div>
						</div>
						<hr>
						<div class="row">
							<div class="col-xs-12">
								<div class="fb-like" data-layout="button" data-action="like" data-show-faces="false" data-share="false"></div>
								<h2>File Info</h2>
							</div>
							<div class="col-xs-5">
								<p>Created:</p>
								<p>Term:</p>
								<p>Pages:</p>
								<p>Format:</p>
								<p>Purchases:</p>
								<p>Rating:</p>
							</div>
							<div class="col-xs-7">
								<p>March 15, 2014</p>
								<p>Spring 2014</p>
								<p>12</p>
								<p>Docx</p>
								<p>12</p>
								<p>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star off"></i>
									<i class="fa fa-star off"></i>
									<i class="fa fa-star off"></i>
								</p>
							</div>
						</div>
						<hr>
						<h2>Details</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et risus pellentesque, sagittis
							lacus eu, eleifend ipsum. Etiam eget maximus massa. Aenean vitae diam convallis, dapibus est eget,
							tincidunt augue. Aliquam vel consectetur nibh. Nullam leo sapien, fermentum nec nisl vitae, vehicula
							consectetur mauris. Aliquam augue purus, cursus id pellentesque ac, venenatis nec tortor.
							Vivamus commodo consectetur nulla, quis sollicitudin risus laoreet ut.</p>
					</div>
				</div>
				<div class="comments-holder">
					<hr>
					<h2>Comments</h2>
					<?php for($r=1;$r<=3;$r++) {
						include 'inc/comment.php';
					}; ?>
				</div>
			</div>
			<div class="col-md-3 col-sm-12 price-holder-details">
				<main class="col-xs-12 mbot25 hidden-sm hidden-xs">
					<p class="lead text-center mtop25">Price: $7.49</p>
					<button class="btn btn-primary btn-block" data-toggle="modal" data-target="#buynow">Buy Now</button>
					<hr class="dotted mtop25 mbot25">
					<p class="muted mbot15 mtop25-xs">NOTE PURCHASE SUPPORTS</p>
					<img src="http://placehold.it/400x200" class="img-responsive" alt="Charity Picture" />
					<p class="mtop15 mbot25 text-center"><a href="#" data-toggle="modal" data-target="#charityinfo">Learn More</a></p>
				</main>
			</div>
		</section>
		<?php $modals->add('buynow'); ?>
		<?php $modals->add('charityinfo'); ?>
		<div class="clearfix"></div>
	</div>

<?php include ('inc/footer.php'); ?>