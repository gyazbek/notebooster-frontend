<?php include ('inc/header.php');
if(isset($_POST['school'])) $school = $_POST['school'];
if(isset($_POST['course'])) $course = $_POST['course'];
?>

	<div class="container results mtop25 mbot25 outline">
		<form method="post" action="">
			<header class="row bottom-align ptop25 pbot25 top-search">
				<div class="col-sm-5 col-xs-12 form-group text-center">
					<label>School</label>
					<select class="school-select-box form-control" name="school" value="<?=$school?>"></select>
				</div>
				<div class="col-sm-5 col-xs-12 form-group text-center">
					<label>Course</label>
					<select class="courses-select-box form-control" name="course" value="<?=$course?>"></select>
				</div>
				<div class="col-sm-2 col-xs-12 form-group search-group">
					<button type="submit" class="btn btn-block btn-notes">Search</button>
				</div>
				<div class="clearfix"></div>
			</header>
		</form>
		<section class="row  vertical-align">
			<div class="col-sm-8 col-xs-6">
				<h1>11 Results</h1>
				<p class="lead muted">for MAR3023 - Basic Marketing Concepts at Florida State University</p>
			</div>
			<div class="col-md-4 col-sm-4 col-xs-6">
				<select class="form-control">
					<option '0'>Newest First</option>
					<option '0'>Lowest Price</option>
					<option '0'>Highest Price</option>
				</select>
				<div class="clearfix"></div>
			</div>
			<div class="clearfix"></div>
		</section>
		<main class="row">
			<div class="col-xs-12">
				<?php for($r=1;$r<=5;$r++) { ?>
					<div class="row vertical-align normalize-xs lined">
						<div class="col-md-2 col-sm-3 col-xs-0 hidden-xs text-center">
							<div class="row mtop5">
								<div class="col-sm-10 col-sm-offset-1">
									<a href="user-profile">
										<img src="img/profile.png" class="img-responsive" alt="Profile Image" />
									</a>
								</div>
							</div>
							<p class="hidden-xs text-center mbot5"><a href="user-profile">GRicha2380</a></p>
						</div>
						<div class="col-md-1 col-sm-0 hidden-sm hidden-xs">
							<p class="large muted hidden-xs text-center">$7.49</p>
						</div>
						<div class="col-sm-6 col-xs-12 mtop5 mbot15-xs less-spacing">
							<p class="lead"><a href="note-details">Title of Note File Goes Here</a></p>
							<p class="visible-sm visible-xs">$7.49</p>
							<p class="visible-xs">Provided by: <a href="user-profile">GRicha2380</a></p>
							<p>Date: Feb. 21, 2015</p>
							<p>Course: MAR4613</p>
							<p>Instructor: Ronald Goldsmith</p>
						</div>
						<div class="col-md-2 col-sm-3 col-xs-12 text-center">
							<a class="btn btn-primary btn-block" href="note-details">Details</a>
							<p class="muted mtop15"><i class="fa fa-heart-o"> For Charity</i></p>
						</div>
					</div>
				<?php } ?>
				<div class="clearfix"></div>
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

<?php include ('inc/footer.php'); ?>