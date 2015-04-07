<?php include ('inc/header.php'); ?>

	<div class="container results mtop25 mbot25 outline">
		<h1>Contact Us</h1>
		<p class="muted">Tell us whatever is on your mind. We welcome all feedback.</p>
		<h2>Category Title</h2>
		<p><strong>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</strong></p>
		<p>Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes
			demonstraverunt lectores legere me lius quod ii legunt saepius. Typi non habent claritatem insitam; est
			usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius
			quod ii legunt saepius. Claritas est etiam processus dynamicus</p>

		<hr class="mtop25 mbot15">
		<h2>Category Title</h2>

		<div class="alert alert-success">
				<a href="#" class="close" data-dismiss="alert">&times;</a>
				<strong>Success!</strong> Your message has been sent successfully.
		</div>

		<div class="row">
			<div class="col-sm-6 col-sm-offset-3">
				<form method="post" action="">
					<div class="form-group">
						<label for="cont-message">Message:</label>
						<textarea name="cont-message" class="form-control"></textarea>
					</div>
					<div class="form-group">
						<label name="cont-subject">Subject:</label>
						<select class="form-control" name="cont-subject">
							<option value="0">Please select a subject</option>
							<option>Idea</option>
							<option>Problem</option>
							<option>Question</option>
							<option>Praise</option>
						</select>
					</div>
					<div class="form-group">
						<label for="cont-name">Your Name:</label>
						<input type="text" name="cont-name" class="form-control" />
					</div>
					<div class="form-group">
						<label for="cont-email">Your Email:</label>
						<input type="email" name="cont-email" class="form-control" />
					</div>
						<div class="row">
							<div class="col-sm-6 col-sm-offset-3">
								<button type="submit" class="btn btn-primary btn-block">Send</button>
							</div>
						</div>
				</form>
			</div>
		</div>

		<hr class="mtop25 mbot15">
		<h2>Office Location</h2>

		<div class="row mtop25 mbot25">
			<div class="col-sm-10">
				<div class="row">
					<div class="col-sm-4 col-xs-12">
						<p class="lead mbot15">Nam liber tempor</p>
						<p>Main Office</p>
						<p>000-000-0000</p>
						<p>email@email.com</p>
					</div>
					<div class="col-sm-4 col-xs-12">
						<p class="lead mbot15">Nam liber tempor</p>
						<p>Main Office</p>
						<p>000-000-0000</p>
						<p>email@email.com</p>
					</div>
					<div class="col-sm-4 col-xs-12">
						<p class="lead mbot15">Nam liber tempor</p>
						<p>Main Office</p>
						<p>000-000-0000</p>
						<p>email@email.com</p>
					</div>
				</div>
			</div>
		</div>

	</div>

<?php include ('inc/footer.php'); ?>