<?php include ('inc/header.php'); ?>

	<div class="container results mtop25 mbot25 outline">
		<h1>Frequently Asked Questions</h1>
		<p>We love questions! Below are the answers to what we believe are the most common questions from note buyers, sellers, and faculty members. If your question is not answered here then please feel free to Contact Us, Don't be shy!</p>
		<div class="row">
			<div class="col-xs-12">
				<h2>General</h2>
				<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
					<?php for($i=1;$i<=5;$i++) { ?>
						<div class="panel panel-default">
							<div class="panel-heading" role="tab" id="heading<?=$i?>">
								<h4 class="panel-title">
									<a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse<?=$i?>" aria-expanded="true" aria-controls="collapse<?=$i?>">
										Who is allowed to post notes?
									</a>
								</h4>
							</div>
							<div id="collapse<?=$i?>" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading<?=$i?>">
								<div class="panel-body">
									<p>As long as you have legal rights over the content you are posting, we encourage everyone to post notes!</p>
								</div>
							</div>
						</div>
					<?php }; ?>
				</div>
			</div>
		</div>
		<p class="text-center mtop50 mbot50">Still can't find the answer to your question? <a href="contact-us">Contact Us!</a></p>
	</div>

<?php include ('inc/footer.php'); ?>