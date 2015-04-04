<?php include ('inc/header.php'); ?>

	<div class="container results mtop25 mbot25 outline">
		<div class="row vertical-align normalize-xs">
			<div class="col-sm-2 col-xs-3 text-center mtop25-xs">
				<img class="img-responsive" src="img/profile.png" alt="Gricha2380 Profile Picture" />
				<span class="mtop15"><a href="#" data-toggle="modal" data-target="#violation">Report Violation</a></span>
				<?php $modals->add('violation'); ?>
			</div>
			<div class="col-sm-7 col-xs-9 mbot25-xs">
				<h1>GRicha2380</h1>
				<div class="fb-like" data-layout="button" data-action="like" data-show-faces="false" data-share="false"></div>
				<p>Attends: FSU</p>
				<p>Joined: Feb 11, 2015</p>
				<p>Sales: 495</p>
				<p>Rating:
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star off"></i>
					<i class="fa fa-star off"></i>
					<i class="fa fa-star off"></i>
				</p>
			</div>
			<div class="clearfix visible-xs"></div>
			<div class="col-sm-3 col-xs-12">
				<a href="#" class="btn btn-minor btn-block" data-toggle="modal" data-target="#followconfirm">Follow</a>
				<a href="#" class="btn btn-primary btn-block" data-toggle="modal" data-target="#contactseller">Contact</a>
				<?php $modals->add('followconfirm'); ?>
				<?php $modals->add('contactseller'); ?>
			</div>
		</div>
		<div class="clearfix"></div>
		<hr class="mtop25">
		<h2>Bio</h2>
		<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
			dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
			suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in
			vulputate velit esse molestie consequat</p>
		<div class="clearfix"></div>
		<div class="clearfix"></div>
		<hr class="mtop25">
		<div class="row vertical-align mtop50 mbot25">
			<div class="col-sm-12 text-center">
				<p class="lead">
					<a href="#posted" aria-controls="posted" role="tab" data-toggle="tab">Notes Posted: 42</a> |
					<a href="#comments" aria-controls="comments" role="tab" data-toggle="tab">Comments: 10</a>
				</p>
			</div>
		</div>
		<hr>
		<div class="tab-content">
			<div class="tab-pane active" id="posted" role="tabpanel">
				<h2>Notes Posted</h2>
				<?php for($r=1;$r<=3;$r++) { ?>
					<main class="row vertical-align lined less-spacing">
						<div class="col-sm-2 col-xs-0 hidden-xs text-center">
							<div class="row mtop5">
								<div class="col-sm-10 col-sm-offset-1">
									<a href="user-profile">
										<img src="img/profile.png" class="img-responsive" alt="Profile Image" />
									</a>
								</div>
							</div>
							<p class="hidden-xs text-center mtop5"><a href="user-profile">GRicha2380</a></p>
						</div>
						<div class="col-sm-2 col-xs-0 hidden-xs">
							<p class="large muted hidden-xs text-center">$7.49</p>
						</div>
						<div class="col-sm-6 col-xs-8 mtop15 mbot5">
							<p class="lead"><a href="note-details">Title of Note File Goes Here</a></p>
							<p class="visible-xs">$7.49</p>
							<p class="visible-xs">Provided by: <a href="user-profile">GRicha2380</a></p>
							<p>Date: Feb. 21, 2015</p>
							<p>Course: MAR4613</p>
							<p>Instructor: Ronald Goldsmith</p>
						</div>
						<div class="col-sm-2 col-xs-4 text-center">
							<a class="btn btn-primary btn-block" href="note-details">Details</a>
							<p class="muted mtop15"><i class="fa fa-heart-o"> For Charity</i></p>
						</div>
					</main>
				<?php } ?>
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
			</div>
			<div class="tab-pane" id="comments" role="tabpanel">
				<h2>Comments</h2>
				<?php for($r=1;$r<=3;$r++) {
					include 'inc/comment.php';
				}; ?>
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
			</div>
		</div>
	</div>

<?php include ('inc/footer.php'); ?>