<?php include ('inc/header.php'); ?>
<div>
	<div class="container">
		<div class="row mtop100 mbot200 mtop50-xs mbot100-xs">
			<div class="col-md-10 col-md-offset-1">
				<p class="lead text-center thin">Lorem ipsum dolor sit amet, consectetuer adipiscing.</p>
				<form method="post" action="browse-notes">
					<div class="col-xs-10 col-xs-offset-1">
						<div class="row home-notes">
							<div class="col-sm-6 form-group thin text-center">
								<label>Choose your school</label>
								<select class="school-select-box form-control" name="school"></select>
							</div>
							<div class="col-sm-6 form-group thin text-center">
								<label>Choose your course</label>
								<select class="courses-select-box form-control" name="course"></select>
							</div>
							<div class="clearfix"></div>
							<div class="col-xs-12">
								<button type="submit" class="btn btn-block btn-notes thin">Browse Notes</button>
							</div>
						</div>
					</div>
				</form>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>

	<div class="overlay-dark middle-bar">
	    <div class="container">
	    	<div class="row mtop15 mbot15 text-center">
	    		<div class="col-sm-4 col-sm-offset-0 col-xs-4 col-xs-offset-0">
	    			<div class="row">
	    				<div class="col-sm-4 col-sm-offset-4">
	    					<img src="img/icon-buy.png" class="img-responsive" alt="Buy Notes" />
			    		</div>
		    		</div>
	    			<p class="lead thin">Buy Notes</p>
	    		</div>
	    		<div class="col-sm-4 col-sm-offset-0 col-xs-4 col-xs-offset-0">
	    			<div class="row">
	    				<div class="col-sm-4 col-sm-offset-4">
	    					<img src="img/icon-sell.png" class="img-responsive" alt="Sell Notes" />
			    		</div>
		    		</div>
	    			<p class="lead thin">Sell Notes</p>
	    		</div>
	    		<div class="col-sm-4 col-sm-offset-0 col-xs-4 col-xs-offset-0">
	    			<div class="row">
	    				<div class="col-sm-4 col-sm-offset-4">
	    					<img src="img/icon-support.png" class="img-responsive" alt="Support a Cause" />
			    		</div>
		    		</div>
	    			<p class="lead thin">Support a Cause</p>
	    		</div>
				<div class="clearfix"></div>
	    	</div>
	    </div>
	</div>
	<div class="overlay-light mbot-25">
	    <div class="container" id="lower-content">
	    	<div class="row">
    			<div class="col-xs-12 mtop25">
    				<h2>What is NoteBooster?</h2>
    				<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas.</p>
    				<p><a href="about-us">Learn More</a></p>
    				<hr class="mbot25">
    				<h2>Partnering Organizations</h2>
    			</div>
				<div class="clearfix"></div>
    			<div class="col-xs-4">
    				<img src="http://placehold.it/500x300" class="img-responsive" alt="" />
    			</div>
    			<div class="col-xs-4">
    				<img src="http://placehold.it/500x300" class="img-responsive" alt="" />
    			</div>
    			<div class="col-xs-4">
    				<img src="http://placehold.it/500x300" class="img-responsive" alt="" />
    			</div>
				<div class="clearfix"></div>
    		</div>
			<p class="text-right mtop25 mbot50"><a href="organization-partnerships">View All Partners</a></p>
	    </div>
	</div>
</div>
<?php include ('inc/footer.php'); ?>