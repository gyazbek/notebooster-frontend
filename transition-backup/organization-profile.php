<?php include ('inc/header.php'); ?>

	<div class="container results mtop25 mbot25 outline">
		<h1>Who We Play For</h1>

		<div class="row">
			<div class="col-sm-2">
				<img src="http://placehold.it/400x250" class="img-responsive" alt="Organization Profile Picture" />
			</div>
			<div class="col-sm-7">
				<p>
					<div class="fb-like" data-layout="button" data-action="like" data-show-faces="false" data-share="false"></div>
				</p>
				<p>Joined: Feb 11, 2015</p>
				<p>Website: <a href="#">www.WhoWePlayFor.org</a></p>
			</div>
			<div class="col-sm-3">
				<button class="btn btn-minor btn-block mbot25" data-toggle="modal" data-target="#contactus">Contact</button>
				<a href="http://www.PayPal.com" target="_blank" class="btn btn-primary btn-block">Donate</a>
				<?php $modals->add('contactus'); ?>
			</div>
		</div>

		<hr class="mtop25 mbot25">

		<h2>About</h2>
		<p>Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes
			demonstraverunt lectores legere me lius quod ii legunt saepius. Typi non habent claritatem insitam; est
			usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius
			quod ii legunt saepius. Claritas est etiam processus dynamicus</p>

		<hr class="mtop25 mbot25">
		<div class="text-center mbot25">
			<h1>One Fact</h1>
			<p>Brought to you by <a>Name of Organization</a></p>
			<main id="one-fact">
				<p class="muted mtop25-xs">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
			</main>
		</div>
		<hr class="mtop25 mbot25">
		<h2>Things to Know</h2>
		<ul class="mbot25">
			<?php for($r=1;$r<=5;$r++) { ?>
				<li><p>Investigationes demonstraverunt lectores legere me lius</p></li>
			<?php } ?>
		</ul>
	</div>

<?php include ('inc/footer.php'); ?>